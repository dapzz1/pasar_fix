import z from 'zod';

export const ProvincePotentialSchema = z.object({
  id: z.uuid(),
  provinceId: z.uuid(),
  productBrandId: z.uuid(),
  potential: z.number().optional(),
  description: z.string().optional(),
  year: z.string().optional(),
});
