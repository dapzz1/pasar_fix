import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { CreateSalesRealizationForm } from './create-sales-realization-form';

export function CreateSalesRealizationModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>+ Add Sales Realization</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Sales Realization</DialogTitle>
        </DialogHeader>

        <CreateSalesRealizationForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
