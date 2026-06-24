import z from 'zod';

export const ProvinceCommoditySchema = z.object({
  id: z.uuid(),
  provinceId: z.uuid(),
  commodityTypeId: z.uuid(),
  area: z.number().nonnegative(),
  year: z.string().min(4).max(4),
});
