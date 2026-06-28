import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Client } from 'pg';

type ColumnRow = {
  character_maximum_length: number | null;
  column_default: string | null;
  column_name: string;
  data_type: string;
  is_nullable: 'NO' | 'YES';
  numeric_precision: number | null;
  numeric_scale: number | null;
  ordinal_position: number;
  table_name: string;
  udt_name: string;
};

type ConstraintRow = {
  column_name: string;
  constraint_name: string;
  constraint_type: 'PRIMARY KEY' | 'UNIQUE';
  ordinal_position: number;
  table_name: string;
};

type ForeignKeyRow = {
  column_name: string;
  constraint_name: string;
  delete_rule: string;
  foreign_column_name: string;
  foreign_table_name: string;
  ordinal_position: number;
  table_name: string;
  update_rule: string;
};

const COLUMNS_QUERY = `
  select
    table_name,
    column_name,
    ordinal_position,
    is_nullable,
    data_type,
    udt_name,
    character_maximum_length,
    numeric_precision,
    numeric_scale,
    column_default
  from information_schema.columns
  where table_schema = 'public'
  order by table_name, ordinal_position
`;

const CONSTRAINTS_QUERY = `
  select
    tc.constraint_name,
    tc.constraint_type,
    kcu.table_name,
    kcu.column_name,
    kcu.ordinal_position
  from information_schema.table_constraints as tc
  join information_schema.key_column_usage as kcu
    on tc.constraint_catalog = kcu.constraint_catalog
    and tc.constraint_schema = kcu.constraint_schema
    and tc.constraint_name = kcu.constraint_name
  where tc.table_schema = 'public'
    and tc.constraint_type in ('PRIMARY KEY', 'UNIQUE')
  order by kcu.table_name, tc.constraint_name, kcu.ordinal_position
`;

const FOREIGN_KEYS_QUERY = `
  select
    constraint_name,
    table_name,
    column_name,
    foreign_table_name,
    foreign_column_name,
    ordinal_position,
    update_rule,
    delete_rule
  from (
    select
      constraint_row.conname as constraint_name,
      child_table.relname as table_name,
      child_column.attname as column_name,
      parent_table.relname as foreign_table_name,
      parent_column.attname as foreign_column_name,
      child_key.ordinality as ordinal_position,
      case constraint_row.confupdtype
        when 'a' then 'NO ACTION'
        when 'r' then 'RESTRICT'
        when 'c' then 'CASCADE'
        when 'n' then 'SET NULL'
        when 'd' then 'SET DEFAULT'
      end as update_rule,
      case constraint_row.confdeltype
        when 'a' then 'NO ACTION'
        when 'r' then 'RESTRICT'
        when 'c' then 'CASCADE'
        when 'n' then 'SET NULL'
        when 'd' then 'SET DEFAULT'
      end as delete_rule
    from pg_constraint as constraint_row
    join pg_class as child_table
      on child_table.oid = constraint_row.conrelid
    join pg_namespace as child_namespace
      on child_namespace.oid = child_table.relnamespace
    join pg_class as parent_table
      on parent_table.oid = constraint_row.confrelid
    join lateral unnest(constraint_row.conkey) with ordinality
      as child_key(attribute_number, ordinality) on true
    join lateral unnest(constraint_row.confkey) with ordinality
      as parent_key(attribute_number, ordinality)
      on parent_key.ordinality = child_key.ordinality
    join pg_attribute as child_column
      on child_column.attrelid = child_table.oid
      and child_column.attnum = child_key.attribute_number
    join pg_attribute as parent_column
      on parent_column.attrelid = parent_table.oid
      and parent_column.attnum = parent_key.attribute_number
    where constraint_row.contype = 'f'
      and child_namespace.nspname = 'public'
  ) as foreign_keys
  order by table_name, constraint_name, ordinal_position
`;

const quoteIdentifier = (value: string) => `"${value.replaceAll('"', '""')}"`;

