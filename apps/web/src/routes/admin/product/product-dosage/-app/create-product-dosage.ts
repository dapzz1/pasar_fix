import z from 'zod';
import { productDosages } from '@/lib/db/schema/map-product';
import { ORPCError, protectedProcedure } from '@/lib/orpc';

export const createProductDosage = protectedProcedure
  .input(
    z.object({
      commodityTypeId: z.string(),
      productBrandId: z.string(),
      dosage: z.number(),
      unit: z.string(),
      year: z.string().optional(),
    })
  )
  .handler(async ({ input, context }) => {
    try {
      const [created] = await context.db
        .insert(productDosages)
        .values({
          commodityTypeId: input.commodityTypeId,
          productBrandId: input.productBrandId,
          dosage: input.dosage,
          unit: input.unit,
          year: input.year,
        })
        .returning();

      return { data: created };
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ORPCError('CONFLICT', {
          message: 'Product dosage already exists',
        });
      }
      throw new ORPCError('INTERNAL', {
        message: 'Failed to create product dosage',
      });
    }
  });
