import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { orpc } from '@/lib/orpc/client';
import { useAppForm } from '../-hooks/form';

export function CreateProvincePotentialForm({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();

  const { data: provinces } = useQuery(
    orpc.admin.region.province.get.queryOptions({ input: {} })
  );

  const { data: productBrands } = useQuery(
    orpc.admin.product.product_brand.get.queryOptions({ input: {} })
  );

  const createMutation = useMutation<
    Awaited<
      ReturnType<typeof orpc.admin.potential.province_potential.create.call>
    >,
    Error,
    Parameters<typeof orpc.admin.potential.province_potential.create.call>[0]
  >({
    mutationFn: (provincePotentialData) =>
      orpc.admin.potential.province_potential.create.call(
        provincePotentialData
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orpc.admin.potential.province_potential.get.queryKey({
          input: {},
        }),
      });
    },
  });

  const toast = useToast();
  const form = useAppForm({
    defaultValues: {
      provinceId: '',
      productBrandId: '',
      potential: '',
      description: '',
      year: '',
    },
    validators: {
      onBlur: () => {
        const errors = {
          fields: {},
        } as {
          fields: Record<string, string>;
        };

        return errors;
      },
    },
    onSubmit: async ({ value }) => {
      try {
        const payload: Record<string, unknown> = {
          provinceId: value.provinceId,
          productBrandId: value.productBrandId,
          potential:
            value.potential !== '' ? Number(value.potential) : undefined,
          description: value.description || undefined,
          year: value.year || undefined,
        };

        await createMutation.mutateAsync(
          payload as Parameters<
            typeof orpc.admin.potential.province_potential.create.call
          >[0]
        );
        toast.success('Province potential created successfully!');
        onOpenChange(false);
      } catch (_error) {
        toast.error('Failed to create province potential.');
      }
    },
  });

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogTitle>Create Province Potential</DialogTitle>
        <DialogDescription>Add a new province potential</DialogDescription>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid-col-1 grid gap-4 md:grid-cols-2">
            <form.AppField
              name="provinceId"
              validators={{
                onBlur: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return 'Province is required';
                  }
                  return;
                },
              }}
            >
              {(field) => (
                <field.selectField
                  label="Province"
                  placeholder="Select a province"
                  values={
                    provinces?.data?.map((prov) => ({
                      label: prov.name,
                      value: prov.id,
                    })) || []
                  }
                />
              )}
            </form.AppField>

            <form.AppField
              name="productBrandId"
              validators={{
                onBlur: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return 'Product brand is required';
                  }
                  return;
                },
              }}
            >
              {(field) => (
                <field.selectField
                  label="Product Brand"
                  placeholder="Select a product brand"
                  values={
                    productBrands?.data?.map((brand) => ({
                      label: brand.name,
                      value: brand.id,
                    })) || []
                  }
                />
              )}
            </form.AppField>

            <form.AppField
              name="potential"
              validators={{
                onBlur: ({ value }) => {
                  const numVal = Number(value);
                  if (value !== '' && (Number.isNaN(numVal) || numVal < 0)) {
                    return 'Potential must be a non-negative number';
                  }
                  return;
                },
              }}
            >
              {(field) => (
                <field.textField
                  label="Potential (ton)"
                  placeholder="Enter potential in tons"
                />
              )}
            </form.AppField>

            <form.AppField name="year">
              {(field) => (
                <field.textField label="Year" placeholder="ex. 2026" />
              )}
            </form.AppField>

            <form.AppField name="description">
              {(field) => (
                <field.textField
                  label="Description"
                  placeholder="Optional description"
                />
              )}
            </form.AppField>

            <div className="flex justify-end">
              <form.AppForm>
                <form.subscribeButton label="Create" />
              </form.AppForm>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
