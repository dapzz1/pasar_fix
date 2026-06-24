import { eq } from 'drizzle-orm';
import { regencyPotentials } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';
import { RegencyPotentialSchema } from '../-domain/schema';

export const updateRegencyPotential = protectedProcedure
  .input(RegencyPotentialSchema.partial().required({ id: true }))
  .handler(async ({ input, context }) => {
    const { id, ...values } = input;
    const updateValues = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value !== undefined)
    );
    if (Object.keys(updateValues).length === 0) {
      throw new Error('No valid fields to update');
    }

    const [updated] = await context.db
      .update(regencyPotentials)
      .set(updateValues)
      .where(eq(regencyPotentials.id, id))
      .returning();
    if (!updated) {
      throw new Error('Regency potential not found');
    }
    return updated;
  });
