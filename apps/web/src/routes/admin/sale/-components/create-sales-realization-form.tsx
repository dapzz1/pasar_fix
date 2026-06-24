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

export function CreateSalesRealizationForm({
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
    reportDate: '',
    productBrandId: '',
    month: '',
    year: '',
    realizationDaily: '',
    realizationMonthly: '',
    rkapMonthly: '',
    realizationYtd: '',
    rkapYtd: '',
    rkapYearly: '',
    realizationLastYear: '',
  });

  const createMutation = useMutation(
    orpc.admin.sale.sales_realization.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries();

        toast.success('Sales realization created!');
        onSuccess?.();
      },

      onError: () => {
        toast.error('Failed to create sales realization');
      },
    })
  );

  return (
    <div className="space-y-4">
      <Input
        onChange={(e) =>
          setForm({
            ...form,
            reportDate: e.target.value,
          })
        }
        placeholder="Report Date"
        type="date"
        value={form.reportDate}
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
            realizationDaily: e.target.value,
          })
        }
        placeholder="Realization Daily"
        type="number"
        value={form.realizationDaily}
      />

      <Input
        onChange={(e) =>
          setForm({
            ...form,
            realizationMonthly: e.target.value,
          })
        }
        placeholder="Realization Monthly"
        type="number"
        value={form.realizationMonthly}
      />

      <Input
        onChange={(e) =>
          setForm({
            ...form,
            rkapMonthly: e.target.value,
          })
        }
        placeholder="RKAP Monthly"
        type="number"
        value={form.rkapMonthly}
      />

      <Input
        onChange={(e) =>
          setForm({
            ...form,
            realizationYtd: e.target.value,
          })
        }
        placeholder="Realization YTD"
        type="number"
        value={form.realizationYtd}
      />

      <Input
        onChange={(e) =>
          setForm({
            ...form,
            rkapYtd: e.target.value,
          })
        }
        placeholder="RKAP YTD"
        type="number"
        value={form.rkapYtd}
      />

      <Input
        onChange={(e) =>
          setForm({
            ...form,
            rkapYearly: e.target.value,
          })
        }
        placeholder="RKAP Yearly"
        type="number"
        value={form.rkapYearly}
      />

      <Input
        onChange={(e) =>
          setForm({
            ...form,
            realizationLastYear: e.target.value,
          })
        }
        placeholder="Realization Last Year"
        type="number"
        value={form.realizationLastYear}
      />

      <Button
        className="w-full"
        disabled={createMutation.isPending}
        onClick={() =>
          createMutation.mutate({
            ...form,

            realizationDaily: Number(form.realizationDaily || 0),

            realizationMonthly: Number(form.realizationMonthly || 0),

            rkapMonthly: Number(form.rkapMonthly || 0),

            realizationYtd: Number(form.realizationYtd || 0),

            rkapYtd: Number(form.rkapYtd || 0),

            rkapYearly: Number(form.rkapYearly || 0),

            realizationLastYear: Number(form.realizationLastYear || 0),
          })
        }
      >
        {createMutation.isPending ? 'Creating...' : 'Create Sales Realization'}
      </Button>
    </div>
  );
}
