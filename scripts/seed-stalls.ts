import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { count } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { readFile, utils } from 'xlsx';
import {
  provinces,
  regencies,
} from '../apps/web/src/lib/db/schema/map-product';
import { stalls } from '../apps/web/src/lib/db/schema/stall';

const DATABASE_URL_PATTERN = /^DATABASE_URL\s*=\s*(.+)$/m;
const DIACRITIC_PATTERN = /[\u0300-\u036f]/g;
const NON_ALPHANUMERIC_PATTERN = /[^a-z0-9]+/g;
const REGENCY_PREFIX_PATTERN = /^(?:kabupaten|kota administrasi|kota)\s+/;
const WHITESPACE_PATTERN = /\s+/g;
const YEAR_PATTERN = /\b(?:19|20)\d{2}\b/;

const EXCEL_PATH = resolve('data/SURVEY PASAR KIOS (Jawaban).xlsx');
const ENV_PATH = resolve('apps/web/.env');
const SHEET_NAME = 'Cleaning tipis';

const output = (value: unknown) => {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
};

const normalizeName = (value: string) =>
  value
    .normalize('NFKD')
    .replace(DIACRITIC_PATTERN, '')
    .toLowerCase()
    .replace(NON_ALPHANUMERIC_PATTERN, ' ')
    .trim()
    .replace(WHITESPACE_PATTERN, ' ');

const normalizeRegencyName = (value: string) =>
  normalizeName(value).replace(REGENCY_PREFIX_PATTERN, '');

const getDatabaseUrl = () => {
  const configuredUrl = process.env.DATABASE_URL?.trim();
  if (configuredUrl) {
    return configuredUrl;
  }

  const envContents = readFileSync(ENV_PATH, 'utf8');
  const match = DATABASE_URL_PATTERN.exec(envContents);
  const rawValue = match?.at(1)?.trim();

  if (!rawValue) {
    throw new Error(`DATABASE_URL was not found in ${ENV_PATH}`);
  }

  const firstCharacter = rawValue.at(0);
  const lastCharacter = rawValue.at(-1);
  const isQuoted =
    (firstCharacter === '"' && lastCharacter === '"') ||
    (firstCharacter === "'" && lastCharacter === "'");

  return isQuoted ? rawValue.slice(1, -1) : rawValue;
};

const getCell = (row: Record<string, unknown>, header: string) => {
  const value = row[header];
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
};

const getOptionalCell = (row: Record<string, unknown>, header: string) => {
  const value = getCell(row, header);
  return value || null;
};

const parseCoordinates = (coordinate: string, rowNumber: number) => {
  if (!coordinate) {
    return { latitude: null, longitude: null, warning: null };
  }

  const parts = coordinate.split(',').map((part) => part.trim());
  if (parts.length !== 2) {
    return {
      latitude: null,
      longitude: null,
      warning: `Row ${rowNumber}: unusable coordinate "${coordinate}"`,
    };
  }

  const latitude = Number(parts.at(0));
  const longitude = Number(parts.at(1));
  const isValid =
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180;

  if (!isValid) {
    return {
      latitude: null,
      longitude: null,
      warning: `Row ${rowNumber}: unusable coordinate "${coordinate}"`,
    };
  }

  return { latitude, longitude, warning: null };
};

const getYear = (timestamp: string) =>
  YEAR_PATTERN.exec(timestamp)?.at(0) ?? null;

const getProvinceLookupName = (value: string) => {
  const normalized = normalizeName(value);
  if (normalized === 'di yogyakarta') {
    return 'daerah istimewa yogyakarta';
  }

  return normalized;
};

const findRegency = (
  inputName: string,
  address: string,
  provinceId: string,
  availableRegencies: {
    id: string;
    name: string;
    provinceId: string;
  }[]
) => {
  const provinceRegencies = availableRegencies.filter(
    (regency) => regency.provinceId === provinceId
  );
  const normalizedInput = normalizeName(inputName);
  const exactMatch = provinceRegencies.find(
    (regency) => normalizeName(regency.name) === normalizedInput
  );

  if (exactMatch) {
    return exactMatch;
  }

  const shortName = normalizeRegencyName(inputName);
  const candidates = provinceRegencies.filter(
    (regency) => normalizeRegencyName(regency.name) === shortName
  );

  if (candidates.length <= 1) {
    return candidates.at(0);
  }

  const normalizedAddress = normalizeName(address);
  const cityMatch = candidates.find(
    (regency) =>
      normalizeName(regency.name).startsWith('kota ') &&
      normalizedAddress.includes(`kota ${shortName}`)
  );
  if (cityMatch) {
    return cityMatch;
  }

  const regencyMatch = candidates.find(
    (regency) =>
      normalizeName(regency.name).startsWith('kabupaten ') &&
      (normalizedAddress.includes(`kabupaten ${shortName}`) ||
        normalizedAddress.includes(`kab ${shortName}`) ||
        normalizedAddress.includes(`${shortName} regency`))
  );
  if (regencyMatch) {
    return regencyMatch;
  }

  return candidates.find((regency) =>
    normalizeName(regency.name).startsWith('kabupaten ')
  );
};

