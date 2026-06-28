import { eq } from 'drizzle-orm';
import { dailySales } from '@/lib/db/schema/sale';
import { protectedProcedure } from '@/lib/orpc';

import { DailySalesSchema } from '../-domain/schema';

export const updateDailySales = protectedProcedure
  .input(DailySalesSchema.extend({ id: DailySalesSchema.shape.id.unwrap() }))
  .handler(async ({ input, context }) => {
    const [data] = await context.db
      .update(dailySales)
      .set({
        date: input.date,

        month: input.month,

        year: input.year,

        productBrandId: input.productBrandId,

        provinceId: input.provinceId,

        qty: input.qty,

        revenue: input.revenue,

        target: input.target,

        notes: input.notes,
      })
      .where(eq(dailySales.id, input.id))
      .returning();

    return data;
  });
