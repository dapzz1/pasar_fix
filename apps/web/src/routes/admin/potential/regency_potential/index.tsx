import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { orpc } from '@/lib/orpc/client';
import { DeleteRegencyPotentialForm } from './-components/delete-regency-potential-form';
import {
  RegencyPotentialForm,
  type RegencyPotentialFormItem,
} from './-components/regency-potential-form';

export const Route = createFileRoute('/admin/potential/regency_potential/')({
  component: RegencyPotentialPage,
});

function RegencyPotentialPage() {
  const [search, setSearch] = useState('');
  const [provinceId, setProvinceId] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] =
    useState<RegencyPotentialFormItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<{
    id: string;
    productBrandName: string;
    regencyName: string;
  } | null>(null);
  const potentialsQuery = useQuery(
    orpc.admin.potential.regency_potential.get.queryOptions({ input: {} })
  );
  const provincesQuery = useQuery(
    orpc.admin.region.province.get.queryOptions({ input: {} })
  );
  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return (potentialsQuery.data?.data ?? []).filter((item) => {
      const matchesProvince =
        provinceId === 'all' || item.provinceId === provinceId;
      const matchesSearch =
        !normalizedSearch ||
        item.provinceName.toLowerCase().includes(normalizedSearch) ||
        item.regencyName.toLowerCase().includes(normalizedSearch) ||
        item.productBrandName.toLowerCase().includes(normalizedSearch);
      return matchesProvince && matchesSearch;
    });
  }, [potentialsQuery.data, provinceId, search]);

  return (
    <div className="container mx-auto space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <CardTitle>Regency Potential</CardTitle>
              <CardDescription>
                Manage regency-level product potential data
              </CardDescription>
            </div>
            <Button
              onClick={() => {
                setEditingItem(null);
                setFormOpen(true);
              }}
              type="button"
            >
              <Plus className="mr-2 size-4" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid gap-3 md:grid-cols-[1fr_240px]">
            <div className="relative">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 size-4 text-muted-foreground" />
              <Input
                className="pl-10"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search province, regency, or product brand..."
                value={search}
              />
            </div>
            <Select onValueChange={setProvinceId} value={provinceId}>
              <SelectTrigger>
                <SelectValue placeholder="Filter province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Provinces</SelectItem>
                {provincesQuery.data?.data.map((province) => (
                  <SelectItem key={province.id} value={province.id}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {potentialsQuery.isLoading && (
            <p className="py-8 text-center text-muted-foreground">
              Loading regency potentials...
            </p>
          )}
          {potentialsQuery.isError && (
            <p className="py-8 text-center text-destructive" role="alert">
              Failed to load regency potentials.
            </p>
          )}
          {!(potentialsQuery.isLoading || potentialsQuery.isError) &&
            filteredItems.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">
                No regency potentials found.
              </p>
            )}
          {filteredItems.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th
                      className="px-4 py-3 text-left font-medium text-sm"
                      scope="col"
                    >
                      Province
                    </th>
                    <th
                      className="px-4 py-3 text-left font-medium text-sm"
                      scope="col"
                    >
                      Regency
                    </th>
                    <th
                      className="px-4 py-3 text-left font-medium text-sm"
                      scope="col"
                    >
                      Product Brand
                    </th>
                    <th
                      className="px-4 py-3 text-left font-medium text-sm"
                      scope="col"
                    >
                      Potential (ton)
                    </th>
                    <th
                      className="px-4 py-3 text-left font-medium text-sm"
                      scope="col"
                    >
                      Year
                    </th>
                    <th
                      className="px-4 py-3 text-right font-medium text-sm"
                      scope="col"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredItems.map((item) => (
                    <tr className="hover:bg-muted/30" key={item.id}>
                      <td className="px-4 py-3 text-sm">{item.provinceName}</td>
                      <td className="px-4 py-3 text-sm">{item.regencyName}</td>
                      <td className="px-4 py-3 text-sm">
                        {item.productBrandName}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {item.potential?.toLocaleString() ?? '-'}
                      </td>
                      <td className="px-4 py-3 text-sm">{item.year ?? '-'}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            aria-label={`Edit ${item.regencyName} potential`}
                            onClick={() => {
                              setEditingItem(item);
                              setFormOpen(true);
                            }}
                            size="icon"
                            type="button"
                            variant="ghost"
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button
                            aria-label={`Delete ${item.regencyName} potential`}
                            onClick={() => setDeleteItem(item)}
                            size="icon"
                            type="button"
                            variant="ghost"
                          >
                            <Trash2 className="size-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <RegencyPotentialForm
        item={editingItem}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) {
            setEditingItem(null);
          }
        }}
        open={formOpen}
      />
      <DeleteRegencyPotentialForm
        item={deleteItem}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteItem(null);
          }
        }}
        open={Boolean(deleteItem)}
      />
    </div>
  );
}
