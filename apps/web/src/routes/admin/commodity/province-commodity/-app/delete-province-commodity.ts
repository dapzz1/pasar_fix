import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { provinceCommodities } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';

export const deleteProvinceCommodity = protectedProcedure
  .input(z.object({ id: z.string().uuid() }))
  .handler(async ({ input, context }) => {
    const [deleted] = await context.db
      .delete(provinceCommodities)
      .where(eq(provinceCommodities.id, input.id))
      .returning({ id: provinceCommodities.id });

    if (!deleted) {
      throw new Error('Province commodity not found');
    }

    return { success: true };
  });
