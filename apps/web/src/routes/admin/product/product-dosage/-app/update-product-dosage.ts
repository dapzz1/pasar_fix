import { eq } from 'drizzle-orm';
import z from 'zod';
import { productDosages } from '@/lib/db/schema/map-product';
import { ORPCError, protectedProcedure } from '@/lib/orpc';

export const updateProductDosage = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      dosage: z.number().optional(),
      unit: z.string().optional(),
      year: z.string().optional(),
    })
  )
  .handler(async ({ input, context }) => {
    const { id, ...rest } = input;
    const updateData: { dosage?: number; unit?: string; year?: string } = {};
    if (rest.dosage !== undefined) {
      updateData.dosage = rest.dosage;
    }
    if (rest.unit !== undefined) {
      updateData.unit = rest.unit;
    }
    if (rest.year !== undefined) {
      updateData.year = rest.year;
    }
    if (Object.keys(updateData).length === 0) {
      return { data: null };
    }

    try {
      const [updated] = await context.db
        .update(productDosages)
        .set(updateData)
        .where(eq(productDosages.id, id))
        .returning();

      return { data: updated };
    } catch {
      throw new ORPCError('INTERNAL', {
        message: 'Failed to update product dosage',
      });
    }
  });
