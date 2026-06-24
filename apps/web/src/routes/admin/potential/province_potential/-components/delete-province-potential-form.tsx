import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { orpc } from '@/lib/orpc/client';

export function DeleteProvincePotentialForm({
  open,
  onOpenChange,
  provincePotential,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provincePotential: {
    id: string;
    provinceName: string;
    productBrandName: string;
  } | null;
  onDelete: (provincePotentialId: string) => void;
}) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const deleteMutation = useMutation<
    Awaited<
      ReturnType<typeof orpc.admin.potential.province_potential.delete.call>
    >,
    Error,
    Parameters<typeof orpc.admin.potential.province_potential.delete.call>[0]
  >({
    mutationFn: (provincePotentialData) =>
      orpc.admin.potential.province_potential.delete.call(
        provincePotentialData
      ),
    onError: (error) => {
      toast.error(
        `Failed to delete province potential. Please try again. ${error.message}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orpc.admin.potential.province_potential.get.queryKey({
          input: {},
        }),
      });
    },
  });

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogTitle>
          Are you sure you want to delete this province potential?
        </DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
        {provincePotential && (
          <div className="rounded-md bg-gray-50 p-3 text-sm">
            <p>
              <strong>Province:</strong> {provincePotential.provinceName}
            </p>
            <p>
              <strong>Product Brand:</strong>{' '}
              {provincePotential.productBrandName}
            </p>
          </div>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={() => onOpenChange(false)} variant="secondary">
            Cancel
          </Button>

          <Button
            onClick={async () => {
              try {
                if (provincePotential) {
                  await deleteMutation.mutateAsync({
                    id: provincePotential.id,
                  });
                  toast.success('Province potential deleted successfully!');
                  onDelete(provincePotential.id);
                  onOpenChange(false);
                }
              } catch (error) {
                toast.error(
                  `Failed to delete province potential: ${(error as Error).message}`
                );
              }
            }}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
