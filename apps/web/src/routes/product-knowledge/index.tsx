import { useQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { orpc } from '@/lib/orpc/client';

export const Route = createFileRoute('/product-knowledge/')({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/auth/login',
        search: (prev) => ({
          ...prev,
          redirect: '/product-knowledge',
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
  const productTypes = useQuery(
    orpc.admin.product.product_type.get.queryOptions({ input: {} })
  );
  const productBrands = useQuery(
    orpc.admin.product.product_brand.get.queryOptions({ input: {} })
  );
  const dosages = useQuery(
    orpc.admin.product.product_dosage.get.queryOptions({ input: {} })
  );

  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <div>
        <h1 className="font-bold text-3xl">Product Knowledge</h1>
        <p className="text-muted-foreground">
          Product portfolio and recommended commodity dosages.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          label="Product Types"
          value={productTypes.data?.data.length ?? 0}
        />
        <SummaryCard
          label="Product Brands"
          value={productBrands.data?.data.length ?? 0}
        />
        <SummaryCard
          label="Dosage References"
          value={dosages.data?.data.length ?? 0}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product Brands</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {productBrands.data?.data.map((brand) => (
            <div className="rounded-lg border p-4" key={brand.id}>
              <p className="font-semibold">{brand.name}</p>
              <p className="text-muted-foreground text-sm">
                {brand.industry || 'Industry not specified'}
              </p>
              <p className="mt-2 text-sm">
                {brand.description || 'No description available.'}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{label}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold text-3xl">{value}</CardContent>
    </Card>
  );
}
