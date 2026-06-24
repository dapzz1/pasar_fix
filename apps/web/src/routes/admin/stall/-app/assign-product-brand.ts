import { and, eq, inArray } from 'drizzle-orm';
import z from 'zod';
import { stallProductBrands } from '@/lib/db/schema/stall';
import { protectedProcedure } from '@/lib/orpc';

export const assignProductBrand = protectedProcedure
  .input(
    z.object({
      stallId: z.string().uuid(),

      productBrandIds: z.array(z.string().uuid()),
    })
  )
  .handler(async ({ input, context }) => {
    const existing = await context.db
      .select({
        productBrandId: stallProductBrands.productBrandId,
      })
      .from(stallProductBrands)
      .where(eq(stallProductBrands.stallId, input.stallId));

    const existingIds = existing.map((item) => item.productBrandId);

    const toInsert = input.productBrandIds.filter(
      (id) => !existingIds.includes(id)
    );

    const toDelete = existingIds.filter(
      (id) => !input.productBrandIds.includes(id)
    );

    if (toInsert.length) {
      await context.db.insert(stallProductBrands).values(
        toInsert.map((productBrandId) => ({
          stallId: input.stallId,

          productBrandId,
        }))
      );
    }

    if (toDelete.length) {
      await context.db.delete(stallProductBrands).where(
        and(
          eq(stallProductBrands.stallId, input.stallId),

          inArray(stallProductBrands.productBrandId, toDelete)
        )
      );
    }

    return {
      success: true,
    };
  });
