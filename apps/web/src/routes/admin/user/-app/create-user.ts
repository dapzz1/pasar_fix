import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { user } from '@/lib/db/schema';
import { protectedProcedure } from '@/lib/orpc';

export const createUser = protectedProcedure
  .input(
    z.object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(8),
      role: z.enum(['admin', 'viewer', 'guest']),
    })
  )
  .handler(async ({ input, context }) => {
    const result = await auth.api.signUpEmail({
      body: {
        name: input.name,
        email: input.email,
        password: input.password,
      },
    });

    const [createdUser] = await context.db
      .update(user)
      .set({
        role: input.role,
        updatedAt: new Date(),
      })
      .where(eq(user.id, result.user.id))
      .returning({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });

    if (!createdUser) {
      throw new Error('User account was created but its role could not be set');
    }

    return { data: createdUser };
  });