const getColumnType = (column: ColumnRow): string => {
  if (column.data_type === 'ARRAY') {
    const elementType = column.udt_name.startsWith('_')
      ? column.udt_name.slice(1)
      : column.udt_name;
    return `${elementType}[]`;
  }

  if (column.data_type === 'USER-DEFINED') {
    return column.udt_name;
  }

  if (column.data_type === 'character varying') {
    return column.character_maximum_length === null
      ? 'varchar'
      : `varchar(${column.character_maximum_length})`;
  }

  if (column.data_type === 'numeric') {
    if (column.numeric_precision === null) {
      return 'numeric';
    }
    if (column.numeric_scale === null) {
      return `numeric(${column.numeric_precision})`;
    }
    return `numeric(${column.numeric_precision},${column.numeric_scale})`;
  }

  const typeMap: Record<string, string> = {
    bigint: 'bigint',
    boolean: 'boolean',
    date: 'date',
    'double precision': 'double',
    integer: 'integer',
    json: 'json',
    jsonb: 'jsonb',
    real: 'real',
    smallint: 'smallint',
    text: 'text',
    'time with time zone': 'timetz',
    'time without time zone': 'time',
    'timestamp with time zone': 'timestamptz',
    'timestamp without time zone': 'timestamp',
    uuid: 'uuid',
  };

  return typeMap[column.data_type] ?? column.udt_name;
};

const getConstraintKey = (constraint: ConstraintRow): string =>
  `${constraint.table_name}.${constraint.constraint_name}`;

const groupConstraints = (constraints: ConstraintRow[]) => {
  const groupedConstraints = new Map<string, ConstraintRow[]>();
  for (const constraint of constraints) {
    const key = getConstraintKey(constraint);
    const existing = groupedConstraints.get(key) ?? [];
    existing.push(constraint);
    groupedConstraints.set(key, existing);
  }
  return groupedConstraints;
};

const getColumnSettings = (
  column: ColumnRow,
  constraints: ConstraintRow[],
  groupedConstraints: Map<string, ConstraintRow[]>
) => {
  const settings: string[] = [];
  const matchingConstraints = constraints.filter(
    (constraint) =>
      constraint.table_name === column.table_name &&
      constraint.column_name === column.column_name &&
      (groupedConstraints.get(getConstraintKey(constraint))?.length ?? 0) === 1
  );

  if (
    matchingConstraints.some(
      (constraint) => constraint.constraint_type === 'PRIMARY KEY'
    )
  ) {
    settings.push('pk');
  }
  if (
    matchingConstraints.some(
      (constraint) => constraint.constraint_type === 'UNIQUE'
    )
  ) {
    settings.push('unique');
  }
  if (column.is_nullable === 'NO') {
    settings.push('not null');
  }
  if (column.column_default !== null) {
    const defaultValue = column.column_default.replaceAll('`', '');
    settings.push(`default: \`${defaultValue}\``);
  }

  return settings;
};

const buildColumnLine = (
  column: ColumnRow,
  constraints: ConstraintRow[],
  groupedConstraints: Map<string, ConstraintRow[]>
) => {
  const settings = getColumnSettings(column, constraints, groupedConstraints);
  const suffix = settings.length === 0 ? '' : ` [${settings.join(', ')}]`;
  return `  ${quoteIdentifier(column.column_name)} ${getColumnType(column)}${suffix}`;
};

const buildCompositeIndexLines = (constraints: ConstraintRow[][]) => {
  const lines = ['', '  indexes {'];
  for (const constraint of constraints) {
    const columnsList = constraint
      .map((item) => quoteIdentifier(item.column_name))
      .join(', ');
    const setting =
      constraint.at(0)?.constraint_type === 'PRIMARY KEY' ? 'pk' : 'unique';
    lines.push(`    (${columnsList}) [${setting}]`);
  }
  lines.push('  }');
  return lines;
};

