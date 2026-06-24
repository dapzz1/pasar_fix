import z from 'zod';

export const RegencyPotentialSchema = z.object({
  id: z.uuid(),
  regencyId: z.uuid(),
  productBrandId: z.uuid(),
  potential: z.number().nonnegative().optional(),
  description: z.string().optional(),
  year: z.string().optional(),
});