const getExcelRows = () => {
  const workbook = readFile(EXCEL_PATH);
  const sheet = workbook.Sheets[SHEET_NAME];

  if (!sheet) {
    throw new Error(`Worksheet "${SHEET_NAME}" was not found in ${EXCEL_PATH}`);
  }

  return utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: null,
    raw: false,
  });
};

const prepareStalls = (
  excelRows: Record<string, unknown>[],
  availableProvinces: { id: string; name: string }[],
  availableRegencies: {
    id: string;
    name: string;
    provinceId: string;
  }[]
) => {
  const provinceByName = new Map(
    availableProvinces.map((province) => [
      normalizeName(province.name),
      province,
    ])
  );
  const errors: string[] = [];
  const coordinateWarnings: string[] = [];
  const preparedRows: (typeof stalls.$inferInsert)[] = [];

  for (const [index, row] of excelRows.entries()) {
    const rowNumber = index + 2;
    const name = getCell(row, 'Nama Retailer ');
    const provinceName = getCell(row, 'Provinsi');
    const regencyName = getCell(row, 'Kabupaten');
    const address = getCell(row, 'Alamat');
    const province = provinceByName.get(getProvinceLookupName(provinceName));

    if (!name) {
      errors.push(`Row ${rowNumber}: missing retailer name`);
      continue;
    }

    if (!province) {
      errors.push(`Row ${rowNumber}: province "${provinceName}" was not found`);
      continue;
    }

    const regency = findRegency(
      regencyName,
      address,
      province.id,
      availableRegencies
    );
    if (!regency) {
      errors.push(
        `Row ${rowNumber}: regency "${regencyName}" was not found in "${provinceName}"`
      );
      continue;
    }

    const coordinates = parseCoordinates(getCell(row, 'Koordinat'), rowNumber);
    if (coordinates.warning) {
      coordinateWarnings.push(coordinates.warning);
    }

    preparedRows.push({
      name,
      address: address || null,
      provinceId: province.id,
      regencyId: regency.id,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      owner: getOptionalCell(row, 'Nama Pemilik / Admin'),
      noTelp: getOptionalCell(row, 'No Telepon / HP'),
      criteria: getOptionalCell(row, 'Status'),
      year: getYear(getCell(row, 'Timestamp')),
    });
  }

  if (errors.length > 0) {
    throw new Error(`Import validation failed:\n${errors.join('\n')}`);
  }

  return { coordinateWarnings, rows: preparedRows };
};

const main = async () => {
  const execute = process.argv.includes('--execute');
  const pool = new Pool({
    connectionString: getDatabaseUrl(),
    ssl: {
      rejectUnauthorized: false,
    },
  });
  const db = drizzle(pool);

  try {
    const [availableProvinces, availableRegencies, countRows] =
      await Promise.all([
        db.select({ id: provinces.id, name: provinces.name }).from(provinces),
        db
          .select({
            id: regencies.id,
            name: regencies.name,
            provinceId: regencies.provinceId,
          })
          .from(regencies),
        db.select({ value: count() }).from(stalls),
      ]);
    const excelRows = getExcelRows();
    const prepared = prepareStalls(
      excelRows,
      availableProvinces,
      availableRegencies
    );
    const preparedRows = prepared.rows;
    const beforeCount = countRows.at(0)?.value ?? 0;
    const missingCoordinates = preparedRows.filter(
      (stall) => stall.latitude === null || stall.longitude === null
    ).length;

    if (!execute) {
      output({
        mode: 'dry-run',
        worksheet: SHEET_NAME,
        sourceRows: excelRows.length,
        validatedRows: preparedRows.length,
        missingCoordinates,
        coordinateWarnings: prepared.coordinateWarnings,
        currentStallCount: beforeCount,
        expectedStallCountAfterImport: beforeCount + preparedRows.length,
        message:
          'No database rows were changed. Re-run with --execute to import.',
      });
      return;
    }

    const insertedCount = await db.transaction(async (transaction) => {
      const inserted = await transaction
        .insert(stalls)
        .values(preparedRows)
        .returning({ id: stalls.id });
      return inserted.length;
    });
    const afterCountRows = await db.select({ value: count() }).from(stalls);
    const afterCount = afterCountRows.at(0)?.value ?? 0;
    const expectedCount = beforeCount + insertedCount;

    if (insertedCount !== preparedRows.length) {
      throw new Error(
        `Expected to insert ${preparedRows.length} rows, inserted ${insertedCount}`
      );
    }

    if (afterCount !== expectedCount) {
      throw new Error(
        `Expected stalls count ${expectedCount}, received ${afterCount}`
      );
    }

    output({
      mode: 'execute',
      worksheet: SHEET_NAME,
      insertedRows: insertedCount,
      countBefore: beforeCount,
      countAfter: afterCount,
      verification: 'SELECT COUNT(*) FROM stalls;',
      status: 'success',
    });
  } finally {
    await pool.end();
  }
};

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
