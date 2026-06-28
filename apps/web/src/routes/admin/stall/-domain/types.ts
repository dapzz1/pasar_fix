import type { orpc } from '@/lib/orpc/client';

type StallsResponse = Awaited<ReturnType<typeof orpc.admin.stall.get.call>>;

export type StallItem = StallsResponse['data'][number];
