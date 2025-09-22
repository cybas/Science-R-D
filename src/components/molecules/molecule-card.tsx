'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChemicalStructureIcon } from '@/components/icons/chemical-structure-icon';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, BrainCircuit, Star, Plus, GitCompare } from 'lucide-react';
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
}: MoleculeCardProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied to clipboard` });
  };

  return (
    <Card className={cn(isComparing && 'cursor-pointer hover:border-primary', isSelectedForCompare && 'border-primary')}>
      <CardContent className="p-4 grid grid-cols-12 gap-4 items-start">
        {/* Header on mobile */}
        <div className="col-span-12 md:hidden">
            <h3 className="font-semibold cursor-pointer hover:underline" onClick={onDetails}>{molecule.title}</h3>
            <p className="text-xs text-muted-foreground">{molecule.source} · {molecule.date}</p>
        </div>

        {/* Structure */}
        <div className="col-span-3 md:col-span-2 flex items-center justify-center bg-muted rounded-md aspect-square p-2">
          <ChemicalStructureIcon smiles={molecule.smiles} className="w-full h-auto" />
        </div>

        {/* Details */}
        <div className="col-span-9 md:col-span-7 space-y-3">
          <div className="hidden md:block">
            <h3 className="font-semibold cursor-pointer hover:underline" onClick={onDetails}>{molecule.title}</h3>
            <p className="text-xs text-muted-foreground">{molecule.source} · {molecule.date}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <div className="font-medium text-muted-foreground">Formula</div>
            <div>{molecule.formula}</div>
            <div className="font-medium text-muted-foreground">MW</div>
            <div>{molecule.mw}</div>
            <div className="font-medium text-muted-foreground">SMILES</div>
            <div
              className="font-mono truncate cursor-pointer flex items-center gap-1"
              onClick={() => copyToClipboard(molecule.smiles, 'SMILES')}
            >
              <span className="truncate">{molecule.smiles}</span>
              <Copy className="h-3 w-3 flex-shrink-0" />
            </div>
            <div className="font-medium text-muted-foreground">InChIKey</div>
            <div
              className="font-mono truncate cursor-pointer flex items-center gap-1"
              onClick={() => copyToClipboard(molecule.inchiKey || 'N/A', 'InChIKey')}
            >
               <span className="truncate">{molecule.inchiKey || 'N/A'}</span>
               {molecule.inchiKey && <Copy className="h-3 w-3 flex-shrink-0" />}
            </div>
            <div className="font-medium text-muted-foreground">Hazard</div>
            <div>{molecule.hazard || 'N/A'}</div>
            <div className="font-medium text-muted-foreground">Role</div>
            <div>{molecule.role || 'N/A'}</div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {molecule.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="col-span-12 md:col-span-3 flex md:flex-col justify-end items-center md:items-end gap-1">
          <div className="flex flex-wrap justify-end gap-1">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8" aria-label="Open Source">
                <Link href={molecule.href} target="_blank">
                    <ExternalLink className="h-4 w-4" />
                </Link>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Save to Memory" onClick={onSaveToMemory}>
                <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Ask AI" onClick={onAskAi}>
                <BrainCircuit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Add to Basket" onClick={onAddToBasket}>
                <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Compare" onClick={onCompare}>
                <GitCompare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
