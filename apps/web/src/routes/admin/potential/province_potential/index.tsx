import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { orpc } from '@/lib/orpc/client';
import { displayYear, getYearOptions } from '@/lib/utils/year-options';
import { CreateProvincePotentialForm } from './-components/create-province-potential-form';
import { DeleteProvincePotentialForm } from './-components/delete-province-potential-form';
import { EditProvincePotentialForm } from './-components/edit-province-potential-form';

type ProvincePotentialListItem = {
  id: string;
  provinceId: string;
  provinceCode: string;
  provinceName: string;
  productBrandName: string;
  potential: number | null;
  year: string | null;
};

export const Route = createFileRoute('/admin/potential/province_potential/')({
  component: RouteComponent,
  validateSearch: z.object({
    q: z.string().optional(),
    year: z.string().optional(),
    create: z.string().optional(),
    edit: z.string().optional(),
    delete: z.string().optional(),
  }).parse,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const { create, edit, delete: deleteParam } = search;
  const [currentDeleteItem, setCurrentDeleteItem] =
    useState<ProvincePotentialListItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const selectedYear = search.year ?? 'all';

  useEffect(() => {
    setSearchTerm(search.q || '');
  }, [search]);

  const { data: provincePotentials, isLoading } = useQuery(
    orpc.admin.potential.province_potential.get.queryOptions({ input: {} })
  );
  const yearOptions = useMemo(
    () => getYearOptions(provincePotentials?.data ?? []),
    [provincePotentials?.data]
  );
  const list =
    provincePotentials?.data.filter(
      (item) =>
        (selectedYear === 'all' || item.year === selectedYear) &&
        (item.provinceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.productBrandName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    ) || [];

  useEffect(() => {
    if (deleteParam && provincePotentials) {
      const item = provincePotentials?.data?.find((u) => u.id === deleteParam);
      if (item) {
        setCurrentDeleteItem(item);
      }
    }
  }, [deleteParam, provincePotentials]);

  const handleCreate = () => {
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        create: 'true',
        edit: undefined,
        delete: undefined,
      }),
    });
  };

  const handleEdit = (item: ProvincePotentialListItem) => {
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        edit: item.id,
        create: undefined,
        delete: undefined,
      }),
    });
  };

  const handleDelete = (item: ProvincePotentialListItem) => {
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        delete: item.id,
        create: undefined,
        edit: undefined,
      }),
    });
  };

  const renderContent = (() => {
    if (isLoading) {
      return (
        <div className="py-8 text-center text-gray-500">
          Loading province potentials...
        </div>
      );
    }

    if (list.length === 0) {
      return (
        <div className="py-8 text-center text-gray-500">
          No province potentials found.{' '}
          {searchTerm && 'Try a different search term.'}
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600 text-sm">
                Province
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 text-sm">
                Product Brand
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 text-sm">
                Potential (ton)
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 text-sm">
                Year
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-600 text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.map((item: ProvincePotentialListItem) => (
              <tr className="hover:bg-gray-50" key={item.id}>
                <td className="px-4 py-3 text-sm">{item.provinceName}</td>
                <td className="px-4 py-3 text-sm">{item.productBrandName}</td>
                <td className="px-4 py-3 text-sm">
                  {item.potential
                    ? Number(item.potential).toLocaleString()
                    : '-'}
                </td>
                <td className="px-4 py-3 text-sm">{displayYear(item.year)}</td>
                <td className="px-4 py-3 text-right text-sm">
                  <div className="flex justify-end gap-2">
                    <button
                      className="rounded p-1 text-blue-600 hover:bg-blue-50"
                      onClick={() => handleEdit(item)}
                      type="button"
                    >
                      <Edit className="size-4" />
                    </button>
                    <button
                      className="rounded p-1 text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(item)}
                      type="button"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  })();

  return (
    <div className="container mx-auto space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Province Potential</CardTitle>
              <CardDescription>
                Manage province-level product potential data
              </CardDescription>
            </div>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 size-4" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid gap-3 md:grid-cols-[1fr_200px]">
            <div className="relative">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 size-4 text-gray-400" />
              <input
                className="w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  navigate({
                    to: '.',
                    search: (prev) => ({
                      ...prev,
                      q: e.target.value || undefined,
                    }),
                  });
                }}
                placeholder="Search by province or product brand..."
                type="text"
                value={searchTerm}
              />
            </div>
            <Select
              onValueChange={(year) => {
                navigate({
                  to: '.',
                  search: (prev) => ({
                    ...prev,
                    year: year === 'all' ? undefined : year,
                  }),
                });
              }}
              value={selectedYear}
            >
              <SelectTrigger aria-label="Filter province potential by year">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {renderContent}
        </CardContent>
      </Card>

      <CreateProvincePotentialForm
        onOpenChange={(open) => {
          if (!open) {
            navigate({
              to: '.',
              search: (prev) => ({ ...prev, create: undefined }),
            });
          }
        }}
        open={Boolean(create)}
      />
      <EditProvincePotentialForm
        onOpenChange={(open) => {
          if (!open) {
            navigate({
              to: '.',
              search: (prev) => ({ ...prev, edit: undefined }),
            });
          }
        }}
        open={Boolean(edit)}
        provincePotentialId={edit ?? null}
      />
      <DeleteProvincePotentialForm
        onDelete={() => {
          navigate({
            to: '.',
            search: (prev) => ({ ...prev, delete: undefined }),
          });
          setCurrentDeleteItem(null);
        }}
        onOpenChange={(open) => {
          if (!open) {
            navigate({
              to: '.',
              search: (prev) => ({ ...prev, delete: undefined }),
            });
          }
        }}
        open={Boolean(deleteParam)}
        provincePotential={currentDeleteItem}
      />
    </div>
  );
}
