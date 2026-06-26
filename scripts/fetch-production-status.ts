import { Pool } from 'pg';

const MAIN_TABLES = [
  'user',
  'session',
  'account',
  'verification',
  'todo',
  'provinces',
  'regencies',
  'stalls',
  'stall_product_brands',
  'sales_realizations',
  'daily_sales',
  'product_types',
  'product_brands',
  'product_dosages',
  'land_types',
  'commodity_types',
  'province_lands',
  'regency_lands',
  'province_commodities',
  'regency_commodities',
  'province_potentials',
  'regency_potentials',
] as const;

type TableCount = {
  count: number | null;
  error?: string;
  table: string;
};

const writeJson = (value: unknown) => {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
};

const getTableCount = async (
  pool: Pool,
  table: string
): Promise<TableCount> => {
  try {
    const result = await pool.query<{ value: string }>(
      `select count(*)::text as value from "${table}"`
    );
    const value = result.rows.at(0)?.value ?? null;

    return {
      table,
      count: value === null ? null : Number(value),
    };
  } catch (error) {
    return {
      table,
      count: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const main = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required');
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    const [databaseResult, tablesResult] = await Promise.all([
      pool.query<{
        current_database: string;
        current_user: string;
        server_version: string;
      }>(
        'select current_database(), current_user, version() as server_version'
      ),
      pool.query<{ table_name: string }>(
        "select table_name from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE' order by table_name"
      ),
    ]);

    const existingTables = new Set(
      tablesResult.rows.map((row) => row.table_name)
    );
    const countableTables = MAIN_TABLES.filter((table) =>
      existingTables.has(table)
    );
    const counts: TableCount[] = await Promise.all(
      countableTables.map((table) => getTableCount(pool, table))
    );

    writeJson({
      connected: true,
      database: databaseResult.rows.at(0) ?? null,
      tableCount: tablesResult.rows.length,
      tables: tablesResult.rows.map((row) => row.table_name),
      counts,
      missingMainTables: MAIN_TABLES.filter(
        (table) => !existingTables.has(table)
      ),
    });
  } finally {
    await pool.end();
  }
};

main().catch((error: unknown) => {
  process.stderr.write(
    `${error instanceof Error ? error.stack : String(error)}\n`
  );
  process.exitCode = 1;
});
