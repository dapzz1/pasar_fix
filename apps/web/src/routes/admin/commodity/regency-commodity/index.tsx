import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import z from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { orpc } from '@/lib/orpc/client';

export const Route = createFileRoute('/admin/commodity/regency-commodity/')({
  component: RouteComponent,

  validateSearch: z.object({
    q: z.string().optional(),
    create: z.string().optional(),
    edit: z.string().optional(),
    delete: z.string().optional(),
  }).parse,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const [searchTerm, setSearchTerm] = useState('');

  const updateUrlParams = (params: Record<string, string | undefined>) => {
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        ...params,
      }),
    });
  };

  useEffect(() => {
    setSearchTerm(search.q || '');
  }, [search]);

  const { data: regencyCommodities, isLoading } = useQuery(
    orpc.admin.commodity.regency_commodity.get.queryOptions({
      input: {},
    })
  );

  const regencyCommoditiesList =
    regencyCommodities?.data.filter((item) => {
      const keyword = searchTerm.toLowerCase();

      return (
        item.regencyName.toLowerCase().includes(keyword) ||
        item.commodityTypeName.toLowerCase().includes(keyword)
      );
    }) || [];

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="text-left">
        <h1 className="font-bold text-3xl">Manage Regency Commodity</h1>

        <p className="text-slate-600">
          Create and manage regency commodity data
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <CardTitle>Regency Commodity List</CardTitle>

            <CardDescription>
              Manage regency commodity mapping data
            </CardDescription>
          </div>

          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            <div className="relative min-w-[150px] flex-1">
              <input
                className="w-full rounded-lg border py-2 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setSearchTerm(e.target.value);

                  updateUrlParams({
                    q: e.target.value || undefined,
                  });
                }}
                placeholder="Search regency commodity..."
                type="text"
                value={searchTerm}
              />

              <Search className="absolute top-2.5 left-3 h-4 w-4" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {(() => {
            if (isLoading) {
              return <p>Loading regency commodity...</p>;
            }

            if (regencyCommoditiesList.length === 0) {
              return (
                <p className="text-center text-gray-500">
                  No regency commodity found.
                </p>
              );
            }

            return (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left">Regency</th>

                      <th className="p-3 text-left">Commodity</th>

                      <th className="p-3 text-left">Area</th>

                      <th className="p-3 text-left">Year</th>
                    </tr>
                  </thead>

                  <tbody>
                    {regencyCommoditiesList.map((item) => (
                      <tr className="border-b hover:bg-muted/30" key={item.id}>
                        <td className="p-3">{item.regencyName}</td>

                        <td className="p-3">{item.commodityTypeName}</td>

                        <td className="p-3">{item.area}</td>

                        <td className="p-3">{item.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}
        </CardContent>
      </Card>
    </div>
  );
}
