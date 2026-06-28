import { and, asc, count, eq, ilike } from 'drizzle-orm';
import { z } from 'zod';

import { productBrands } from '@/lib/db/schema/map-product';

import { salesRealizations } from '@/lib/db/schema/sale';

import { protectedProcedure } from '@/lib/orpc';

export const getSalesRealizations = protectedProcedure
  .input(
    z.object({
      page: z.number().optional(),
      limit: z.number().optional(),
      search: z.string().optional(),
      productBrandId: z.string().optional(),
    })
  )
  .handler(async ({ input, context }) => {
    const page = input?.page ?? 1;
    const limit = input?.limit ?? 10;
    const offset = (page - 1) * limit;

    const baseQuery = context.db
      .select({
        id: salesRealizations.id,

        productBrandId: salesRealizations.productBrandId,

        productBrandName: productBrands.name,

        reportDate: salesRealizations.reportDate,

        realizationDaily: salesRealizations.realizationDaily,

        month: salesRealizations.month,

        realizationMonthly: salesRealizations.realizationMonthly,

        rkapMonthly: salesRealizations.rkapMonthly,

        realizationYtd: salesRealizations.realizationYtd,

        rkapYtd: salesRealizations.rkapYtd,

        rkapYearly: salesRealizations.rkapYearly,

        realizationLastYear: salesRealizations.realizationLastYear,

        year: salesRealizations.year,
      })
      .from(salesRealizations)
      .innerJoin(
        productBrands,
        eq(salesRealizations.productBrandId, productBrands.id)
      );

    const conditions: ReturnType<typeof ilike>[] = [];

    if (input.productBrandId) {
      conditions.push(
        eq(salesRealizations.productBrandId, input.productBrandId)
      );
    }

    if (input.search) {
      conditions.push(ilike(productBrands.name, `%${input.search}%`));
    }

    return {
      data: await baseQuery
        .where(and(...conditions))
        .orderBy(asc(productBrands.name))
        .limit(limit)
        .offset(offset),

      total: await context.db
        .select({ count: count() })
        .from(salesRealizations)
        .then(([result]) => Number(result.count)),
    };
  });
