import z from 'zod';

export const StallSchema = z.object({
  name: z.string(),
  address: z.string(),
  provinceId: z.string(),
  regencyId: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  owner: z.string(),
  noTelp: z.string(),
  criteria: z.string(),

  productBrandIds: z.array(z.string()).default([]),
});
