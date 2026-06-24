import { regencyLands } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';
import { RegencyLandSchema } from '../-domain/schema';

export const createRegencyLand = protectedProcedure
  .input(RegencyLandSchema.omit({ id: true }))
  .handler(async ({ input, context }) => {
    const [created] = await context.db
      .insert(regencyLands)
      .values(input)
      .returning();

    if (!created) {
      throw new Error('Failed to create regency land');
    }

    return created;
  });
