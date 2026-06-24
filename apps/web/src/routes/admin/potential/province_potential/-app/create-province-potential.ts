import { ORPCError } from '@orpc/server';
import { generateUUID } from '@/lib/db/schema';
import { provincePotentials } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';
import { ProvincePotentialSchema } from '../-domain/schema';

export const createProvincePotential = protectedProcedure
  .input(ProvincePotentialSchema.omit({ id: true }))
  .handler(async ({ input, context }) => {
    const newProvincePotential = {
      id: generateUUID(),
      provinceId: input.provinceId,
      productBrandId: input.productBrandId,
      potential: input.potential,
      description: input.description,
      year: input.year,
    };

    try {
      const [createdProvincePotential] = await context.db
        .insert(provincePotentials)
        .values(newProvincePotential)
        .returning();

      return createdProvincePotential;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (
        msg.toLowerCase().includes('unique') ||
        msg.toLowerCase().includes('duplicate')
      ) {
        throw new ORPCError('CONFLICT', {
          message: 'Province potential entry already exists',
        });
      }
      throw err;
    }
  });
