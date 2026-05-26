import z from 'zod';

export const StallSchema =
  z.object({
    id:
      z.string().uuid().optional(),

    name: z.string(),

    address:
      z.string().optional(),

    regencyId:
      z.string().uuid(),

    provinceId:
      z.string().uuid(),

    latitude:
      z.coerce.number().optional(),

    longitude:
      z.coerce.number().optional(),

    owner:
      z.string().optional(),

    noTelp:
      z.string().optional(),

    criteria:
      z.string().optional(),
  });