import { count, max, sum } from 'drizzle-orm';
import { dailySales, salesRealizations } from '@/lib/db/schema/sale';
import { protectedProcedure } from '@/lib/orpc';

export const getSalesOverview = protectedProcedure.handler(
  async ({ context }) => {
    const [[realization], [daily]] = await Promise.all([
      context.db
        .select({
          entries: count(),
          latestReportDate: max(salesRealizations.reportDate),
          realizationMonthly: sum(salesRealizations.realizationMonthly),
          rkapMonthly: sum(salesRealizations.rkapMonthly),
          realizationYtd: sum(salesRealizations.realizationYtd),
          rkapYtd: sum(salesRealizations.rkapYtd),
        })
        .from(salesRealizations),
      context.db
        .select({
          entries: count(),
          quantity: sum(dailySales.qty),
          revenue: sum(dailySales.revenue),
          target: sum(dailySales.target),
        })
        .from(dailySales),
    ]);

    return {
      realization: {
        entries: Number(realization?.entries ?? 0),
        latestReportDate: realization?.latestReportDate ?? null,
        realizationMonthly: Number(realization?.realizationMonthly ?? 0),
        rkapMonthly: Number(realization?.rkapMonthly ?? 0),
        realizationYtd: Number(realization?.realizationYtd ?? 0),
        rkapYtd: Number(realization?.rkapYtd ?? 0),
      },
      daily: {
        entries: Number(daily?.entries ?? 0),
        quantity: Number(daily?.quantity ?? 0),
        revenue: Number(daily?.revenue ?? 0),
        target: Number(daily?.target ?? 0),
      },
    };
  }
);
