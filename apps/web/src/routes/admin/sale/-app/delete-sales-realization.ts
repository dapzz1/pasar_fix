import { eq } from 'drizzle-orm';

import z from 'zod';

import { salesRealizations } from '@/lib/db/schema/sale';

import { protectedProcedure } from '@/lib/orpc';

export const deleteSalesRealization = protectedProcedure
  .input(
    z.object({
      id: z.string().uuid(),
    })
  )
  .handler(async ({ input, context }) => {
    await context.db
      .delete(salesRealizations)
      .where(eq(salesRealizations.id, input.id))
      .returning();

    return {
      success: true,
    };
  });
