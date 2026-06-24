import { provinceCommodities } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';
import { ProvinceCommoditySchema } from '../-domain/schema';

export const createProvinceCommodity = protectedProcedure
  .input(ProvinceCommoditySchema.omit({ id: true }))
  .handler(async ({ input, context }) => {
    const [created] = await context.db
      .insert(provinceCommodities)
      .values(input)
      .returning();

    if (!created) {
      throw new Error('Failed to create province commodity');
    }

    return created;
  });
