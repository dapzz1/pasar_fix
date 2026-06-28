import z from 'zod';
import { productBrands } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';

export const createProductBrand = protectedProcedure
  .input(
    z.object({
      productTypeId: z.string(),
      name: z.string(),
      industry: z.string().optional(),
      description: z.string().optional(),
    })
  )
  .handler(async ({ input, context }) => {
    const [created] = await context.db
      .insert(productBrands)
      .values({
        productTypeId: input.productTypeId,
        name: input.name,
        industry: input.industry,
        description: input.description,
      })
      .returning();

    return { data: created };
  });
