import { eq } from 'drizzle-orm';
import { provincePotentials } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';
import { ProvincePotentialSchema } from '../-domain/schema';

export const updateProvincePotential = protectedProcedure
  .input(
    ProvincePotentialSchema.pick({
      id: true,
      provinceId: true,
      productBrandId: true,
      potential: true,
      description: true,
      year: true,
    })
      .partial()
      .required({ id: true })
  )
  .handler(async ({ input, context }) => {
    const updateData = Object.fromEntries(
      Object.entries(input).filter(
        ([key, value]) => key !== 'id' && value !== undefined
      )
    );

    if (Object.keys(updateData).length === 0) {
      throw new Error('No valid fields to update');
    }

    const [updatedProvincePotential] = await context.db
      .update(provincePotentials)
      .set(updateData)
      .where(eq(provincePotentials.id, input.id))
      .returning();

    if (!updatedProvincePotential) {
      throw new Error('Province potential not found');
    }

    return updatedProvincePotential;
  });
