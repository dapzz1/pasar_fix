import { and, asc, count, eq, ilike } from 'drizzle-orm';

import { z } from 'zod';

import { productBrands } from '@/lib/db/schema/map-product';

import { dailySales } from '@/lib/db/schema/sale';

import { protectedProcedure } from '@/lib/orpc';

export const getDailySales = protectedProcedure
  .input(
    z.object({
      page: z.number().optional(),

      limit: z.number().optional(),

      search: z.string().optional(),
    })
  )
  .handler(async ({ input, context }) => {
    const page = input.page ?? 1;

    const limit = input.limit ?? 10;

    const offset = (page - 1) * limit;

    const conditions: any[] = [];

    if (input.search) {
      conditions.push(ilike(productBrands.name, `%${input.search}%`));
    }

    const data = await context.db
      .select({
        id: dailySales.id,

        date: dailySales.date,

        month: dailySales.month,

        year: dailySales.year,

        qty: dailySales.qty,

        revenue: dailySales.revenue,

        target: dailySales.target,

        notes: dailySales.notes,

        productBrandId: dailySales.productBrandId,

        productBrandName: productBrands.name,
      })
      .from(dailySales)
      .innerJoin(productBrands, eq(dailySales.productBrandId, productBrands.id))
      .where(and(...conditions))
      .orderBy(asc(dailySales.date))
      .limit(limit)
      .offset(offset);

    const total = await context.db
      .select({
        count: count(),
      })
      .from(dailySales)
      .then(([{ count }]) => Number(count));

    return {
      data,
      total,
    };
  });
