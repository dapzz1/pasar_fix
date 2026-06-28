import { Trans, useLingui } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Fish,
  Handshake,
  Map as MapIcon,
  MapPinned,
  PackageOpen,
  Route as RouteIcon,
  Sprout,
  Store,
  Target,
  Users,
  Wheat,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { orpc } from '@/lib/orpc/client';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { t } = useLingui();
  const { user } = Route.useRouteContext();
  const programs = [
    {
      description: t`Identify customer needs and map sales channels for new products.`,
      icon: MapPinned,
      number: '01',
      title: t`Market Mapping & Sales Strategy`,
    },
    {
      description: t`Visit end users, monitor the market, and strengthen field distribution networks.`,
      icon: RouteIcon,
      number: '02',
      title: t`Customer Roadshow`,
    },
    {
      description: t`Strengthen brand awareness and product education through active demonstration plots.`,
      icon: Sprout,
      number: '03',
      title: t`Outreach & Demonstration Plots`,
    },
  ];
  const monitoringPrograms = [
    {
      icon: Wheat,
      period: t`June – September 2026`,
      scope: t`Java & Bali`,
      title: t`New Product Market Monitoring`,
    },
    {
      icon: Handshake,
      period: t`February 2026`,
      scope: 'Biofertil & Petro Gladiator',
      title: t`Demonstration Plot Partnership Monitoring`,
    },
    {
      icon: Fish,
      period: t`April – May 2026`,
      scope: t`Medium to large-scale aquaculture businesses`,
      title: t`Petro Fish Market Penetration`,
    },
  ];
  const responsibilities = [
    t`Market mapping and new product development`,
    t`Ensure sales targets and evaluate achievements`,
    t`Develop adaptive sales strategies`,
    t`Communicate change management internally and externally`,
    t`Fulfill legal and good corporate governance requirements`,
  ];
  const orgStructure = {
    leader: {
      name: 'Achmad Zaid',
      title: t`PM New Product Management`,
      role: 'PM',
    },
    deputy: {
      name: 'Erwin Indra P',
      title: t`SMD I New Product Management`,
      role: 'SMD I',
    },
  };
  const canLoadStats = Boolean(user);
  const provincesQuery = useQuery({
    ...orpc.admin.region.province.get.queryOptions({ input: {} }),
    enabled: canLoadStats,
  });
  const commoditiesQuery = useQuery({
    ...orpc.admin.commodity.commodity_type.get.queryOptions({ input: {} }),
    enabled: canLoadStats,
  });
  const productBrandsQuery = useQuery({
    ...orpc.admin.product.product_brand.get.queryOptions({ input: {} }),
    enabled: canLoadStats,
  });
  const stallsQuery = useQuery({
    ...orpc.admin.stall.get.queryOptions({ input: { limit: 1 } }),
    enabled: canLoadStats,
  });
  const stats = [
    {
      icon: MapPinned,
      label: t`Provinces`,
      note: t`Registered regions`,
      value: provincesQuery.data?.data.length,
    },
    {
      icon: Wheat,
      label: t`Commodities`,
      note: t`Active market data`,
      value: commoditiesQuery.data?.data.length,
    },
    {
      icon: PackageOpen,
      label: t`Product Brands`,
      note: t`In the portfolio`,
      value: productBrandsQuery.data?.data.length,
    },
    {
      icon: Store,
      label: t`Stalls`,
      note: t`Distribution network`,
      value: stallsQuery.data?.total,
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f0e8] text-[#173326]">
      <section className="relative isolate overflow-hidden bg-[#092c1c] px-4 py-20 text-white md:py-28">
        <div className="-z-10 absolute inset-0 opacity-20 [background-image:linear-gradient(120deg,transparent_0%,transparent_48%,#4caf72_49%,transparent_50%,transparent_100%)] [background-size:56px_56px]" />
        <div className="-right-24 -z-10 absolute top-10 size-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="-left-24 -z-10 absolute bottom-0 size-72 rounded-full bg-lime-300/10 blur-3xl" />

        <div className="mx-auto max-w-5xl text-center">
          <Badge className="mb-8 border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-emerald-100 hover:bg-emerald-300/10">
            <span className="mr-2 size-2 animate-pulse rounded-full bg-emerald-400" />
            <Trans>New Product Management · Marketing Intelligence</Trans>
          </Badge>
          <h1 className="mx-auto max-w-4xl font-semibold font-serif text-4xl leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            <Trans>
              Market data for{' '}
              <span className="text-[#58c47d]">better decisions</span>
            </Trans>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-emerald-50/65 leading-7 md:text-lg">
            <Trans>
              A central source of regional potential, commodity, product, and
              distribution network information supporting new product
              development at Petrokimia Gresik.
            </Trans>
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 bg-[#58c47d] px-7 font-semibold text-[#092c1c] hover:bg-[#6bd68f]"
            >
              <Link to="/map">
                <MapIcon className="mr-2 size-4" />
                <Trans>View Marketing Map</Trans>
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 border-white/20 bg-white/5 px-7 text-white hover:bg-white/10 hover:text-white"
              variant="outline"
            >
              <a href="#program">
                <Trans>View Work Programs</Trans>
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="-mt-8 relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid overflow-hidden rounded-2xl border border-[#d8d1c4] bg-white shadow-emerald-950/5 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                className="flex items-center gap-4 border-[#e8e2d8] p-6 last:border-r-0 sm:border-r"
                key={stat.label}
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="font-bold font-serif text-3xl">
                    {stat.value ?? '—'}
                  </p>
                  <p className="font-semibold text-sm">{stat.label}</p>
                  <p className="text-[#66776d] text-xs">{stat.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24" id="program">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-semibold text-emerald-700 text-xs uppercase tracking-[0.24em]">
              <Trans>Main work programs</Trans>
            </p>
            <h2 className="max-w-2xl font-semibold font-serif text-3xl tracking-tight md:text-5xl">
              <Trans>Connecting data, markets, and field activities</Trans>
            </h2>
          </div>
          <p className="max-w-md text-[#66776d] text-sm leading-6">
            <Trans>
              Three key priorities for sustainably increasing awareness,
              penetration, and adoption of new products.
            </Trans>
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <article
                className="group hover:-translate-y-1 relative overflow-hidden rounded-2xl border border-[#d8d1c4] bg-[#faf8f3] p-7 transition hover:border-emerald-300 hover:bg-white hover:shadow-emerald-950/5 hover:shadow-xl"
                key={program.number}
              >
                <span className="absolute top-5 right-6 font-bold font-serif text-5xl text-emerald-950/5">
                  {program.number}
                </span>
                <div className="mb-7 flex size-12 items-center justify-center rounded-xl bg-[#0d3a25] text-emerald-300">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-3 font-semibold font-serif text-xl">
                  {program.title}
                </h3>
                <p className="text-[#66776d] text-sm leading-6">
                  {program.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#e7ede5] px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 font-semibold text-emerald-700 text-xs uppercase tracking-[0.24em]">
              <Trans>Monitoring agenda</Trans>
            </p>
            <h2 className="font-semibold font-serif text-3xl md:text-4xl">
              <Trans>2026 field activities</Trans>
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {monitoringPrograms.map((program) => {
              const Icon = program.icon;
              return (
                <article
                  className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur"
                  key={program.title}
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Icon className="size-5" />
                    </div>
                    <CalendarDays className="size-4 text-[#829087]" />
                  </div>
                  <h3 className="font-semibold">{program.title}</h3>
                  <p className="mt-2 text-[#66776d] text-sm">{program.scope}</p>
                  <p className="mt-4 border-[#e1e7df] border-t pt-4 font-medium text-emerald-700 text-xs">
                    {program.period}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 font-semibold text-emerald-700 text-xs uppercase tracking-[0.24em]">
            <Trans>Organizational mandate</Trans>
          </p>
          <h2 className="font-semibold font-serif text-3xl md:text-5xl">
            <Trans>Measurable new product management</Trans>
          </h2>
          <p className="mt-5 max-w-xl text-[#66776d] text-sm leading-7">
            <Trans>
              The team combines market intelligence, sales evaluation, and
              network development to ensure strategies remain grounded in market
              conditions.
            </Trans>
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border border-[#d8d1c4] bg-white p-5 shadow-emerald-950/5 shadow-sm">
              <p className="font-semibold text-emerald-700 text-xs uppercase tracking-[0.18em]">
                {orgStructure.leader.role}
              </p>
              <h3 className="mt-3 font-semibold font-serif text-xl">
                {orgStructure.leader.name}
              </h3>
              <p className="mt-1 text-[#66776d] text-sm">
                {orgStructure.leader.title}
              </p>
            </article>
            <article className="rounded-2xl border border-[#d8d1c4] bg-white p-5 shadow-emerald-950/5 shadow-sm">
              <p className="font-semibold text-emerald-700 text-xs uppercase tracking-[0.18em]">
                {orgStructure.deputy.role}
              </p>
              <h3 className="mt-3 font-semibold font-serif text-xl">
                {orgStructure.deputy.name}
              </h3>
              <p className="mt-1 text-[#66776d] text-sm">
                {orgStructure.deputy.title}
              </p>
            </article>
          </div>
          <div className="mt-8 flex gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#0d3a25] text-emerald-300">
              <Users className="size-5" />
            </div>
            <div>
              <p className="font-semibold">
                <Trans>Cross-functional collaboration</Trans>
              </p>
              <p className="text-[#66776d] text-sm">
                <Trans>Marketing, sales, products, and distribution</Trans>
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-[#0d3a25] p-7 text-white shadow-2xl shadow-emerald-950/15 md:p-10">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-emerald-300 text-xs uppercase tracking-[0.2em]">
                <Trans>Core responsibilities</Trans>
              </p>
              <h3 className="mt-2 font-semibold font-serif text-2xl">
                <Trans>Execution focus</Trans>
              </h3>
            </div>
            <Target className="size-8 text-emerald-300" />
          </div>
          <ul className="space-y-4">
            {responsibilities.map((responsibility) => (
              <li
                className="flex gap-3 text-emerald-50/80 text-sm"
                key={responsibility}
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-300" />
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid grid-cols-2 gap-3 border-white/10 border-t pt-7">
            <div className="rounded-xl bg-white/5 p-4">
              <BarChart3 className="mb-3 size-5 text-emerald-300" />
              <p className="font-semibold text-sm">
                <Trans>Data evaluation</Trans>
              </p>
              <p className="mt-1 text-emerald-50/50 text-xs">
                <Trans>Targets and realization</Trans>
              </p>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <Store className="mb-3 size-5 text-emerald-300" />
              <p className="font-semibold text-sm">
                <Trans>Market network</Trans>
              </p>
              <p className="mt-1 text-emerald-50/50 text-xs">
                <Trans>Stalls and end users</Trans>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
