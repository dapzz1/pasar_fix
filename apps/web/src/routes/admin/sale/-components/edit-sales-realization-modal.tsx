import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { orpc } from '@/lib/orpc/client';

type Props = {
  editingItem: any;

  setEditingItem: any;
};

export function EditSalesRealizationModal({
  editingItem,

  setEditingItem,
}: Props) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    orpc.admin.sale.sales_realization.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries();

        alert('Sales realization updated!');

        setEditingItem(null);
      },
    })
  );

  if (!editingItem) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-xl">Edit Sales Realization</h2>

          <button onClick={() => setEditingItem(null)}>✕</button>
        </div>

        <div className="space-y-4">
          <Input
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                month: e.target.value,
              })
            }
            placeholder="Month"
            value={editingItem.month}
          />

          <Input
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                year: e.target.value,
              })
            }
            placeholder="Year"
            value={editingItem.year}
          />

          <Input
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                realizationDaily: Number(e.target.value),
              })
            }
            placeholder="Realization Daily"
            type="number"
            value={editingItem.realizationDaily}
          />

          <Input
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                realizationMonthly: Number(e.target.value),
              })
            }
            placeholder="Realization Monthly"
            type="number"
            value={editingItem.realizationMonthly}
          />

          <Input
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                rkapMonthly: Number(e.target.value),
              })
            }
            placeholder="RKAP Monthly"
            type="number"
            value={editingItem.rkapMonthly}
          />

          <Input
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                realizationYtd: Number(e.target.value),
              })
            }
            placeholder="Realization YTD"
            type="number"
            value={editingItem.realizationYtd}
          />

          <Input
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                rkapYtd: Number(e.target.value),
              })
            }
            placeholder="RKAP YTD"
            type="number"
            value={editingItem.rkapYtd}
          />

          <Input
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                rkapYearly: Number(e.target.value),
              })
            }
            placeholder="RKAP Yearly"
            type="number"
            value={editingItem.rkapYearly}
          />

          <Input
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                realizationLastYear: Number(e.target.value),
              })
            }
            placeholder="Realization Last Year"
            type="number"
            value={editingItem.realizationLastYear}
          />

          <Button
            className="w-full"
            disabled={updateMutation.isPending}
            onClick={() => {
              updateMutation.mutate(editingItem);
            }}
          >
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
