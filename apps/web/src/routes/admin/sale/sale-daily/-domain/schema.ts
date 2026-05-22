import z from 'zod';

export const DailySalesSchema = z.object({
  id: z.string().uuid().optional(),

  date: z.string(),

  month:
    z.string()
     .nullable()
     .optional(),

  year:
    z.string()
    .nullable()
    .optional(),

  productBrandId:
    z.string()
    .uuid(),

  provinceId:
    z.string()
    .uuid()
    .nullable()
    .optional(),

  qty:
    z.number()
    .nullable()
    .optional(),

  revenue:
    z.number()
    .nullable()
    .optional(),

  target:
    z.number()
    .nullable()
    .optional(),

  notes:
    z.string()
    .nullable()
    .optional(),
});