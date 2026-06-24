import { useMutation, useQuery } from '@tanstack/react-query';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

import { orpc } from '@/lib/orpc/client';

export function ManageStallProducts({ stall }: { stall: any }) {
  const { data: productBrands, isLoading: isLoadingBrands } = useQuery(
    orpc.admin.stall.stall_product_brand.get_product_brands.queryOptions({
      input: {},
    })
  );

  const { data: assignedProducts, isLoading: isLoadingAssigned } = useQuery(
    orpc.admin.stall.stall_product_brand.get.queryOptions({
      input: {
        stallId: stall?.id,
      },
    })
  );

  const isLoading = isLoadingBrands || isLoadingAssigned;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (assignedProducts?.data) {
      setSelectedIds(
        assignedProducts.data.map((item: any) => item.productBrandId)
      );
    }
  }, [assignedProducts]);

  const assignMutation = useMutation(
    orpc.admin.stall.stall_product_brand.assign.mutationOptions({
      onSuccess: () => {
        toast.success('Products updated');
      },

      onError: () => {
        toast.error('Failed to update products');
      },
    })
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-semibold text-lg">Manage Product Brands</h2>

        <p className="text-muted-foreground text-sm">Stall: {stall?.name}</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="size-5 animate-spin" />
        </div>
      ) : (
        <div className="h-[400px] overflow-y-auto pr-4">
          <div className="space-y-3">
            {productBrands?.data?.map((item: any) => {
              return (
                <Card key={item.id}>
                  <CardContent className="flex items-start gap-3 p-4">
                    <Checkbox
                      checked={selectedIds.includes(item.id)}
                      onCheckedChange={(value) => {
                        if (value) {
                          setSelectedIds((prev) => [...prev, item.id]);
                        } else {
                          setSelectedIds((prev) =>
                            prev.filter((id) => id !== item.id)
                          );
                        }
                      }}
                    />

                    <div className="space-y-1">
                      <p className="font-medium">{item.name}</p>

                      <p className="text-muted-foreground text-sm">
                        {item.productTypeName}
                      </p>

                      <p className="text-muted-foreground text-xs">
                        {item.industry}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
      <Button
        className="w-full"
        disabled={assignMutation.isPending}
        onClick={() =>
          assignMutation.mutate({
            stallId: stall.id,

            productBrandIds: selectedIds,
          })
        }
      >
        Save Products
      </Button>
    </div>
  );
}
