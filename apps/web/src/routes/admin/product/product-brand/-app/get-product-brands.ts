import { and, eq, ilike } from 'drizzle-orm';
import z from 'zod';
import { productBrands, productTypes } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';

export const getProductBrands = protectedProcedure
  .input(
    z.object({
      productTypeId: z.string().optional(),
      search: z.string().optional(),
    })
  )
  .handler(async ({ input, context }) => {
    const baseQuery = context.db
      .select({
        id: productBrands.id,
        productTypeId: productBrands.productTypeId,
        productTypeName: productTypes.name,
        name: productBrands.name,
        industry: productBrands.industry,
        description: productBrands.description,
        year: productBrands.year,
      })
      .from(productBrands)
      .innerJoin(
        productTypes,
        eq(productBrands.productTypeId, productTypes.id)
      );

    const conditions: ReturnType<typeof ilike>[] = [];
    if (input.productTypeId) {
      conditions.push(eq(productBrands.productTypeId, input.productTypeId));
    }
    if (input.search) {
      conditions.push(ilike(productBrands.name, `%${input.search}%`));
    }

    return {
      data: await baseQuery
        .where(and(...conditions))
        .orderBy(productBrands.name),
    };
  });
