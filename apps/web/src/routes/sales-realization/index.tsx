import { useQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { orpc } from '@/lib/orpc/client';

export const Route = createFileRoute('/sales-realization/')({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/auth/login',
        search: (prev) => ({
          ...prev,
          redirect: '/sales-realization',
        }),
      });
    }

    try {
      const res = await orpc.admin.user.getById.call({
        userId: context.user.id,
      });

      const hasAccess = res.data?.some(
        (r) => r.role === 'admin' || r.role === 'viewer'
      );
      if (!hasAccess) {
        throw redirect({ to: '/' });
      }
    } catch {
      throw redirect({
        to: '/',
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const overview = useQuery(orpc.admin.sale.sale_overview.get.queryOptions());

  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <div>
        <h1 className="font-bold text-3xl">Sales Realization</h1>
        <p className="text-muted-foreground">
          Current realization and target performance.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Metric
          label="Monthly Realization"
          value={overview.data?.realization.realizationMonthly ?? 0}
        />
        <Metric
          label="Monthly RKAP"
          value={overview.data?.realization.rkapMonthly ?? 0}
        />
        <Metric
          label="YTD Realization"
          value={overview.data?.realization.realizationYtd ?? 0}
        />
        <Metric
          label="Daily Revenue"
          value={overview.data?.daily.revenue ?? 0}
        />
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{label}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold text-2xl">
        {value.toLocaleString()}
      </CardContent>
    </Card>
  );
}
