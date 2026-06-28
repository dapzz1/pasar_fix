import z from 'zod';
import { productTypes } from '@/lib/db/schema/map-product';
import { ORPCError, protectedProcedure } from '@/lib/orpc';

export const createProductType = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      description: z.string().optional(),
    })
  )
  .handler(async ({ input, context }) => {
    try {
      const [created] = await context.db
        .insert(productTypes)
        .values({ name: input.name, description: input.description })
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
          message: 'Product type already exists',
        });
      }
      throw new ORPCError('INTERNAL', {
        message: 'Failed to create product type',
      });
    }
  });
