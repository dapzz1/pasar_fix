import { and, eq, ilike, or } from 'drizzle-orm';
import z from 'zod';

import {
  landTypes,
  regencies,
  regencyLands,
} from '@/lib/db/schema/map-product';

import { protectedProcedure } from '@/lib/orpc';

export const getRegencyLands = protectedProcedure
  .input(
    z.object({
      page: z.number().optional(),
      limit: z.number().optional(),
      search: z.string().optional(),
      regencyId: z.string().optional(),
      landTypeId: z.string().optional(),
    })
  )
  .handler(async ({ input, context }) => {
    const page = input?.page ?? 1;
    const limit = input?.limit;
    const offset = (page - 1) * (limit ?? 0);

    const baseQuery = context.db
      .select({
        id: regencyLands.id,

        regencyId: regencyLands.regencyId,
        regencyCode: regencies.code,
        regencyName: regencies.name,

        landTypeId: regencyLands.landTypeId,
        landTypeName: landTypes.name,

        area: regencyLands.area,

        year: regencyLands.year,
      })
      .from(regencyLands)
      .innerJoin(landTypes, eq(regencyLands.landTypeId, landTypes.id))
      .innerJoin(regencies, eq(regencyLands.regencyId, regencies.id));

    const conditions: ReturnType<typeof eq | typeof or>[] = [];

    if (input.regencyId) {
      conditions.push(eq(regencyLands.regencyId, input.regencyId));
    }

    if (input.landTypeId) {
      conditions.push(eq(regencyLands.landTypeId, input.landTypeId));
    }

    if (input.search) {
      conditions.push(
        or(
          ilike(regencies.name, `%${input.search}%`),
          ilike(landTypes.name, `%${input.search}%`)
        )
      );
    }

    const query = baseQuery.where(and(...conditions)).orderBy(regencies.name);

    const finalQuery =
      limit !== undefined
        ? query.limit(limit).offset(offset)
        : query.offset(offset);

    return {
      data: await finalQuery,
    };
  });
