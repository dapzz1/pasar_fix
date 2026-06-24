import { Trans, useLingui } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Boxes,
  Building2,
  ChartNoAxesCombined,
  Layers3,
  Map as MapIcon,
  MapPinned,
  PackageOpen,
  Store,
  Wheat,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { orpc } from '@/lib/orpc/client';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

const formatNumber = (value: number) =>
  new Intl.NumberFormat('id-ID').format(value);

function AdminDashboard() {
  const { user } = Route.useRouteContext();
  const { i18n, t } = useLingui();
  const summaryQuery = useQuery(
    orpc.admin.dashboard.getSummary.queryOptions({ input: undefined })
  );
  const healthQuery = useQuery(orpc.healthCheck.queryOptions());
  const summary = summaryQuery.data;
  const provinceCoverage =
    summary && summary.provinces > 0
      ? Math.round(
          (summary.potential.coveredProvinces / summary.provinces) * 100
        )
      : 0;
  const stats = [
    {
      description: t`Administrative regions`,
      href: '/admin/region/province' as const,
      icon: MapIcon,
      label: t`Provinces`,
      value: summary?.provinces,
    },
    {
      description: t`Cities and regencies`,
      href: '/admin/region/regency' as const,
      icon: MapPinned,
      label: t`Regencies`,
      value: summary?.regencies,
    },
    {
      description: t`Land classifications`,
      href: '/admin/land' as const,
      icon: Layers3,
      label: t`Land Types`,
      value: summary?.landTypes,
    },
    {
      description: t`Commodity master data`,
      href: '/admin/commodity' as const,
      icon: Wheat,
      label: t`Commodities`,
      value: summary?.commodityTypes,
    },
    {
      description: t`Product categories`,
      href: '/admin/product' as const,
      icon: Boxes,
      label: t`Product Types`,
      value: summary?.productTypes,
    },
    {
      description: t`Registered product brands`,
      href: '/admin/product/product-brand' as const,
      icon: PackageOpen,
      label: t`Product Brands`,
      value: summary?.productBrands,
    },
    {
      description: t`Registered sales outlets`,
      href: '/admin/stall' as const,
      icon: Store,
      label: t`Stalls`,
      value: summary?.stalls,
    },
    {
      description: t`Uploaded sales reports`,
      href: '/admin/sale' as const,
      icon: ChartNoAxesCombined,
      label: t`Sales Realizations`,
      value: summary?.salesRealizations,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-bold text-3xl tracking-tight">
            <Trans>Dashboard</Trans>
          </h1>
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-800 text-xs">
            API {healthQuery.data === 'OK' ? 'online' : 'checking'}
          </span>
        </div>
        <p className="text-muted-foreground text-sm">
          {t`Welcome back, ${user?.name ?? 'Admin'}`}{' '}
          <Trans>Here's an overview of marketing map data.</Trans>
        </p>
      </div>

      {summaryQuery.isError && (
        <div
          className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-destructive text-sm"
          role="alert"
        >
          <Trans>Dashboard data could not be loaded. Please try again.</Trans>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} to={stat.href}>
              <Card className="h-full transition-colors hover:bg-muted/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="font-medium text-sm">
                    {stat.label}
                  </CardTitle>
                  <Icon className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {summaryQuery.isLoading ? (
                    <Skeleton className="mb-2 h-8 w-16" />
                  ) : (
                    <div className="font-bold text-2xl">
                      {formatNumber(stat.value ?? 0)}
                    </div>
                  )}
                  <p className="text-muted-foreground text-xs">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <Trans>Province Potential Coverage</Trans>
            </CardTitle>
            <CardDescription>
              <Trans>Completeness of potential data used by the map</Trans>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-bold text-3xl">
                  {summaryQuery.isLoading ? (
                    <Skeleton className="h-9 w-24" />
                  ) : (
                    `${provinceCoverage}%`
                  )}
                </p>
                <p className="text-muted-foreground text-sm">
                  {formatNumber(summary?.potential.coveredProvinces ?? 0)} /{' '}
                  {formatNumber(summary?.provinces ?? 0)}{' '}
                  <Trans>provinces covered</Trans>
                </p>
              </div>
              <Building2 className="size-8 text-muted-foreground" />
            </div>
            <div
              aria-label={t`Province potential coverage ${provinceCoverage}%`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={provinceCoverage}
              className="h-2 overflow-hidden rounded-full bg-muted"
              role="progressbar"
            >
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${provinceCoverage}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 border-t pt-4 text-sm">
              <div>
                <p className="text-muted-foreground">
                  <Trans>Potential entries</Trans>
                </p>
                <p className="font-semibold">
                  {formatNumber(summary?.potential.entries ?? 0)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  <Trans>Total potential</Trans>
                </p>
                <p className="font-semibold">
                  {formatNumber(summary?.potential.total ?? 0)} ton
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs">
              <Trans>Last potential update:</Trans>{' '}
              {summary?.potential.latestUpdatedAt
                ? i18n.date(new Date(summary.potential.latestUpdatedAt), {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })
                : t`No data`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Trans>Latest Product Brands</Trans>
            </CardTitle>
            <CardDescription>
              <Trans>Most recently registered products</Trans>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {summaryQuery.isLoading && (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
            {!summaryQuery.isLoading &&
              summary?.recentProductBrands.length === 0 && (
                <p className="py-8 text-center text-muted-foreground text-sm">
                  <Trans>No product brands have been registered.</Trans>
                </p>
              )}
            <div className="space-y-4">
              {summary?.recentProductBrands.map((product) => (
                <div className="flex items-start gap-3" key={product.id}>
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <PackageOpen className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm">
                      {product.name}
                    </p>
                    <p className="line-clamp-2 text-muted-foreground text-xs">
                      {product.description ??
                        product.industry ??
                        t`No description available`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
