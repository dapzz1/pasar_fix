import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import type { orpc } from '@/lib/orpc/client';
import type { SalesRealizationItem } from '../-domain/types';

type Props = {
  salesRealizationsList: SalesRealizationItem[];
  deleteMutation: {
    isPending: boolean;
    mutate: (
      input: Parameters<typeof orpc.admin.sale.sales_realization.delete.call>[0]
    ) => void;
  };
  setEditingItem: Dispatch<SetStateAction<SalesRealizationItem | null>>;
};

export function SalesRealizationTable({
  salesRealizationsList,

  deleteMutation,

  setEditingItem,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[1600px] text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="p-3 text-left">Product Brand</th>

            <th className="p-3 text-left">Month</th>

            <th className="p-3 text-left">Year</th>

            <th className="p-3 text-left">Realization Monthly</th>

            <th className="p-3 text-left">RKAP Monthly</th>

            <th className="p-3 text-left">Report Date</th>

            <th className="p-3 text-left">Daily</th>

            <th className="p-3 text-left">YTD</th>

            <th className="p-3 text-left">RKAP YTD</th>

            <th className="p-3 text-left">RKAP Yearly</th>

            <th className="p-3 text-left">Last Year</th>

            <th className="p-3 text-left">Achievement</th>

            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {salesRealizationsList.map((item) => (
            <tr className="border-b hover:bg-muted/30" key={item.id}>
              <td className="p-3">{item.productBrandName}</td>

              <td className="p-3">{item.month}</td>

              <td className="p-3">{item.year}</td>

              <td className="p-3">{item.realizationMonthly}</td>

              <td className="p-3">{item.rkapMonthly}</td>

              <td className="p-3">{item.reportDate}</td>

              <td className="p-3">{item.realizationDaily}</td>

              <td className="p-3">{item.realizationYtd}</td>

              <td className="p-3">{item.rkapYtd}</td>

              <td className="p-3">{item.rkapYearly}</td>

              <td className="p-3">{item.realizationLastYear}</td>

              <td className="p-3 font-semibold">
                {(item.rkapMonthly ?? 0) > 0
                  ? (
                      ((item.realizationMonthly ?? 0) /
                        (item.rkapMonthly ?? 1)) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </td>

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
                    disabled={deleteMutation.isPending}
                    onClick={() => {
                      const confirmDelete = confirm(
                        'Delete this sales realization?'
                      );

                      if (!confirmDelete) {
                        return;
                      }

                      deleteMutation.mutate({
                        id: item.id,
                      });
                    }}
                    size="sm"
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
    </div>
  );
}
