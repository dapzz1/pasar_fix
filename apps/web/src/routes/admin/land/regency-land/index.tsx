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

export const Route = createFileRoute('/admin/land/regency-land/')({
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

  const { data: regencyLands, isLoading } = useQuery(
    orpc.admin.land.regency_land.get.queryOptions({
      input: {},
    })
  );

  const regencyLandsList =
    regencyLands?.data.filter((item) => {
      const keyword = searchTerm.toLowerCase();

      return (
        item.regencyName.toLowerCase().includes(keyword) ||
        item.landTypeName.toLowerCase().includes(keyword)
      );
    }) || [];

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="text-left">
        <h1 className="font-bold text-3xl">Manage Regency Land</h1>

        <p className="text-slate-600">Create and manage regency land data</p>
      </div>

      <Card>
        <CardHeader className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <CardTitle>Regency Land List</CardTitle>

            <CardDescription>Manage regency land mapping data</CardDescription>
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
                placeholder="Search regency land..."
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
              return <p>Loading regency land...</p>;
            }

            if (regencyLandsList.length === 0) {
              return (
                <p className="text-center text-gray-500">
                  No regency land found.
                </p>
              );
            }

            return (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left">Regency</th>

                      <th className="p-3 text-left">Land Type</th>

                      <th className="p-3 text-left">Area</th>

                      <th className="p-3 text-left">Year</th>
                    </tr>
                  </thead>

                  <tbody>
                    {regencyLandsList.map((item) => (
                      <tr className="border-b hover:bg-muted/30" key={item.id}>
                        <td className="p-3">{item.regencyName}</td>

                        <td className="p-3">{item.landTypeName}</td>

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
