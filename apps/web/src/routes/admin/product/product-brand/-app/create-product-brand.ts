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
    try {
      console.log('INPUT =>', input);

      const [created] = await context.db
        .insert(productBrands)
        .values({
          productTypeId: input.productTypeId,
          name: input.name,
          industry: input.industry,
          description: input.description,
        })
        .returning();

      console.log('CREATED =>', created);

      return { data: created };
    } catch (error: any) {
      console.error('=================================');
      console.error('FULL ERROR =>');
      console.error(error);
      console.error('CODE =>', error?.code);
      console.error('DETAIL =>', error?.detail);
      console.error('CONSTRAINT =>', error?.constraint);
      console.error('TABLE =>', error?.table);
      console.error('WHERE =>', error?.where);
      console.error('=================================');

      throw error;
    }
  });
