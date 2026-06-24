import { eq } from 'drizzle-orm';
import { regencyLands } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';
import { RegencyLandSchema } from '../-domain/schema';

export const updateRegencyLand = protectedProcedure
  .input(RegencyLandSchema.partial().required({ id: true }))
  .handler(async ({ input, context }) => {
    const { id, ...values } = input;
    const [updated] = await context.db
      .update(regencyLands)
      .set({
        ...values,
        updatedAt: new Date(),
      })
      .where(eq(regencyLands.id, id))
      .returning();

    if (!updated) {
      throw new Error('Regency land not found');
    }

    return updated;
  });
