import { and, asc, eq, ilike, or, type SQL } from 'drizzle-orm';
import z from 'zod';
import {
  productBrands,
  provinces,
  regencies,
  regencyPotentials,
} from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';

export const getRegencyPotentials = protectedProcedure
  .input(
    z.object({
      provinceId: z.string().uuid().optional(),
      regencyId: z.string().uuid().optional(),
      productBrandId: z.string().uuid().optional(),
      search: z.string().optional(),
      year: z.string().optional(),
    })
  )
  .handler(async ({ input, context }) => {
    const conditions: SQL[] = [];
    if (input.provinceId) {
      conditions.push(eq(regencies.provinceId, input.provinceId));
    }
    if (input.regencyId) {
      conditions.push(eq(regencyPotentials.regencyId, input.regencyId));
    }
    if (input.productBrandId) {
      conditions.push(
        eq(regencyPotentials.productBrandId, input.productBrandId)
      );
    }
    if (input.year) {
      conditions.push(eq(regencyPotentials.year, input.year));
    }
    if (input.search) {
      const searchCondition = or(
        ilike(regencies.name, `%${input.search}%`),
        ilike(provinces.name, `%${input.search}%`),
        ilike(productBrands.name, `%${input.search}%`)
      );
      if (searchCondition) {
        conditions.push(searchCondition);
      }
    }

    const data = await context.db
      .select({
        id: regencyPotentials.id,
        provinceId: regencies.provinceId,
        provinceName: provinces.name,
        regencyId: regencyPotentials.regencyId,
        regencyCode: regencies.code,
        regencyName: regencies.name,
        productBrandId: regencyPotentials.productBrandId,
        productBrandName: productBrands.name,
        potential: regencyPotentials.potential,
        description: regencyPotentials.description,
        year: regencyPotentials.year,
        updatedAt: regencyPotentials.updatedAt,
      })
      .from(regencyPotentials)
      .innerJoin(regencies, eq(regencyPotentials.regencyId, regencies.id))
      .innerJoin(provinces, eq(regencies.provinceId, provinces.id))
      .innerJoin(
        productBrands,
        eq(regencyPotentials.productBrandId, productBrands.id)
      )
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(asc(provinces.name), asc(regencies.name));

    return { data };
  });
