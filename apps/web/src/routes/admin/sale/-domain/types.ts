import type { orpc } from '@/lib/orpc/client';

type SalesRealizationResponse = Awaited<
  ReturnType<typeof orpc.admin.sale.sales_realization.get.call>
>;
type DailySalesResponse = Awaited<
  ReturnType<typeof orpc.admin.sale.daily_sales.get.call>
>;

export type SalesRealizationItem = SalesRealizationResponse['data'][number];
export type DailySalesItem = DailySalesResponse['data'][number];
