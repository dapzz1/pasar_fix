import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { orpc } from '@/lib/orpc/client';

type Props = {
  editingItem: any;

  setEditingItem: any;
};

export function EditDailySalesModal({
  editingItem,

  setEditingItem,
}: Props) {
  const queryClient =
    useQueryClient();

  const { data: productBrands } =
    useQuery(
      orpc.admin.product.product_brand.get.queryOptions(
        {
          input: {},
        }
      )
    );

  const [form, setForm] =
    useState({
      id: '',

      date: '',

      month: '',

      year: '',

      productBrandId: '',

      qty: '',

      revenue: '',

      target: '',

      notes: '',
    });

  useEffect(() => {
    if (editingItem) {
      setForm({
        id: editingItem.id,

        date:
          editingItem.date || '',

        month:
          editingItem.month || '',

        year:
          editingItem.year || '',

        productBrandId:
          editingItem.productBrandId ||
          '',

        qty:
          editingItem.qty?.toString() ||
          '',

        revenue:
          editingItem.revenue?.toString() ||
          '',

        target:
          editingItem.target?.toString() ||
          '',

        notes:
          editingItem.notes || '',
      });
    }
  }, [editingItem]);

  const updateMutation =
    useMutation(
      orpc.admin.sale.daily_sales.update.mutationOptions(
        {
          onSuccess:
            async () => {
              await queryClient.invalidateQueries();

              toast.success(
                'Daily sales updated!'
              );

              setEditingItem(
                null
              );
            },

          onError: () => {
            toast.error(
              'Failed to update daily sales'
            );
          },
        }
      )
    );

  return (
    <Dialog
      open={!!editingItem}
      onOpenChange={() =>
        setEditingItem(null)
      }
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Edit Daily Sales
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date:
                  e.target.value,
              })
            }
          />

          <Select
            value={
              form.productBrandId
            }
            onValueChange={(
              value
            ) =>
              setForm({
                ...form,
                productBrandId:
                  value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Product Brand" />
            </SelectTrigger>

            <SelectContent>
              {productBrands?.data?.map(
                (
                  brand: any
                ) => (
                  <SelectItem
                    key={
                      brand.id
                    }
                    value={
                      brand.id
                    }
                  >
                    {
                      brand.name
                    }
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <Input
            placeholder="Month"
            value={form.month}
            onChange={(e) =>
              setForm({
                ...form,
                month:
                  e.target.value,
              })
            }
          />

          <Input
            placeholder="Year"
            value={form.year}
            onChange={(e) =>
              setForm({
                ...form,
                year:
                  e.target.value,
              })
            }
          />

          <Input
            placeholder="Qty"
            type="number"
            value={form.qty}
            onChange={(e) =>
              setForm({
                ...form,
                qty:
                  e.target.value,
              })
            }
          />

          <Input
            placeholder="Revenue"
            type="number"
            value={form.revenue}
            onChange={(e) =>
              setForm({
                ...form,
                revenue:
                  e.target.value,
              })
            }
          />

          <Input
            placeholder="Target"
            type="number"
            value={form.target}
            onChange={(e) =>
              setForm({
                ...form,
                target:
                  e.target.value,
              })
            }
          />

          <Input
            placeholder="Notes"
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes:
                  e.target.value,
              })
            }
          />

          <Button
            className="w-full"
            disabled={
              updateMutation.isPending
            }
            onClick={() =>
              updateMutation.mutate({
                ...form,

                qty: Number(
                  form.qty || 0
                ),

                revenue:
                  Number(
                    form.revenue ||
                      0
                  ),

                target:
                  Number(
                    form.target ||
                      0
                  ),
              })
            }
          >
            {updateMutation.isPending
              ? 'Updating...'
              : 'Update Daily Sales'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}