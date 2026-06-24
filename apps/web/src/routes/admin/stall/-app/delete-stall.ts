import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { stallProductBrands, stalls } from '@/lib/db/schema/stall';
import { protectedProcedure } from '@/lib/orpc';

export const deleteStall = protectedProcedure
  .input(
    z.object({
      id: z.string().uuid(),
    })
  )
  .handler(async ({ input, context }) => {
    // Hapus relasi produk kios dulu
    await context.db
      .delete(stallProductBrands)
      .where(eq(stallProductBrands.stallId, input.id));

    // Baru hapus kios
    const [data] = await context.db
      .delete(stalls)
      .where(eq(stalls.id, input.id))
      .returning();

    return data;
  });
