import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { CreateStallForm } from './create-stall-form';

export function CreateStallModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>+ Add Stall</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Stall</DialogTitle>
        </DialogHeader>

        <CreateStallForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
