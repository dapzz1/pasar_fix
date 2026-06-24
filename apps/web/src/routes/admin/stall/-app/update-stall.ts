import { eq } from 'drizzle-orm';

import { stalls } from '@/lib/db/schema/stall';

import { protectedProcedure } from '@/lib/orpc';

import { StallSchema } from '../-domain/schema';

export const updateStall = protectedProcedure
  .input(StallSchema)
  .handler(async ({ input, context }) => {
    const [data] = await context.db
      .update(stalls)
      .set({
        name: input.name,

        address: input.address,

        provinceId: input.provinceId,

        regencyId: input.regencyId,

        latitude: input.latitude,

        longitude: input.longitude,

        owner: input.owner,

        noTelp: input.noTelp,

        criteria: input.criteria,
      })
      .where(eq(stalls.id, input.id!))
      .returning();

    return data;
  });
