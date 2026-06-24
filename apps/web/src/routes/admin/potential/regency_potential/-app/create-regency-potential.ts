import { ORPCError } from '@orpc/server';
import { generateUUID } from '@/lib/db/schema';
import { regencyPotentials } from '@/lib/db/schema/map-product';
import { protectedProcedure } from '@/lib/orpc';
import { RegencyPotentialSchema } from '../-domain/schema';

export const createRegencyPotential = protectedProcedure
  .input(RegencyPotentialSchema.omit({ id: true }))
  .handler(async ({ input, context }) => {
    try {
      const [created] = await context.db
        .insert(regencyPotentials)
        .values({
          id: generateUUID(),
          regencyId: input.regencyId,
          productBrandId: input.productBrandId,
          potential: input.potential,
          description: input.description,
          year: input.year,
        })
        .returning();
      return created;
    } catch (error) {
      const message = error instanceof Error ? error.message.toLowerCase() : '';
      if (message.includes('unique') || message.includes('duplicate')) {
        throw new ORPCError('CONFLICT', {
          message: 'Regency potential entry already exists',
        });
      }
      throw error;
    }
  });
