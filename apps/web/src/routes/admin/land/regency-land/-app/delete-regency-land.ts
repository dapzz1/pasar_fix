import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { regencyLands } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';

export const deleteRegencyLand = protectedProcedure
  .input(z.object({ id: z.string().uuid() }))
  .handler(async ({ input, context }) => {
    const [deleted] = await context.db
      .delete(regencyLands)
      .where(eq(regencyLands.id, input.id))
      .returning({ id: regencyLands.id });

    if (!deleted) {
      throw new Error('Regency land not found');
    }

    return { success: true };
  });
