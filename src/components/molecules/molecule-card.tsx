'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChemicalStructureIcon } from '@/components/icons/chemical-structure-icon';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, MessageSquare, Bookmark, PlusSquare } from 'lucide-react';
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
  isSaved: boolean;
  isInBasket: boolean;
};

export function MoleculeCard({
  molecule,
  onDetails,
  onSaveToMemory,
  onAskAi,
  onAddToBasket,
  isSaved,
  isInBasket,
}: MoleculeCardProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied to clipboard` });
  };

  return (
    <Card className="flex flex-col" data-item-id={molecule.id} data-item-type="chemical">
      <CardContent className="p-4 flex-1">
        <div className="grid grid-cols-12 gap-4 items-start">
           <div className="col-span-4 flex items-center justify-center bg-muted rounded-md aspect-square p-2">
            <ChemicalStructureIcon smiles={molecule.smiles} className="w-full h-auto" />
          </div>
          <div className="col-span-8 space-y-2">
             <div>
                <h3 className="font-semibold cursor-pointer hover:underline" onClick={onDetails}>{molecule.title}</h3>
                <p className="text-xs text-muted-foreground">{molecule.source} · {molecule.date}</p>
            </div>
            <div className="text-xs space-y-1">
                <div><strong className="font-medium text-muted-foreground w-16 inline-block">Formula</strong>{molecule.formula}</div>
                <div><strong className="font-medium text-muted-foreground w-16 inline-block">MW</strong>{molecule.mw}</div>
                <div><strong className="font-medium text-muted-foreground w-16 inline-block">Hazard</strong>{molecule.hazard || 'N/A'}</div>
                <div><strong className="font-medium text-muted-foreground w-16 inline-block">Role</strong>{molecule.role || 'N/A'}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs space-y-1">
            <div className="flex items-center">
                <strong className="font-medium text-muted-foreground w-16 inline-block shrink-0">SMILES</strong>
                <code className="truncate flex-1">{molecule.smiles}</code>
                <Button variant="ghost" size="icon-sm" className="h-6 w-6" onClick={() => copyToClipboard(molecule.smiles, 'SMILES')}>
                    <Copy className="h-3 w-3" />
                </Button>
            </div>
            {molecule.inchiKey && <div className="flex items-center">
                <strong className="font-medium text-muted-foreground w-16 inline-block shrink-0">InChIKey</strong>
                <code className="truncate flex-1">{molecule.inchiKey}</code>
                 <Button variant="ghost" size="icon-sm" className="h-6 w-6" onClick={() => copyToClipboard(molecule.inchiKey!, 'InChIKey')}>
                    <Copy className="h-3 w-3" />
                </Button>
            </div>}
        </div>
      </CardContent>
       <div className="border-t p-2 flex flex-wrap gap-2 justify-start">
            <Button
              variant="primary"
              size="sm"
              onClick={onAskAi}
              aria-label={`Ask R&A Ai about ${molecule.title}`}
            >
              <MessageSquare />
              <span>Ask R&A Ai</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={onSaveToMemory}>
              <Bookmark className={cn(isSaved && "fill-primary")} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
            <Button asChild variant="secondary" size="sm">
                <Link href={molecule.href} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    <span>Open Source</span>
                </Link>
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                   <Button variant="secondary" size="sm" onClick={onAddToBasket}>
                    <PlusSquare className={cn(isInBasket && "fill-primary")} />
                    <span>{isInBasket ? 'In Basket' : 'Add to Basket'}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Collect monomers/catalysts to design a polymer</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </div>
    </Card>
  );
}
