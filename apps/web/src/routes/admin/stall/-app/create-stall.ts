import { stalls } from '@/lib/db/schema/stall';

import { protectedProcedure } from '@/lib/orpc';

import { StallSchema } from '../-domain/schema';

export const createStall = protectedProcedure
  .input(StallSchema)
  .handler(async ({ input, context }) => {
    const [data] = await context.db
      .insert(stalls)
      .values({
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
      .returning();

    return data;
  });
