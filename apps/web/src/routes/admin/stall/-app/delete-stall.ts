import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { stalls } from '@/lib/db/schema/stall';

import { protectedProcedure } from '@/lib/orpc';

export const deleteStall = protectedProcedure
  .input(
    z.object({
      id: z.string().uuid(),
    })
  )
  .handler(async ({ input, context }) => {
    const [data] = await context.db
      .delete(stalls)
      .where(eq(stalls.id, input.id))
      .returning();

    return data;
  });
