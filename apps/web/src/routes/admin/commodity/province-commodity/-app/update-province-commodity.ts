import { eq } from 'drizzle-orm';
import { provinceCommodities } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';
import { ProvinceCommoditySchema } from '../-domain/schema';

export const updateProvinceCommodity = protectedProcedure
  .input(ProvinceCommoditySchema.partial().required({ id: true }))
  .handler(async ({ input, context }) => {
    const { id, ...values } = input;
    const [updated] = await context.db
      .update(provinceCommodities)
      .set({
        ...values,
        updatedAt: new Date(),
      })
      .where(eq(provinceCommodities.id, id))
      .returning();

    if (!updated) {
      throw new Error('Province commodity not found');
    }

    return updated;
  });
