import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'sonner';
import type z from 'zod';
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
import { Textarea } from '@/components/ui/textarea';
import { orpc } from '@/lib/orpc/client';
import { StallSchema } from '../-domain/schema';

const formSchema = StallSchema;

type FormValues = z.input<typeof formSchema>;

export function CreateStallForm({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: '',
      address: '',
      provinceId: '',
      regencyId: '',
      latitude: 0,
      longitude: 0,
      owner: '',
      noTelp: '',
      criteria: '',

      productBrandIds: [],
    },
  });

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
  const { data: productBrands } = useQuery(
    orpc.admin.product.product_brand.get.queryOptions({
      input: {},
    })
  );
  const createMutation = useMutation(
    orpc.admin.stall.create.mutationOptions({
      onSuccess: async () => {
        toast.success('Stall created successfully');

        await queryClient.invalidateQueries(
          orpc.admin.stall.get.queryOptions({
            input: {},
          })
        );

        form.reset();

        onSuccess?.();
      },

      onError: () => {
        toast.error('Failed to create stall');
      },
    })
  );

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stall Name</FormLabel>

                <FormControl>
                  <Input placeholder="Input stall name" {...field} />
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
                  <Input
                    onChange={field.onChange}
                    placeholder="Input owner"
                    value={field.value ?? ''}
                  />
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
                    {provinces?.data?.map((item: any) => (
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
                          provinceId
                            ? 'Select regency'
                            : 'Select province first'
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
                    {regencies?.data?.map((item: any) => (
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
            name="noTelp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>

                <FormControl>
                  <Input
                    onChange={field.onChange}
                    placeholder="Input phone number"
                    value={field.value ?? ''}
                  />
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
                  <Input
                    onChange={field.onChange}
                    placeholder="Input criteria"
                    value={field.value ?? ''}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>

              <FormControl>
                <Textarea
                  onChange={field.onChange}
                  placeholder="Input address"
                  value={field.value ?? ''}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productBrandIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Brands</FormLabel>

              <div className="max-h-48 space-y-2 overflow-y-auto rounded-md border p-3">
                {productBrands?.data?.map((brand: any) => (
                  <label className="flex items-center gap-2" key={brand.id}>
                    <input
                      checked={(field.value || []).includes(brand.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.onChange([...(field.value || []), brand.id]);
                        } else {
                          field.onChange(
                            (field.value || []).filter((id) => id !== brand.id)
                          );
                        }
                      }}
                      type="checkbox"
                    />

                    <span>{brand.name}</span>
                  </label>
                ))}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          disabled={createMutation.isPending}
          type="submit"
        >
          {createMutation.isPending ? 'Creating...' : 'Create Stall'}
        </Button>
      </form>
    </Form>
  );
}
