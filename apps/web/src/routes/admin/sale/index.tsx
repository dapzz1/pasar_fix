import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import z from 'zod';
import { SalesRealizationTable } from './-components/sales-realization-table';
import { EditSalesRealizationModal } from './-components/edit-sales-realization-modal';
import { CreateSalesRealizationModal } from './-components/create-sales-realization-modal';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { orpc } from '@/lib/orpc/client';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const Route = createFileRoute('/admin/sale/')({
  component: RouteComponent,

  validateSearch: z.object({
    q: z.string().optional(),
  }).parse,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const search = Route.useSearch();

  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [editingItem, setEditingItem] = useState<any>(null);

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

  const {
    data: salesRealizations,

    isLoading,
  } = useQuery(
    orpc.admin.sale.sales_realization.get.queryOptions({
      input: {
        page,
        limit,
      },
    })
  );

  const deleteMutation = useMutation(
    orpc.admin.sale.sales_realization.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries();

        alert('Sales realization deleted!');
      },
    })
  );

  const salesRealizationsList =
    salesRealizations?.data?.filter((item: any) => {
      const keyword = searchTerm.toLowerCase();

      return (
        item.productBrandName?.toLowerCase().includes(keyword) ||
        item.month?.toLowerCase().includes(keyword) ||
        item.year?.toLowerCase().includes(keyword)
      );
    }) || [];
  const totalRealization = salesRealizationsList.reduce(
    (acc: number, item: any) => acc + (item.realizationMonthly || 0),
    0
  );

  const totalRkap = salesRealizationsList.reduce(
    (acc: number, item: any) => acc + (item.rkapMonthly || 0),
    0
  );

  const exportToExcel = () => {
    const formattedData = salesRealizationsList.map((item: any) => ({
      ProductBrand: item.productBrandName,

      Month: item.month,

      Year: item.year,

      RealizationMonthly: item.realizationMonthly,

      RKAPMonthly: item.rkapMonthly,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Realizations');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const fileData = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(fileData, 'sales-realizations.xlsx');
  };

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="text-left">
        <h1 className="font-bold text-3xl">Manage Sales Realization</h1>

        <p className="text-slate-600">
          Create and manage sales realization data
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Data</p>

            <h2 className="mt-2 font-bold text-3xl">
              {salesRealizationsList.length}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Realization</p>

            <h2 className="mt-2 font-bold text-3xl">
              {totalRealization.toLocaleString()}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total RKAP</p>

            <h2 className="mt-2 font-bold text-3xl">
              {totalRkap.toLocaleString()}
            </h2>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <CardTitle>Sales Realization List</CardTitle>

            <CardDescription>Manage sales realization data</CardDescription>
          </div>

          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            <CreateSalesRealizationModal />

            <Button variant="outline" onClick={exportToExcel}>
              Export Excel
            </Button>

            <Select
              value={String(limit)}
              onValueChange={(value) => {
                setLimit(Number(value));
                setPage(1);
              }}
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
                placeholder="Search sales realization..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);

                  updateUrlParams({
                    q: e.target.value || undefined,
                  });
                }}
              />

              <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p>Loading sales realizations...</p>
          ) : salesRealizationsList.length === 0 ? (
            <p className="text-center text-gray-500">
              No sales realizations found.
            </p>
          ) : (
            <SalesRealizationTable
              salesRealizationsList={salesRealizationsList}
              deleteMutation={deleteMutation}
              setEditingItem={setEditingItem}
            />
          )}
          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>

            <p className="text-sm text-muted-foreground">Page {page}</p>

            <Button
              variant="outline"
              disabled={salesRealizationsList.length < 10}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditSalesRealizationModal
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />
    </div>
  );
}
