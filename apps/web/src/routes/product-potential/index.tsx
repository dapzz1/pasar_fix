import { useQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { orpc } from '@/lib/orpc/client';

export const Route = createFileRoute('/product-potential/')({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/auth/login',
        search: (prev) => ({
          ...prev,
          redirect: '/product-potential',
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
  const provincePotentials = useQuery(
    orpc.admin.potential.province_potential.get.queryOptions({ input: {} })
  );
  const regencyPotentials = useQuery(
    orpc.admin.potential.regency_potential.get.queryOptions({ input: {} })
  );
  const provinceTotal = (provincePotentials.data?.data ?? []).reduce(
    (total, item) => total + (item.potential ?? 0),
    0
  );
  const regencyTotal = (regencyPotentials.data?.data ?? []).reduce(
    (total, item) => total + (item.potential ?? 0),
    0
  );

  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <div>
        <h1 className="font-bold text-3xl">Product Potential</h1>
        <p className="text-muted-foreground">
          Market potential recorded by province and regency.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <PotentialCard
          entries={provincePotentials.data?.data.length ?? 0}
          label="Province Potential"
          total={provinceTotal}
        />
        <PotentialCard
          entries={regencyPotentials.data?.data.length ?? 0}
          label="Regency Potential"
          total={regencyTotal}
        />
      </div>
    </main>
  );
}

function PotentialCard({
  entries,
  label,
  total,
}: {
  entries: number;
  label: string;
  total: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold text-3xl">{total.toLocaleString()} ton</p>
        <p className="text-muted-foreground text-sm">{entries} records</p>
      </CardContent>
    </Card>
  );
}
