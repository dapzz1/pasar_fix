import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { orpc } from '@/lib/orpc/client';
import { StallSchema } from '../-domain/schema';
import type { StallItem } from '../-domain/types';

const formSchema = StallSchema;

type FormValues = z.input<typeof formSchema>;

export function EditStallForm({
  editingItem,
  onSuccess,
}: {
  editingItem: StallItem;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      id: '',
      name: '',
      address: '',
      provinceId: '',
      regencyId: '',
      latitude: 0,
      longitude: 0,
      owner: '',
      noTelp: '',
      criteria: '',
    },
  });

  useEffect(() => {
    if (editingItem) {
      form.reset({
        id: editingItem.id,
        name: editingItem.name ?? '',
        address: editingItem.address ?? '',
        provinceId: editingItem.provinceId ?? '',
        regencyId: editingItem.regencyId ?? '',
        latitude: editingItem.latitude ?? 0,
        longitude: editingItem.longitude ?? 0,
        owner: editingItem.owner ?? '',
        noTelp: editingItem.notelp ?? '',
        criteria: editingItem.criteria ?? '',
      });
    }
  }, [editingItem, form.reset]);

  const provinceId = form.watch('provinceId');

  const { data: provinces } = useQuery(
    orpc.admin.region.province.get.queryOptions({
      input: {},
    })
  );

  const { data: regencies } = useQuery(
    orpc.admin.region.regency.get.queryOptions({
      input: {
        provinceId: provinceId || undefined,
      },
    })
  );

  const updateMutation = useMutation(
    orpc.admin.stall.update.mutationOptions({
      onSuccess: async () => {
        toast.success('Stall updated successfully');

        await queryClient.invalidateQueries(
          orpc.admin.stall.get.queryOptions({
            input: {},
          })
        );

        onSuccess?.();
      },

      onError: () => {
        toast.error('Failed to update stall');
      },
    })
  );
  const onSubmit = (values: FormValues) => {
    if (!values.id) {
      toast.error('Stall could not be identified');
      return;
    }
    updateMutation.mutate({ ...values, id: values.id });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stall Name</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="provinceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>

              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent
                  avoidCollisions={false}
                  className="max-h-60"
                  position="popper"
                  sideOffset={4}
                >
                  {provinces?.data?.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="regencyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regency</FormLabel>

              <Select
                disabled={!provinceId}
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        provinceId ? 'Select regency' : 'Select province first'
                      }
                    />
                  </SelectTrigger>
                </FormControl>

                <SelectContent
                  avoidCollisions={false}
                  className="max-h-60"
                  position="popper"
                  sideOffset={4}
                >
                  {regencies?.data?.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>

              <FormControl>
                <Input
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  type="number"
                  value={typeof field.value === 'number' ? field.value : ''}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>

              <FormControl>
                <Input
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  type="number"
                  value={typeof field.value === 'number' ? field.value : ''}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="noTelp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="criteria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Criteria</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          disabled={updateMutation.isPending}
          type="submit"
        >
          {updateMutation.isPending ? 'Updating...' : 'Update Stall'}
        </Button>
      </form>
    </Form>
  );
}
