import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { orpc } from '@/lib/orpc/client';
import { CreateStallModal } from './-components/create-stall-modal';
import { EditStallForm } from './-components/edit-stall-form';
import { ManageStallProducts } from './-components/manage-stall-products';
import type { StallItem } from './-domain/types';

export const Route = createFileRoute('/admin/stall/')({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [editingItem, setEditingItem] = useState<StallItem | null>(null);

  const [productItem, setProductItem] = useState<StallItem | null>(null);

  const deleteMutation = useMutation(
    orpc.admin.stall.delete.mutationOptions({
      onSuccess: async () => {
        toast.success('Stall deleted successfully');

        await queryClient.invalidateQueries(
          orpc.admin.stall.get.queryOptions({
            input: {},
          })
        );
      },

      onError: () => {
        toast.error('Failed to delete stall');
      },
    })
  );

  const { data: stalls, isLoading } = useQuery(
    orpc.admin.stall.get.queryOptions({
      input: {
        page,
        limit,
        search: searchTerm,
      },
    })
  );

  const stallsList = stalls?.data || [];

  const exportToExcel = async () => {
    const XLSX = await import('xlsx');

    const { saveAs } = await import('file-saver');

    const worksheet = XLSX.utils.json_to_sheet(
      stallsList.map((item) => ({
        Name: item.name,

        Province: item.provinceName,

        Regency: item.regencyName,

        Address: item.address,

        Owner: item.owner,

        Phone: item.notelp,

        Latitude: item.latitude,

        Longitude: item.longitude,

        Criteria: item.criteria,
      }))
    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Stalls');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const fileData = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(fileData, 'stalls.xlsx');
  };

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="text-left">
        <h1 className="font-bold text-3xl">Manage Stalls</h1>

        <p className="text-slate-600">Manage kios and map distribution data</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm">Total Stalls</p>

            <h2 className="mt-2 font-bold text-3xl">{stalls?.total ?? 0}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm">Total Provinces</p>

            <h2 className="mt-2 font-bold text-3xl">
              {stalls?.totalProvinces ?? 0}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm">Total Regencies</p>

            <h2 className="mt-2 font-bold text-3xl">
              {stalls?.totalRegencies ?? 0}
            </h2>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <CardTitle>Stall List</CardTitle>

            <CardDescription>Manage kios and map distribution</CardDescription>
          </div>

          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            <CreateStallModal />

            <Button onClick={exportToExcel} variant="outline">
              Export Excel
            </Button>

            <Select
              onValueChange={(value) => setLimit(Number(value))}
              value={String(limit)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="10">10 Rows</SelectItem>

                <SelectItem value="25">25 Rows</SelectItem>

                <SelectItem value="50">50 Rows</SelectItem>

                <SelectItem value="100">100 Rows</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative min-w-[250px] flex-1">
              <Input
                className="pl-10"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search stall..."
                value={searchTerm}
              />

              <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading && <p>Loading stalls...</p>}
          {!isLoading && stallsList.length === 0 && (
            <p className="text-center text-gray-500">No stalls found.</p>
          )}
          {!isLoading && stallsList.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-[1400px] text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="p-3 text-left">Name</th>

                    <th className="p-3 text-left">Province</th>

                    <th className="p-3 text-left">Regency</th>

                    <th className="p-3 text-left">Owner</th>

                    <th className="p-3 text-left">Phone</th>

                    <th className="p-3 text-left">Latitude</th>

                    <th className="p-3 text-left">Longitude</th>

                    <th className="p-3 text-left">Criteria</th>

                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {stallsList.map((item) => (
                    <tr className="border-b hover:bg-muted/30" key={item.id}>
                      <td className="p-3">{item.name}</td>

                      <td className="p-3">{item.provinceName}</td>

                      <td className="p-3">{item.regencyName}</td>

                      <td className="p-3">{item.owner}</td>

                      <td className="p-3">{item.notelp}</td>

                      <td className="p-3">{item.latitude}</td>

                      <td className="p-3">{item.longitude}</td>

                      <td className="p-3">{item.criteria}</td>

                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setEditingItem(item)}
                            size="sm"
                            variant="outline"
                          >
                            Edit
                          </Button>

                          <Button
                            onClick={() => setProductItem(item)}
                            size="sm"
                            variant="secondary"
                          >
                            Products
                          </Button>

                          <Button
                            onClick={() => {
                              const confirmed = confirm('Delete this stall?');

                              if (confirmed) {
                                deleteMutation.mutate({
                                  id: item.id,
                                });
                              }
                            }}
                            variant="destructive"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex items-center justify-between">
                <Button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  variant="outline"
                >
                  Previous
                </Button>

                <p className="text-muted-foreground text-sm">Page {page}</p>

                <Button
                  disabled={page * limit >= (stalls?.total ?? 0)}
                  onClick={() => setPage((prev) => prev + 1)}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setEditingItem(null);
          }
        }}
        open={!!editingItem}
      >
        <DialogContent className="overflow-visible sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Stall</DialogTitle>
          </DialogHeader>

          {editingItem && (
            <EditStallForm
              editingItem={editingItem}
              onSuccess={() => setEditingItem(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setProductItem(null);
          }
        }}
        open={!!productItem}
      >
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Manage Products</DialogTitle>
          </DialogHeader>

          {productItem && <ManageStallProducts stall={productItem} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
