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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChemicalStructureIcon } from '../icons/chemical-structure-icon';
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from '@/components/ui/table';
import { ExternalLink, Bookmark, PlusSquare, MessageSquare } from 'lucide-react';
import type { Chemical } from '@/lib/data';
import Link from 'next/link';

type MoleculeDetailDrawerProps = {
  molecule: Chemical | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveToMemory: () => void;
  onAddToBasket: () => void;
  onAskAi: () => void;
  isSaved: boolean;
  isInBasket: boolean;
};

const quickPrompts = [
    'Suggest comonomers/crosslinkers',
    'Is this compatible with PET polycondensation?',
    'List safety & handling',
];

export function MoleculeDetailDrawer({ 
    molecule, 
    open, 
    onOpenChange,
    onSaveToMemory,
    onAddToBasket,
    onAskAi,
    isSaved,
    isInBasket
}: MoleculeDetailDrawerProps) {
  if (!molecule) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl p-0 flex flex-col">
        <SheetHeader className="p-6">
          <div className="flex gap-4 items-start">
            <div className="w-16 h-16 flex-shrink-0 rounded-md bg-muted flex items-center justify-center p-1">
              <ChemicalStructureIcon smiles={molecule.smiles} className="h-full w-full" />
            </div>
            <div className="flex-1">
              <SheetTitle>{molecule.title.split('—')[0].trim()}</SheetTitle>
              <SheetDescription>CAS: {molecule.title.split('—')[1].trim()}</SheetDescription>
              <Button asChild variant="link" className="p-0 h-auto text-xs">
                <Link href={molecule.href} target="_blank">
                  Open Source <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="overview" className="w-full flex-1 flex flex-col min-h-0">
          <div className="px-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <div className="p-6">
              <TabsContent value="overview">
                 <div className="space-y-4 text-sm">
                    <p><strong className="font-semibold">Role:</strong> <Badge variant="outline">{molecule.role}</Badge></p>
                    <p><strong className="font-semibold">Formula:</strong> {molecule.formula}</p>
                    <p><strong className="font-semibold">Molecular Weight:</strong> {molecule.mw}</p>
                    <p><strong className="font-semibold">SMILES:</strong> <span className="font-mono break-all">{molecule.smiles}</span></p>
                    <p><strong className="font-semibold">InChIKey:</strong> <span className="font-mono break-all">{molecule.inchiKey || 'N/A'}</span></p>
                 </div>
              </TabsContent>
              <TabsContent value="properties">
                 <Table>
                    <TableBody>
                        <TableRow><TableCell className="font-medium">Melting Point</TableCell><TableCell>N/A</TableCell></TableRow>
                        <TableRow><TableCell className="font-medium">Boiling Point</TableCell><TableCell>N/A</TableRow></TableRow>
                        <TableRow><TableCell className="font-medium">Density</TableCell><TableCell>N/A</TableCell></TableRow>
                        <TableRow><TableCell className="font-medium">logP</TableCell><TableCell>N/A</TableCell></TableRow>
                        <TableRow><TableCell className="font-medium">Solubility</TableCell><TableCell>N/A</TableCell></TableRow>
                    </TableBody>
                 </Table>
              </TabsContent>
              <TabsContent value="safety">
                 <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Hazard Statement(s)</h4>
                        <p className="text-sm">{molecule.hazard || 'Not classified as hazardous'}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Handling</h4>
                        <p className="text-sm">Standard laboratory safety precautions should be observed.</p>
                    </div>
                 </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
        
        <SheetFooter className="p-4 bg-background border-t space-y-2">
            <div className="flex gap-2 w-full pt-2">
                <Button variant="outline" onClick={onSaveToMemory}>
                    <Bookmark className={isSaved ? "fill-primary" : ""} />
                    {isSaved ? 'Saved' : 'Save to Memory'}
                </Button>
                <Button variant="outline" onClick={onAddToBasket}>
                    <PlusSquare className={isInBasket ? "fill-primary" : ""} />
                    {isInBasket ? 'In Basket' : 'Add to Basket'}
                </Button>
                <Button className="flex-1" onClick={onAskAi}>
                    <MessageSquare />Ask AI
                </Button>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
