import z from 'zod';

export const SalesRealizationSchema = z.object({
  id: z.string().uuid().optional(),

  reportDate: z.string(),

  productBrandId: z.string().uuid(),

  realizationDaily: z.number().nullable().optional(),

  month: z.string().nullable().optional(),

  realizationMonthly: z.number().nullable().optional(),

  rkapMonthly: z.number().nullable().optional(),

  realizationYtd: z.number().nullable().optional(),

  rkapYtd: z.number().nullable().optional(),

  year: z.string().nullable().optional(),

  rkapYearly: z.number().nullable().optional(),

  realizationLastYear: z.number().nullable().optional(),
});
