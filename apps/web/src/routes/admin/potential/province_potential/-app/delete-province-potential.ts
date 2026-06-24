import { eq } from 'drizzle-orm';
import z from 'zod';
import { provincePotentials } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';

export const deleteProvincePotential = protectedProcedure
  .input(
    z.object({
      id: z.uuid(),
    })
  )
  .handler(async ({ input, context }) => {
    await context.db
      .delete(provincePotentials)
      .where(eq(provincePotentials.id, input.id))
      .returning();
    return { success: true };
  });
