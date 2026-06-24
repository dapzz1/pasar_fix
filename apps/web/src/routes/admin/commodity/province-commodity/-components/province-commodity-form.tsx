import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { orpc } from '@/lib/orpc/client';

export type ProvinceCommodityItem = {
  id: string;
  provinceId: string;
  provinceName: string;
  commodityTypeId: string;
  commodityTypeName: string;
  area: number | null;
  year: string | null;
};

export function ProvinceCommodityForm({
  item,
  open,
  onOpenChange,
}: {
  item: ProvinceCommodityItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const [provinceId, setProvinceId] = useState('');
  const [commodityTypeId, setCommodityTypeId] = useState('');
  const [area, setArea] = useState('');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const provinces = useQuery(
    orpc.admin.region.province.get.queryOptions({ input: {} })
  );
  const commodityTypes = useQuery(
    orpc.admin.commodity.commodity_type.get.queryOptions({ input: {} })
  );
  const mutation = useMutation({
    mutationFn: async () => {
      const values = {
        provinceId,
        commodityTypeId,
        area: Number(area),
        year,
      };
      if (item) {
        return await orpc.admin.commodity.province_commodity.update.call({
          id: item.id,
          ...values,
        });
      }
      return await orpc.admin.commodity.province_commodity.create.call(values);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: orpc.admin.commodity.province_commodity.get.queryKey({
          input: {},
        }),
      });
      toast.success(
        item ? 'Province commodity updated' : 'Province commodity created'
      );
      onOpenChange(false);
    },
    onError: (error) => toast.error(error.message),
  });

  useEffect(() => {
    setProvinceId(item?.provinceId ?? '');
    setCommodityTypeId(item?.commodityTypeId ?? '');
    setArea(item?.area?.toString() ?? '');
    setYear(item?.year ?? String(new Date().getFullYear()));
  }, [item]);

  const isInvalid =
    !(provinceId && commodityTypeId && year) ||
    area === '' ||
    !Number.isFinite(Number(area)) ||
    Number(area) < 0;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? 'Edit' : 'Add'} Province Commodity</DialogTitle>
          <DialogDescription>
            Maintain commodity area data at province level.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Select onValueChange={setProvinceId} value={provinceId}>
            <SelectTrigger>
              <SelectValue placeholder="Select province" />
            </SelectTrigger>
            <SelectContent>
              {provinces.data?.data.map((province) => (
                <SelectItem key={province.id} value={province.id}>
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setCommodityTypeId} value={commodityTypeId}>
            <SelectTrigger>
              <SelectValue placeholder="Select commodity" />
            </SelectTrigger>
            <SelectContent>
              {commodityTypes.data?.data.map((commodityType) => (
                <SelectItem key={commodityType.id} value={commodityType.id}>
                  {commodityType.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            min="0"
            onChange={(event) => setArea(event.target.value)}
            placeholder="Area"
            type="number"
            value={area}
          />
          <Input
            maxLength={4}
            onChange={(event) => setYear(event.target.value)}
            placeholder="Year"
            value={year}
          />
          <Button
            className="w-full"
            disabled={isInvalid || mutation.isPending}
            onClick={() => mutation.mutate()}
            type="button"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
