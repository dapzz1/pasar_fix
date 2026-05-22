import { useState } from 'react';
import { toast } from 'sonner';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

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

      toast.success(
        'Sales realization created!'
      );
      onSuccess?.();
    },

    onError: () => {
      toast.error(
        'Failed to create sales realization'
      );
    },
  })
);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Report Date"
        type="date"
        value={form.reportDate}
        onChange={(e) =>
          setForm({
            ...form,
            reportDate: e.target.value,
          })
        }
      />

      <Select
        value={form.productBrandId}
        onValueChange={(value) =>
          setForm({
            ...form,
            productBrandId: value,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Product Brand" />
        </SelectTrigger>

        <SelectContent>
          {productBrands?.data?.map((brand) => (
            <SelectItem
              key={brand.id}
              value={brand.id}
            >
              {brand.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Month"
        value={form.month}
        onChange={(e) =>
          setForm({
            ...form,
            month: e.target.value,
          })
        }
      />

      <Input
        placeholder="Year"
        value={form.year}
        onChange={(e) =>
          setForm({
            ...form,
            year: e.target.value,
          })
        }
      />

      <Input
        placeholder="Realization Daily"
        type="number"
        value={form.realizationDaily}
        onChange={(e) =>
          setForm({
            ...form,
            realizationDaily: e.target.value,
          })
        }
      />

      <Input
        placeholder="Realization Monthly"
        type="number"
        value={form.realizationMonthly}
        onChange={(e) =>
          setForm({
            ...form,
            realizationMonthly: e.target.value,
          })
        }
      />

      <Input
        placeholder="RKAP Monthly"
        type="number"
        value={form.rkapMonthly}
        onChange={(e) =>
          setForm({
            ...form,
            rkapMonthly: e.target.value,
          })
        }
      />

      <Input
        placeholder="Realization YTD"
        type="number"
        value={form.realizationYtd}
        onChange={(e) =>
          setForm({
            ...form,
            realizationYtd: e.target.value,
          })
        }
      />

      <Input
        placeholder="RKAP YTD"
        type="number"
        value={form.rkapYtd}
        onChange={(e) =>
          setForm({
            ...form,
            rkapYtd: e.target.value,
          })
        }
      />

      <Input
        placeholder="RKAP Yearly"
        type="number"
        value={form.rkapYearly}
        onChange={(e) =>
          setForm({
            ...form,
            rkapYearly: e.target.value,
          })
        }
      />

      <Input
        placeholder="Realization Last Year"
        type="number"
        value={form.realizationLastYear}
        onChange={(e) =>
          setForm({
            ...form,
            realizationLastYear:e.target.value,
          })
        }
      />

      <Button
        className="w-full"
        disabled={createMutation.isPending}
         onClick={() =>
            createMutation.mutate({
              ...form,

              realizationDaily: Number(
                form.realizationDaily || 0
              ),

              realizationMonthly: Number(
                form.realizationMonthly || 0
              ),

              rkapMonthly: Number(
                form.rkapMonthly || 0
              ),

              realizationYtd: Number(
                form.realizationYtd || 0
              ),

              rkapYtd: Number(
                form.rkapYtd || 0
              ),

              rkapYearly: Number(
                form.rkapYearly || 0
              ),

              realizationLastYear: Number(
                form.realizationLastYear || 0
    ),
  })
}
      >
        {createMutation.isPending
          ? 'Creating...'
          : 'Create Sales Realization'}
      </Button>
    </div>
  );
}