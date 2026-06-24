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

interface DeleteRegencyPotentialFormProps {
  item: {
    id: string;
    productBrandName: string;
    regencyName: string;
  } | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function DeleteRegencyPotentialForm({
  item,
  onOpenChange,
  open,
}: DeleteRegencyPotentialFormProps) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: orpc.admin.potential.regency_potential.delete.call,
  });

  const handleDelete = async () => {
    if (!item) {
      return;
    }
    try {
      await mutation.mutateAsync({ id: item.id });
      await queryClient.invalidateQueries({
        queryKey: orpc.admin.potential.regency_potential.get.queryKey({
          input: {},
        }),
      });
      toast.success('Regency potential deleted successfully.');
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to delete regency potential.'
      );
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogTitle>Delete Regency Potential</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
        {item && (
          <div className="rounded-md bg-muted p-3 text-sm">
            <p>
              <strong>Regency:</strong> {item.regencyName}
            </p>
            <p>
              <strong>Product Brand:</strong> {item.productBrandName}
            </p>
          </div>
        )}
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => onOpenChange(false)}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            disabled={mutation.isPending}
            onClick={handleDelete}
            type="button"
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
