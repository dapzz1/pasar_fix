import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { orpc } from '@/lib/orpc/client';
import { useAppForm } from '../-hooks/form';

export function EditProvincePotentialForm({
  open,
  onOpenChange,
  provincePotentialId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provincePotentialId: string | null;
}) {
  const queryClient = useQueryClient();

  const { data: provinces } = useQuery(
    orpc.admin.region.province.get.queryOptions({ input: {} })
  );

  const { data: productBrands } = useQuery(
    orpc.admin.product.product_brand.get.queryOptions({ input: {} })
  );

  const { data: provincePotentials } = useQuery(
    orpc.admin.potential.province_potential.get.queryOptions({ input: {} })
  );
  const currentProvincePotential = provincePotentials?.data.find(
    (pp) => pp.id === provincePotentialId
  );

  const updateMutation = useMutation<
    Awaited<
      ReturnType<typeof orpc.admin.potential.province_potential.update.call>
    >,
    Error,
    Parameters<typeof orpc.admin.potential.province_potential.update.call>[0]
  >({
    mutationFn: (provincePotentialData) =>
      orpc.admin.potential.province_potential.update.call(
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
      provinceId: currentProvincePotential?.provinceId ?? '',
      productBrandId: '',
      potential: currentProvincePotential?.potential?.toString() ?? '',
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
          id: currentProvincePotential?.id as string,
          provinceId: value.provinceId,
          productBrandId: value.productBrandId,
          potential:
            value.potential !== '' ? Number(value.potential) : undefined,
          description: value.description || undefined,
          year: value.year || undefined,
        };

        await updateMutation.mutateAsync(
          payload as Parameters<
            typeof orpc.admin.potential.province_potential.update.call
          >[0]
        );
        toast.success('Province potential updated successfully!');
        onOpenChange(false);
      } catch (_error) {
        toast.error('Failed to update province potential.');
      }
    },
  });

  useEffect(() => {
    form.setFieldValue(
      'provinceId',
      currentProvincePotential?.provinceId ?? ''
    );
    form.setFieldValue(
      'productBrandId',
      currentProvincePotential?.productBrandId ?? ''
    );
    form.setFieldValue(
      'potential',
      currentProvincePotential?.potential?.toString() ?? ''
    );
    form.setFieldValue(
      'description',
      currentProvincePotential?.description ?? ''
    );
    form.setFieldValue('year', currentProvincePotential?.year ?? '');
  }, [currentProvincePotential, form]);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogTitle>Update Province Potential</DialogTitle>
        <DialogDescription>
          Update the province potential details
        </DialogDescription>

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
                <form.subscribeButton label="Update" />
              </form.AppForm>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
