import { eq } from 'drizzle-orm';

import { z } from 'zod';

import { dailySales } from '@/lib/db/schema/sale';

import { protectedProcedure } from '@/lib/orpc';

export const deleteDailySales =
  protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .handler(
      async ({
        input,
        context,
      }) => {
        const [data] =
          await context.db
            .delete(dailySales)
            .where(
              eq(
                dailySales.id,
                input.id
              )
            )
            .returning();

        return data;
      }
    );