import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { orpc } from '@/lib/orpc/client';

export interface RegencyPotentialFormItem {
  id: string;
  provinceId: string;
  regencyId: string;
  productBrandId: string;
  potential: number | null;
  description: string | null;
  year: string | null;
}

interface RegencyPotentialFormProps {
  item?: RegencyPotentialFormItem | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const getValidationError = ({
  potential,
  productBrandId,
  provinceId,
  regencyId,
}: {
  potential?: number;
  productBrandId: string;
  provinceId: string;
  regencyId: string;
}) => {
  if (!(provinceId && regencyId && productBrandId)) {
    return 'Province, regency, and product brand are required.';
  }
  if (potential !== undefined && (Number.isNaN(potential) || potential < 0)) {
    return 'Potential must be a non-negative number.';
  }
  return null;
};

export function RegencyPotentialForm({
  item,
  onOpenChange,
  open,
}: RegencyPotentialFormProps) {
  const isEditing = Boolean(item);
  const queryClient = useQueryClient();
  const toast = useToast();
  const [provinceId, setProvinceId] = useState('');
  const [regencyId, setRegencyId] = useState('');
  const [productBrandId, setProductBrandId] = useState('');
  const [potential, setPotential] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(String(new Date().getFullYear()));

  const provincesQuery = useQuery(
    orpc.admin.region.province.get.queryOptions({ input: {} })
  );
  const regenciesQuery = useQuery(
    orpc.admin.region.regency.get.queryOptions({ input: {} })
  );
  const productBrandsQuery = useQuery(
    orpc.admin.product.product_brand.get.queryOptions({ input: {} })
  );
  const filteredRegencies = useMemo(
    () =>
      (regenciesQuery.data?.data ?? []).filter(
        (regency) => regency.provinceId === provinceId
      ),
    [provinceId, regenciesQuery.data]
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    setProvinceId(item?.provinceId ?? '');
    setRegencyId(item?.regencyId ?? '');
    setProductBrandId(item?.productBrandId ?? '');
    setPotential(item?.potential?.toString() ?? '');
    setDescription(item?.description ?? '');
    setYear(item?.year ?? String(new Date().getFullYear()));
  }, [item, open]);

  const createMutation = useMutation({
    mutationFn: orpc.admin.potential.regency_potential.create.call,
  });
  const updateMutation = useMutation({
    mutationFn: orpc.admin.potential.regency_potential.update.call,
  });
  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const potentialValue = potential === '' ? undefined : Number(potential);
    const validationError = getValidationError({
      potential: potentialValue,
      productBrandId,
      provinceId,
      regencyId,
    });
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      const values = {
        regencyId,
        productBrandId,
        potential: potentialValue,
        description: description || undefined,
        year: year || undefined,
      };
      if (item) {
        await updateMutation.mutateAsync({ id: item.id, ...values });
      } else {
        await createMutation.mutateAsync(values);
      }
      await queryClient.invalidateQueries({
        queryKey: orpc.admin.potential.regency_potential.get.queryKey({
          input: {},
        }),
      });
      toast.success(
        isEditing
          ? 'Regency potential updated successfully.'
          : 'Regency potential created successfully.'
      );
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to save regency potential.'
      );
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogTitle>
          {isEditing ? 'Update Regency Potential' : 'Create Regency Potential'}
        </DialogTitle>
        <DialogDescription>
          {isEditing
            ? 'Update the regency-level product potential.'
            : 'Add product potential data for a regency.'}
        </DialogDescription>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="regency-potential-province">Province</Label>
            <Select
              onValueChange={(value) => {
                setProvinceId(value);
                if (value !== item?.provinceId) {
                  setRegencyId('');
                }
              }}
              value={provinceId}
            >
              <SelectTrigger id="regency-potential-province">
                <SelectValue placeholder="Select a province" />
              </SelectTrigger>
              <SelectContent>
                {provincesQuery.data?.data.map((province) => (
                  <SelectItem key={province.id} value={province.id}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="regency-potential-regency">Regency</Label>
            <Select
              disabled={!provinceId}
              onValueChange={setRegencyId}
              value={regencyId}
            >
              <SelectTrigger id="regency-potential-regency">
                <SelectValue placeholder="Select a regency" />
              </SelectTrigger>
              <SelectContent>
                {filteredRegencies.map((regency) => (
                  <SelectItem key={regency.id} value={regency.id}>
                    {regency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="regency-potential-brand">Product Brand</Label>
            <Select onValueChange={setProductBrandId} value={productBrandId}>
              <SelectTrigger id="regency-potential-brand">
                <SelectValue placeholder="Select a product brand" />
              </SelectTrigger>
              <SelectContent>
                {productBrandsQuery.data?.data.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="regency-potential-value">Potential (ton)</Label>
            <Input
              id="regency-potential-value"
              min="0"
              onChange={(event) => setPotential(event.target.value)}
              placeholder="Enter potential in tons"
              step="any"
              type="number"
              value={potential}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="regency-potential-year">Year</Label>
            <Input
              id="regency-potential-year"
              inputMode="numeric"
              onChange={(event) => setYear(event.target.value)}
              placeholder="ex. 2026"
              value={year}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="regency-potential-description">Description</Label>
            <Input
              id="regency-potential-description"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional description"
              value={description}
            />
          </div>

          <div className="flex justify-end gap-2 md:col-span-2">
            <Button
              onClick={() => onOpenChange(false)}
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button disabled={isPending} type="submit">
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
