'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChemicalStructureIcon } from '@/components/icons/chemical-structure-icon';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, MessageSquare, Bookmark, PlusSquare, GitCompare } from 'lucide-react';
import type { Chemical } from '@/lib/data';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type MoleculeCardProps = {
  molecule: Chemical;
  onDetails: () => void;
  onSaveToMemory: () => void;
  onAskAi: () => void;
  onAddToBasket: () => void;
  onCompare: () => void;
  isComparing: boolean;
  isSelectedForCompare: boolean;
  isSaved: boolean;
  isInBasket: boolean;
};

export function MoleculeCard({
  molecule,
  onDetails,
  onSaveToMemory,
  onAskAi,
  onAddToBasket,
  onCompare,
  isComparing,
  isSelectedForCompare,
  isSaved,
  isInBasket,
}: MoleculeCardProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied to clipboard` });
  };

  return (
    <Card className={cn('relative', isComparing && 'cursor-pointer hover:border-primary', isSelectedForCompare && 'border-primary')} data-item-id={molecule.id} data-item-type="chemical">
      <CardContent className="p-4 grid grid-cols-12 gap-4 items-start">
        <div className="col-span-12 md:col-span-3 lg:col-span-2 flex items-center justify-center bg-muted rounded-md aspect-square p-2">
          <ChemicalStructureIcon smiles={molecule.smiles} className="w-full h-auto" />
        </div>
        
        <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-4">
          <div>
            <h3 className="font-semibold cursor-pointer hover:underline" onClick={onDetails}>{molecule.title}</h3>
            <p className="text-xs text-muted-foreground">{molecule.source} · {molecule.date}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-1 text-sm">
            <div><strong className="font-medium text-muted-foreground block">Formula</strong>{molecule.formula}</div>
            <div><strong className="font-medium text-muted-foreground block">MW</strong>{molecule.mw}</div>
            <div><strong className="font-medium text-muted-foreground block">Hazard</strong>{molecule.hazard || 'N/A'}</div>
            <div><strong className="font-medium text-muted-foreground block">Role</strong>{molecule.role || 'N/A'}</div>
          </div>
          
           <div className="flex flex-wrap gap-2">
            {molecule.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

        </div>
      </CardContent>
       <div className="border-t p-2 flex flex-wrap gap-2 justify-start">
            <Button
              variant="outline"
              size="sm"
              onClick={onAskAi}
              aria-label={`Ask R&A Ai about ${molecule.title}`}
            >
              <MessageSquare />
              <span>Ask R&A Ai</span>
            </Button>
            <Button variant="outline" size="sm" onClick={onSaveToMemory}>
              <Bookmark className={cn(isSaved && "fill-primary")} />
              <span>{isSaved ? 'Saved' : 'Save to Memory'}</span>
            </Button>
            <Button asChild variant="outline" size="sm">
                <Link href={molecule.href} target="_blank">
                    <ExternalLink />
                    <span>Open Source</span>
                </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={onAddToBasket}>
              <PlusSquare className={cn(isInBasket && "fill-primary")} />
              <span>{isInBasket ? 'In Basket' : 'Add to Basket'}</span>
            </Button>
            <Button variant="outline" size="sm" onClick={onCompare}>
                <GitCompare />
                <span>Compare</span>
            </Button>
        </div>
    </Card>
  );
}
