
// This is a placeholder for the Run Detail Drawer component.
// A full implementation would be similar to other detail drawers,
// using ShadCN Sheet, Tabs, and other components to display
// the detailed information for a single experiment run.
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Experiment } from '@/lib/experiments-data';

type RunDetailDrawerProps = {
  run: Experiment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RunDetailDrawer({ run, open, onOpenChange }: RunDetailDrawerProps) {
    if (!run) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-2xl">
                <SheetHeader>
                    <SheetTitle>{run.runId}: {run.status}</SheetTitle>
                    <SheetDescription>
                        {run.process} run by {run.owner} on {run.date}
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    {/* Tabs for Overview, Procedure, Data, Results, etc. would go here */}
                    <p>Details about the experiment run would be displayed here using a Tab component.</p>
                </div>
                <SheetFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Close</Button>
                    <Button>Ask AI</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
