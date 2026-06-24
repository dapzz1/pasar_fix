import { and, asc, eq, isNotNull } from 'drizzle-orm';
import { z } from 'zod';
import { provinces, regencies } from '@/lib/db/schema/map-product';
import { stalls } from '@/lib/db/schema/stall';
import { protectedProcedure } from '@/lib/orpc';

export const getMapStalls = protectedProcedure
  .input(
    z.object({
      provinceId: z.string().uuid().optional(),
      regencyId: z.string().uuid().optional(),
    })
  )
  .handler(async ({ input, context }) => {
    const conditions = [
      isNotNull(stalls.latitude),
      isNotNull(stalls.longitude),
    ];
    if (input.provinceId) {
      conditions.push(eq(stalls.provinceId, input.provinceId));
    }
    if (input.regencyId) {
      conditions.push(eq(stalls.regencyId, input.regencyId));
    }

    return {
      data: await context.db
        .select({
          id: stalls.id,
          name: stalls.name,
          address: stalls.address,
          provinceName: provinces.name,
          regencyName: regencies.name,
          latitude: stalls.latitude,
          longitude: stalls.longitude,
          owner: stalls.owner,
          notelp: stalls.noTelp,
          criteria: stalls.criteria,
        })
        .from(stalls)
        .innerJoin(provinces, eq(stalls.provinceId, provinces.id))
        .innerJoin(regencies, eq(stalls.regencyId, regencies.id))
        .where(and(...conditions))
        .orderBy(asc(stalls.name)),
    };
  });
