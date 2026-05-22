import { protectedProcedure } from '@/lib/orpc';

import { dailySales } from '@/lib/db/schema/sale';

import { DailySalesSchema } from '../-domain/schema';

export const createDailySales =
  protectedProcedure
    .input(DailySalesSchema)
    .handler(async ({ input, context }) => {
      const [data] = await context.db
        .insert(dailySales)
        .values({
          date: input.date,

          month: input.month,

          year: input.year,

          productBrandId:
            input.productBrandId,

          provinceId:
            input.provinceId,

          qty: input.qty,

          revenue: input.revenue,

          target: input.target,

          notes: input.notes,
        })
        .returning();

      return data;
    });