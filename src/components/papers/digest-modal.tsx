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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type DigestModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  itemCount: number;
};

export function DigestModal({ isOpen, onOpenChange, itemCount }: DigestModalProps) {
  const { toast } = useToast();

  const handleCreate = () => {
    toast({ title: "Digest Created", description: "The digest has been generated and saved." });
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Research Digest</DialogTitle>
          <DialogDescription>
            Summarize the selected {itemCount} papers into a single digest.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="digest-title">Title</Label>
                <Input id="digest-title" defaultValue={`Research Digest - ${new Date().toLocaleDateString()}`} />
            </div>
            <div className="space-y-2">
                <Label>Preview</Label>
                <Textarea readOnly className="h-48 text-xs bg-muted"
                 defaultValue={`**Key Finding 1: Bio-based Diols Boost PET Tg**\n\nA recent paper in 'Polymer' demonstrates that incorporating sorbitol-derived diols can increase the glass transition temperature (Tg) of PET by 12–18 °C without compromising processability. This opens a pathway for higher-performance, partially bio-based polyesters.\n\n**Key Finding 2: Efficient Catalysis for PET Recycling**\n\n'Green Chem' highlights a new Zn/Co catalytic system for the glycolysis of PET. This method shows improved selectivity towards the monomer BHET, promising a more efficient chemical recycling loop for post-consumer PET waste.`}
                />
            </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleCreate}>Create Digest</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
