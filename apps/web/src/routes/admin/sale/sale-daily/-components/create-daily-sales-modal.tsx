import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { CreateDailySalesForm } from './create-daily-sales-form';

export function CreateDailySalesModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>+ Add Daily Sales</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Daily Sales</DialogTitle>
        </DialogHeader>

        <CreateDailySalesForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
