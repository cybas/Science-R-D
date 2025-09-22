
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ScheduleModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
};

export function ScheduleModal({ isOpen, onOpenChange, onSave }: ScheduleModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Digest</DialogTitle>
          <DialogDescription>
            Set up a recurring delivery for this digest.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select defaultValue="weekly">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>Day</Label>
                <Select defaultValue="monday">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label>Time</Label>
                <Select defaultValue="09:00">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="09:00">09:00 AM</SelectItem>
                        <SelectItem value="16:00">04:00 PM</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
           <div className="space-y-2">
            <Label>Recipients</Label>
            <Input placeholder="Add emails..." defaultValue="rd@ester.co" />
            <p className="text-xs text-muted-foreground">Separate multiple emails with a comma.</p>
          </div>
           <div className="space-y-2">
            <Label>Delivery</Label>
             <Select defaultValue="email">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="webhook">Webhook</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
