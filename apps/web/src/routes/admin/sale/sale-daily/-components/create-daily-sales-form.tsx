import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

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

export function CreateDailySalesForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();

  const { data: productBrands } = useQuery(
    orpc.admin.product.product_brand.get.queryOptions({
      input: {},
    })
  );

  const [form, setForm] = useState({
    date: '',

    month: '',

    year: '',

    productBrandId: '',

    qty: '',

    revenue: '',

    target: '',

    notes: '',
  });

  const createMutation = useMutation(
    orpc.admin.sale.daily_sales.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries();

        toast.success('Daily sales created!');
        onSuccess?.();
      },

      onError: () => {
        toast.error('Failed to create daily sales');
      },
    })
  );

  return (
    <div className="space-y-4">
      <Input
        onChange={(e) =>
          setForm({
            ...form,
            date: e.target.value,
          })
        }
        type="date"
        value={form.date}
      />

      <Select
        onValueChange={(value) =>
          setForm({
            ...form,
            productBrandId: value,
          })
        }
        value={form.productBrandId}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Product Brand" />
        </SelectTrigger>

        <SelectContent>
          {productBrands?.data?.map((brand) => (
            <SelectItem key={brand.id} value={brand.id}>
              {brand.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        onChange={(e) =>
          setForm({
            ...form,
            month: e.target.value,
          })
        }
        placeholder="Month"
        value={form.month}
      />

      <Input
        onChange={(e) =>
          setForm({
            ...form,
            year: e.target.value,
          })
        }
        placeholder="Year"
        value={form.year}
      />

      <Input
        onChange={(e) =>
          setForm({
            ...form,
            qty: e.target.value,
          })
        }
        placeholder="Qty"
        type="number"
        value={form.qty}
      />

      <Input
        onChange={(e) =>
          setForm({
            ...form,
            revenue: e.target.value,
          })
        }
        placeholder="Revenue"
        type="number"
        value={form.revenue}
      />

      <Input
        onChange={(e) =>
          setForm({
            ...form,
            target: e.target.value,
          })
        }
        placeholder="Target"
        type="number"
        value={form.target}
      />

      <Input
        onChange={(e) =>
          setForm({
            ...form,
            notes: e.target.value,
          })
        }
        placeholder="Notes"
        value={form.notes}
      />

      <Button
        className="w-full"
        disabled={createMutation.isPending}
        onClick={() =>
          createMutation.mutate({
            ...form,

            qty: Number(form.qty || 0),

            revenue: Number(form.revenue || 0),

            target: Number(form.target || 0),
          })
        }
      >
        {createMutation.isPending ? 'Creating...' : 'Create Daily Sales'}
      </Button>
    </div>
  );
}
