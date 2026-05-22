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
          <h2 className="font-semibold text-xl">
            Edit Sales Realization
          </h2>

          <button
            onClick={() =>
              setEditingItem(null)
            }
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <Input
            value={editingItem.month}
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                month: e.target.value,
              })
            }
            placeholder="Month"
          />

          <Input
            value={editingItem.year}
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                year: e.target.value,
              })
            }
            placeholder="Year"
          />

          <Input
            type="number"
            value={editingItem.realizationDaily}
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                realizationDaily:
                  Number(e.target.value),
              })
            }
            placeholder="Realization Daily"
          />

          <Input
            type="number"
            value={
              editingItem.realizationMonthly
            }
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                realizationMonthly:
                  Number(e.target.value),
              })
            }
            placeholder="Realization Monthly"
          />

          <Input
            type="number"
            value={editingItem.rkapMonthly}
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                rkapMonthly: Number(
                  e.target.value
                ),
              })
            }
            placeholder="RKAP Monthly"
          />

          <Input
            type="number"
            value={editingItem.realizationYtd}
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                realizationYtd:
                  Number(e.target.value),
              })
            }
            placeholder="Realization YTD"
          />

          <Input
            type="number"
            value={editingItem.rkapYtd}
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                rkapYtd: Number(
                  e.target.value
                ),
              })
            }
            placeholder="RKAP YTD"
          />

          <Input
            type="number"
            value={editingItem.rkapYearly}
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                rkapYearly: Number(
                  e.target.value
                ),
              })
            }
            placeholder="RKAP Yearly"
          />

          <Input
            type="number"
            value={editingItem.realizationLastYear}
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                realizationLastYear: Number(
                  e.target.value
                ),
              })
            }
            placeholder="Realization Last Year"
          />

          <Button
            className="w-full"
            disabled={updateMutation.isPending}
            onClick={() => {
              updateMutation.mutate(
                editingItem
              );
            }}
          >
            {updateMutation.isPending
              ? 'Saving...'
              : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}