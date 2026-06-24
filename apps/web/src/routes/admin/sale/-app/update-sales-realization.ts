import { ORPCError } from '@orpc/server';
import { eq } from 'drizzle-orm';

import { salesRealizations } from '@/lib/db/schema/sale';

import { protectedProcedure } from '@/lib/orpc';

import { SalesRealizationSchema } from '../-domain/schema';

export const updateSalesRealization = protectedProcedure
  .input(SalesRealizationSchema)
  .handler(async ({ input, context }) => {
    try {
      const [updatedSalesRealization] = await context.db
        .update(salesRealizations)
        .set({
          reportDate: input.reportDate,

          productBrandId: input.productBrandId,

          realizationDaily: input.realizationDaily,

          month: input.month,

          realizationMonthly: input.realizationMonthly,

          rkapMonthly: input.rkapMonthly,

          realizationYtd: input.realizationYtd,

          rkapYtd: input.rkapYtd,

          year: input.year,

          rkapYearly: input.rkapYearly,

          realizationLastYear: input.realizationLastYear,
        })
        .where(eq(salesRealizations.id, input.id!))
        .returning();

      return updatedSalesRealization;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);

      if (
        msg.toLowerCase().includes('unique') ||
        msg.toLowerCase().includes('duplicate')
      ) {
        throw new ORPCError('CONFLICT', {
          message: 'Sales realization already exists',
        });
      }

      throw err;
    }
  });
