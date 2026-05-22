import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

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

import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { orpc } from '@/lib/orpc/client';
import { CreateDailySalesModal } from './-components/create-daily-sales-modal';
import { EditDailySalesModal } from './-components/edit-daily-sales-modal';

export const Route = createFileRoute(
  '/admin/sale/sale-daily/'
)({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient =
  useQueryClient();

  const [searchTerm, setSearchTerm] =
    useState('');

  const [page, setPage] = 
    useState(1);

  const [limit, setLimit] =
    useState(10);

  const [
  editingItem,
  setEditingItem,
] = useState<any>(null);

  const {
    data: dailySales,
    isLoading,
  } = useQuery(
    orpc.admin.sale.daily_sales.get.queryOptions(
      {
        input: {
          page,
          limit,
          search: searchTerm,
        },
      }
    )
  );

    const deleteMutation =
    useMutation(
      orpc.admin.sale.daily_sales.delete.mutationOptions(
        {
          onSuccess:
            async () => {
              await queryClient.invalidateQueries();

              toast.success(
                'Daily sales deleted!'
              );
            },

          onError: () => {
            toast.error(
              'Failed to delete daily sales'
            );
          },
        }
      )
    );

  const dailySalesList =
    dailySales?.data || [];

  const totalRevenue =
    dailySalesList.reduce(
      (
        acc: number,
        item: any
      ) =>
        acc + (item.revenue || 0),
      0
    );

  const totalQty =
    dailySalesList.reduce(
      (
        acc: number,
        item: any
      ) => acc + (item.qty || 0),
      0
    );

    const exportToExcel = async () => {
  const XLSX = await import('xlsx');

  const { saveAs } = await import(
    'file-saver'
  );

  const worksheet =
    XLSX.utils.json_to_sheet(
      dailySalesList.map(
        (item: any) => ({
          Date: item.date,

          ProductBrand:
            item.productBrandName,

          Month: item.month,

          Year: item.year,

          Qty: item.qty,

          Revenue:
            item.revenue,

          Target: item.target,

          Notes: item.notes,

          Achievement:
            item.target > 0
              ? (
                  (item.qty /
                    item.target) *
                  100
                ).toFixed(1) +
                '%'
              : '0%',
        })
      )
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Daily Sales'
  );

  const excelBuffer =
    XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

  const fileData = new Blob(
    [excelBuffer],
    {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    }
  );

  saveAs(
    fileData,
    'daily-sales.xlsx'
  );
};

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="text-left">
        <h1 className="font-bold text-3xl">
          Manage Daily Sales
        </h1>

        <p className="text-slate-600">
          Manage daily sales data
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Total Data
            </p>

            <h2 className="mt-2 font-bold text-3xl">
              {dailySalesList.length}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Total Revenue
            </p>

            <h2 className="mt-2 font-bold text-3xl">
              {totalRevenue.toLocaleString()}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Total Qty
            </p>

            <h2 className="mt-2 font-bold text-3xl">
              {totalQty.toLocaleString()}
            </h2>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <CardTitle>
              Daily Sales List
            </CardTitle>

            <CardDescription>
              Manage daily sales data
            </CardDescription>
          </div>

          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            <CreateDailySalesModal />

            <Button
              variant="outline"
              onClick={exportToExcel}
            >
              Export Excel
            </Button>

             <Select
                value={String(limit)}
                onValueChange={(value) =>
                  setLimit(Number(value))
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="10">
                    10 Rows
                  </SelectItem>

                  <SelectItem value="25">
                    25 Rows
                  </SelectItem>

                  <SelectItem value="50">
                    50 Rows
                  </SelectItem>

                  <SelectItem value="100">
                    100 Rows
                  </SelectItem>
                </SelectContent>
              </Select>

            <div className="relative min-w-[250px] flex-1">
              <Input
                className="pl-10"
                placeholder="Search daily sales..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
              />

              <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p>
              Loading daily sales...
            </p>
          ) : dailySalesList.length === 0 ? (
            <p className="text-center text-gray-500">
              No daily sales found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[1400px] text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="p-3 text-left">
                      Date
                    </th>

                    <th className="p-3 text-left">
                      Product Brand
                    </th>

                    <th className="p-3 text-left">
                      Month
                    </th>

                    <th className="p-3 text-left">
                      Year
                    </th>

                    <th className="p-3 text-right">
                      Qty
                    </th>

                    <th className="p-3 text-right">
                      Revenue
                    </th>

                    <th className="p-3 text-right">
                      Target
                    </th>

                    <th className="p-3 text-left">
                      Notes
                    </th>

                    <th className="p-3 text-right">
                      Achievement
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {dailySalesList.map(
                    (item: any) => (
                      <tr
                        key={item.id}
                        className="border-b hover:bg-muted/30"
                      >
                        <td className="p-3">
                          {item.date}
                        </td>

                        <td className="p-3">
                          {
                            item.productBrandName
                          }
                        </td>

                        <td className="p-3">
                          {item.month}
                        </td>

                        <td className="p-3">
                          {item.year}
                        </td>

                        <td className="p-3 text-right">
                          {item.qty}
                        </td>

                        <td className="p-3 text-right">
                          {item.revenue}
                        </td>

                        <td className="p-3 text-right">
                          {item.target}
                        </td>

                        <td className="p-3">
                          {item.notes}
                        </td>

                        <td className="p-3 text-right font-semibold">
                          <span
                            className={
                              item.target > 0 &&
                              (item.revenue /
                              item.target) *
                                100 >=
                                100
                                ? 'text-emerald-600'
                                : 'text-red-500'
                            }
                          >
                            {item.target > 0
                              ? (
                                  (item.revenue /
                                    item.target) *
                                  100
                                ).toFixed(1)
                              : 0}
                            %
                          </span>
                        </td>
                        <td className="p-3">
                        <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setEditingItem(item)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                            size="sm"
                            variant="destructive"
                            disabled={
                              deleteMutation.isPending
                            }
                            onClick={() => {
                              const confirmDelete =
                                confirm(
                                  'Delete this daily sales?'
                                );

                              if (!confirmDelete) {
                                return;
                              }

                              deleteMutation.mutate({
                                id: item.id,
                              });
                            }}
                            >
                            Delete
                        </Button>
                        </div>
                      </td>
                    </tr>
                    )
                  )}
                </tbody>
              </table>
              <div className="mt-4 flex items-center justify-between">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() =>
                  setPage((prev) => prev - 1)
                }
              >
                Previous
              </Button>

              <p className="text-sm text-muted-foreground">
                Page {page}
              </p>

              <Button
                variant="outline"
                disabled={
                  dailySalesList.length < limit
                }
                onClick={() =>
                  setPage((prev) => prev + 1)
                }
              >
                Next
              </Button>
            </div>
            </div>
          )}
        </CardContent>
      </Card>
        <EditDailySalesModal
          editingItem={editingItem}
          setEditingItem={
            setEditingItem
          }
        />
    </div>
  );
}