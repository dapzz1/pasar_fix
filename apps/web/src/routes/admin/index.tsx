import { Trans, useLingui } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { FileText, MapPin, Package, Warehouse } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { orpc } from '@/lib/orpc/client';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user } = Route.useRouteContext();
  const { t } = useLingui();

  const { data: provinces } = useQuery(
    orpc.admin.region.province.get.queryOptions({
      input: {},
    })
  );

  const { data: regencies } = useQuery(
    orpc.admin.region.regency.get.queryOptions({
      input: {},
    })
  );

  const { data: commodities } = useQuery(
    orpc.admin.commodity.commodity_type.get.queryOptions({
      input: {},
    })
  );

  const { data: productTypes } = useQuery(
    orpc.admin.product.product_type.get.queryOptions({
      input: {},
    })
  );

  const { data: productBrands } = useQuery(
    orpc.admin.product.product_brand.get.queryOptions({
      input: {},
    })
  );

  const { data: stalls } = useQuery(
    orpc.admin.stall.get.queryOptions({
      input: {},
    })
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-bold text-3xl tracking-tight">
          <Trans>Dashboard</Trans>
        </h1>

        <p className="text-muted-foreground text-sm">
          {t`Welcome back, ${user?.name}`}{' '}
          <Trans>Here's an overview of marketing maps</Trans>
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Provinces</CardTitle>
            <MapPin className="h-4 w-4" />
          </CardHeader>

          <CardContent>
            <div className="font-bold text-2xl">
              {provinces?.data?.length ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Regencies</CardTitle>
            <MapPin className="h-4 w-4" />
          </CardHeader>

          <CardContent>
            <div className="font-bold text-2xl">
              {regencies?.data?.length ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Product Brands</CardTitle>
            <Package className="h-4 w-4" />
          </CardHeader>

          <CardContent>
            <div className="font-bold text-2xl">
              {productBrands?.data?.length ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Stalls</CardTitle>
            <Warehouse className="h-4 w-4" />
          </CardHeader>

          <CardContent>
            <div className="font-bold text-2xl">
              {stalls?.data?.length ?? 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Data */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Product Brands</CardTitle>

            <CardDescription>Latest registered product brands</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {productBrands?.data?.slice(0, 5).map((brand) => (
                <div className="rounded-lg border p-3" key={brand.id}>
                  <p className="font-medium">{brand.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Stalls</CardTitle>

            <CardDescription>Latest registered stalls</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {stalls?.data?.slice(0, 5).map((stall) => (
                <div className="rounded-lg border p-3" key={stall.id}>
                  <p className="font-medium">{stall.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Summary */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              System Summary
            </div>
          </CardTitle>

          <CardDescription>
            Overview of marketing database records
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              Product Types :
              <span className="ml-2 font-semibold">
                {productTypes?.data?.length ?? 0}
              </span>
            </div>

            <div>
              Product Brands :
              <span className="ml-2 font-semibold">
                {productBrands?.data?.length ?? 0}
              </span>
            </div>

            <div>
              Commodities :
              <span className="ml-2 font-semibold">
                {commodities?.data?.length ?? 0}
              </span>
            </div>

            <div>
              Stalls :
              <span className="ml-2 font-semibold">
                {stalls?.data?.length ?? 0}
              </span>
            </div>

            <div>
              Provinces :
              <span className="ml-2 font-semibold">
                {provinces?.data?.length ?? 0}
              </span>
            </div>

            <div>
              Regencies :
              <span className="ml-2 font-semibold">
                {regencies?.data?.length ?? 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
