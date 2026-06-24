import { eq } from 'drizzle-orm';
import z from 'zod';
import { regencyPotentials } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';

export const deleteRegencyPotential = protectedProcedure
  .input(z.object({ id: z.uuid() }))
  .handler(async ({ input, context }) => {
    await context.db
      .delete(regencyPotentials)
      .where(eq(regencyPotentials.id, input.id));
    return { success: true };
  });
