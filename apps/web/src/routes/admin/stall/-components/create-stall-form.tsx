import { useEffect } from 'react';

import {
  useForm,
} from 'react-hook-form';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import {
  Textarea,
} from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { orpc } from '@/lib/orpc/client';

import {
  StallSchema,
} from '../-domain/schema';

import z from 'zod';

const formSchema =
  StallSchema;

type FormValues =
  z.input<typeof formSchema>;

export function CreateStallForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const queryClient =
    useQueryClient();

  const form =
    useForm<FormValues>({
      resolver:
        zodResolver(
          formSchema
        ),

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
      },
    });

  const provinceId =
    form.watch(
      'provinceId'
    );

  const {
    data: provinces,
  } = useQuery(
    orpc.admin.region.province.get.queryOptions(
      {
        input: {},
      }
    )
  );

  const {
    data: regencies,
  } = useQuery(
    orpc.admin.region.regency.get.queryOptions(
      {
        input: {
        provinceId:
        provinceId || undefined,
        },
      }
    )
  );

const createMutation =
  useMutation(
    orpc.admin.stall.create.mutationOptions(
      {
        onSuccess: async () => {
          toast.success(
            'Stall created successfully'
          );

          await queryClient.invalidateQueries(
            orpc.admin.stall.get.queryOptions(
              {
                input: {},
              }
            )
          );

          form.reset();

          onSuccess?.();
        },

        onError: () => {
          toast.error(
            'Failed to create stall'
          );
        },
      }
    )
  );

  const onSubmit = (
    values: FormValues
  ) => {
    createMutation.mutate(
      values
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          onSubmit
        )}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={
              form.control
            }
            name="name"
            render={({
              field,
            }) => (
              <FormItem>
                <FormLabel>
                  Stall Name
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Input stall name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={
              form.control
            }
            name="owner"
            render={({
              field,
            }) => (
              <FormItem>
                <FormLabel>
                  Owner
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Input owner"
                    value={
                      field.value ??
                      ''
                    }
                    onChange={
                      field.onChange
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={
              form.control
            }
            name="provinceId"
            render={({
              field,
            }) => (
              <FormItem>
                <FormLabel>
                  Province
                </FormLabel>

                <Select
                  value={
                    field.value
                  }
                  onValueChange={
                    field.onChange
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent
                    position="popper"
                    sideOffset={4}
                    avoidCollisions={false}
                    className="max-h-60"
                    >
                    {provinces?.data?.map(
                      (
                        item: any
                      ) => (
                        <SelectItem
                          key={
                            item.id
                          }
                          value={
                            item.id
                          }
                        >
                          {
                            item.name
                          }
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={
              form.control
            }
            name="regencyId"
            render={({
              field,
            }) => (
              <FormItem>
                <FormLabel>
                  Regency
                </FormLabel>

                    <Select
                    disabled={!provinceId}
                    value={
                        field.value
                    }
                    onValueChange={
                        field.onChange
                    }
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
                    position="popper"
                    sideOffset={4}
                    avoidCollisions={false}
                    className="max-h-60"
                    >
                    {regencies?.data?.map(
                      (
                        item: any
                      ) => (
                        <SelectItem
                          key={
                            item.id
                          }
                          value={
                            item.id
                          }
                        >
                          {
                            item.name
                          }
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={
              form.control
            }
            name="latitude"
            render={({
              field,
            }) => (
              <FormItem>
                <FormLabel>
                  Latitude
                </FormLabel>

                <FormControl>
               <Input
                    type="number"
                    value={
                        typeof field.value ===
                        'number'
                        ? field.value
                        : ''
                    }
                    onChange={(e) =>
                        field.onChange(
                        Number(e.target.value)
                        )
                    }
                    />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={
              form.control
            }
            name="longitude"
            render={({
              field,
            }) => (
              <FormItem>
                <FormLabel>
                  Longitude
                </FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    value={
                    typeof field.value ===
                    'number'
                        ? field.value
                        : ''
                    }
                    onChange={(
                      e
                    ) =>
                      field.onChange(
                        Number(
                          e.target
                            .value
                        )
                      )
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={
              form.control
            }
            name="noTelp"
            render={({
              field,
            }) => (
              <FormItem>
                <FormLabel>
                  Phone
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Input phone number"
                    value={
                      field.value ??
                      ''
                    }
                    onChange={
                      field.onChange
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={
              form.control
            }
            name="criteria"
            render={({
              field,
            }) => (
              <FormItem>
                <FormLabel>
                  Criteria
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Input criteria"
                    value={
                      field.value ??
                      ''
                    }
                    onChange={
                      field.onChange
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={
            form.control
          }
          name="address"
          render={({
            field,
          }) => (
            <FormItem>
              <FormLabel>
                Address
              </FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Input address"
                  value={
                    field.value ??
                    ''
                  }
                  onChange={
                    field.onChange
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={
            createMutation.isPending
          }
          className="w-full"
        >
          {createMutation.isPending
            ? 'Creating...'
            : 'Create Stall'}
        </Button>
      </form>
    </Form>
  );
}