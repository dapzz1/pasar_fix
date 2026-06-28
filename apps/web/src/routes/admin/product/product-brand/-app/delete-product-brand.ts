import { eq } from 'drizzle-orm';
import z from 'zod';
import { productBrands } from '@/lib/db/schema/map-product';
import { ORPCError, protectedProcedure } from '@/lib/orpc';

export const deleteProductBrand = protectedProcedure
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    try {
      await context.db
        .delete(productBrands)
        .where(eq(productBrands.id, input.id));
      return { data: true };
    } catch {
      throw new ORPCError('INTERNAL', {
        message: 'Failed to delete product brand',
      });
    }
  });