const buildTableLines = (
  tableName: string,
  columns: ColumnRow[],
  constraints: ConstraintRow[],
  groupedConstraints: Map<string, ConstraintRow[]>
) => {
  const tableColumns = columns.filter(
    (column) => column.table_name === tableName
  );
  const lines = [
    `Table ${quoteIdentifier(tableName)} {`,
    ...tableColumns.map((column) =>
      buildColumnLine(column, constraints, groupedConstraints)
    ),
  ];
  const compositeConstraints = [...groupedConstraints.values()].filter(
    (constraint) =>
      constraint.at(0)?.table_name === tableName && constraint.length > 1
  );
  if (compositeConstraints.length > 0) {
    lines.push(...buildCompositeIndexLines(compositeConstraints));
  }
  lines.push('}', '');
  return lines;
};

const buildReferenceLine = (foreignKey: ForeignKeyRow) => {
  const actions: string[] = [];
  if (foreignKey.delete_rule !== 'NO ACTION') {
    actions.push(`delete: ${foreignKey.delete_rule.toLowerCase()}`);
  }
  if (foreignKey.update_rule !== 'NO ACTION') {
    actions.push(`update: ${foreignKey.update_rule.toLowerCase()}`);
  }
  const suffix = actions.length === 0 ? '' : ` [${actions.join(', ')}]`;
  return `Ref ${quoteIdentifier(foreignKey.constraint_name)}: ${quoteIdentifier(foreignKey.table_name)}.${quoteIdentifier(foreignKey.column_name)} > ${quoteIdentifier(foreignKey.foreign_table_name)}.${quoteIdentifier(foreignKey.foreign_column_name)}${suffix}`;
};

const buildDbml = (
  columns: ColumnRow[],
  constraints: ConstraintRow[],
  foreignKeys: ForeignKeyRow[]
) => {
  const tableNames = [...new Set(columns.map((column) => column.table_name))];
  const foreignKeyCount = new Set(
    foreignKeys.map((foreignKey) => foreignKey.constraint_name)
  ).size;
  const groupedConstraints = groupConstraints(constraints);
  const lines = [
    '// Supabase public schema exported from PostgreSQL catalogs.',
    `// Tables: ${tableNames.length}; foreign keys: ${foreignKeyCount}`,
    '// Import this file at https://dbdiagram.io/d',
    '',
  ];

  for (const tableName of tableNames) {
    lines.push(
      ...buildTableLines(tableName, columns, constraints, groupedConstraints)
    );
  }
  lines.push(...foreignKeys.map(buildReferenceLine), '');

  return { foreignKeyCount, output: lines.join('\n'), tableNames };
};

const main = async () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required');
  }

  const client = new Client({
    connectionString: databaseUrl,
    connectionTimeoutMillis: 15_000,
    query_timeout: 15_000,
    ssl: { rejectUnauthorized: false },
  });
  let connected = false;

  try {
    await client.connect();
    connected = true;

    const columnResult = await client.query<ColumnRow>(COLUMNS_QUERY);
    const constraintResult =
      await client.query<ConstraintRow>(CONSTRAINTS_QUERY);
    const foreignKeyResult =
      await client.query<ForeignKeyRow>(FOREIGN_KEYS_QUERY);

    const { foreignKeyCount, output, tableNames } = buildDbml(
      columnResult.rows,
      constraintResult.rows,
      foreignKeyResult.rows
    );
    const outputDirectory = resolve(process.argv.at(2) ?? 'docs');
    await mkdir(outputDirectory, { recursive: true });
    const dbmlPath = resolve(outputDirectory, 'supabase-schema.dbml');
    const textPath = resolve(outputDirectory, 'supabase-schema.txt');
    await Promise.all([
      writeFile(dbmlPath, output, 'utf8'),
      writeFile(textPath, output, 'utf8'),
    ]);

    process.stdout.write(
      `${JSON.stringify(
        {
          dbmlPath,
          foreignKeyCount,
          tableCount: tableNames.length,
          textPath,
        },
        null,
        2
      )}\n`
    );
  } finally {
    if (connected) {
      await client.end();
    }
  }
};

main().catch((error: unknown) => {
  process.stderr.write(
    `${error instanceof Error ? error.stack : String(error)}\n`
  );
  process.exitCode = 1;
});
