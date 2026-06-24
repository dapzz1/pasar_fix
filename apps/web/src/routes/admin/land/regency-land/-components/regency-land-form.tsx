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

export type RegencyLandItem = {
  id: string;
  regencyId: string;
  regencyName: string;
  landTypeId: string;
  landTypeName: string;
  area: number | null;
  year: string | null;
};

export function RegencyLandForm({
  item,
  open,
  onOpenChange,
}: {
  item: RegencyLandItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const [regencyId, setRegencyId] = useState('');
  const [landTypeId, setLandTypeId] = useState('');
  const [area, setArea] = useState('');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const regencies = useQuery(
    orpc.admin.region.regency.get.queryOptions({ input: {} })
  );
  const landTypes = useQuery(
    orpc.admin.land.land_type.get.queryOptions({ input: {} })
  );
  const mutation = useMutation({
    mutationFn: async () => {
      const values = {
        regencyId,
        landTypeId,
        area: Number(area),
        year,
      };
      if (item) {
        return await orpc.admin.land.regency_land.update.call({
          id: item.id,
          ...values,
        });
      }
      return await orpc.admin.land.regency_land.create.call(values);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: orpc.admin.land.regency_land.get.queryKey({ input: {} }),
      });
      toast.success(item ? 'Regency land updated' : 'Regency land created');
      onOpenChange(false);
    },
    onError: (error) => toast.error(error.message),
  });

  useEffect(() => {
    setRegencyId(item?.regencyId ?? '');
    setLandTypeId(item?.landTypeId ?? '');
    setArea(item?.area?.toString() ?? '');
    setYear(item?.year ?? String(new Date().getFullYear()));
  }, [item]);

  const isInvalid =
    !(regencyId && landTypeId && year) ||
    area === '' ||
    !Number.isFinite(Number(area)) ||
    Number(area) < 0;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? 'Edit' : 'Add'} Regency Land</DialogTitle>
          <DialogDescription>
            Maintain area data by regency and land type.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Select onValueChange={setRegencyId} value={regencyId}>
            <SelectTrigger>
              <SelectValue placeholder="Select regency" />
            </SelectTrigger>
            <SelectContent>
              {regencies.data?.data.map((regency) => (
                <SelectItem key={regency.id} value={regency.id}>
                  {regency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setLandTypeId} value={landTypeId}>
            <SelectTrigger>
              <SelectValue placeholder="Select land type" />
            </SelectTrigger>
            <SelectContent>
              {landTypes.data?.data.map((landType) => (
                <SelectItem key={landType.id} value={landType.id}>
                  {landType.name}
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
