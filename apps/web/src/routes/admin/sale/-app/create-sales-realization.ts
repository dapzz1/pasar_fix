import { ORPCError } from '@orpc/server';

import { generateUUID } from '@/lib/db/schema';

import { salesRealizations } from '@/lib/db/schema/sale';

import { protectedProcedure } from '@/lib/orpc';

import { SalesRealizationSchema } from '../-domain/schema';

export const createSalesRealization = protectedProcedure
  .input(SalesRealizationSchema.omit({ id: true }))
  .handler(async ({ input, context }) => {
    const newSalesRealization = {
      id: generateUUID(),

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
    };

    try {
      const [createdSalesRealization] = await context.db
        .insert(salesRealizations)
        .values(newSalesRealization)
        .returning();

      return createdSalesRealization;
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : String(err);

      if (
        msg.toLowerCase().includes('unique') ||
        msg.toLowerCase().includes('duplicate')
      ) {
        throw new ORPCError('CONFLICT', {
          message:
            'Sales realization already exists',
        });
      }

      throw err;
    }
  });