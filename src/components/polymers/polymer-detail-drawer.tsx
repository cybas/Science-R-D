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
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ExternalLink, Bookmark, MessageSquare, GitCompare } from 'lucide-react';
import type { Polymer } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type PolymerDetailDrawerProps = {
  polymer: Polymer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveToMemory: () => void;
  onAskAi: () => void;
  onCompare: () => void;
  isSaved: boolean;
};

export function PolymerDetailDrawer({ 
    polymer, 
    open, 
    onOpenChange,
    onSaveToMemory,
    onAskAi,
    onCompare,
    isSaved,
}: PolymerDetailDrawerProps) {
  if (!polymer) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl p-0 flex flex-col">
        <SheetHeader className="p-6">
          <SheetTitle>{polymer.name}</SheetTitle>
          <SheetDescription>{polymer.source} · {polymer.date}</SheetDescription>
          <Button asChild variant="link" className="p-0 h-auto text-xs justify-start">
            <Link href={polymer.href} target="_blank" rel="noopener noreferrer">
              Open Source <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </SheetHeader>

        <Tabs defaultValue="overview" className="w-full flex-1 flex flex-col min-h-0">
          <div className="px-6">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <div className="p-6">
              <TabsContent value="overview">
                 <div className="space-y-4 text-sm">
                    <p><strong className="font-semibold w-24 inline-block">Class:</strong> <Badge variant="outline">{polymer.tags[0]}</Badge></p>
                    <p><strong className="font-semibold w-24 inline-block">Forms:</strong> {polymer.forms.join(', ')}</p>
                    {polymer.notes && <p><strong className="font-semibold w-24 inline-block">Notes:</strong> {polymer.notes}</p>}
                 </div>
              </TabsContent>
              <TabsContent value="properties">
                 <Table>
                    <TableBody>
                        <TableRow><TableCell className="font-medium">Glass Transition (Tg)</TableCell><TableCell>{polymer.props.tg}</TableCell></TableRow>
                        <TableRow><TableCell className="font-medium">Melt Temperature (Tm)</TableCell><TableCell>{polymer.props.tm}</TableCell></TableRow>
                        <TableRow><TableCell className="font-medium">Tensile Modulus</TableCell><TableCell>{polymer.props.modulus}</TableCell></TableRow>
                        <TableRow><TableCell className="font-medium">Tensile Strength</TableCell><TableCell>{polymer.props.tensile || 'N/A'}</TableCell></TableRow>
                    </TableBody>
                 </Table>
              </TabsContent>
              <TabsContent value="process">
                 <div className="space-y-4 text-sm">
                    <p><strong className="font-semibold">Monomers:</strong> {polymer.monomers.join(', ')}</p>
                    <p><strong className="font-semibold">Polymerization:</strong> {polymer.process}</p>
                    <p><strong className="font-semibold">Common Catalysts:</strong> Antimony Trioxide, Titanium Butoxide (examples)</p>
                 </div>
              </TabsContent>
              <TabsContent value="applications">
                 <div className="space-y-2 text-sm">
                     <p>Common applications for this polymer class include:</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Packaging films</li>
                        <li>Fibers for textiles</li>
                        <li>Bottles and containers</li>
                        <li>Automotive parts</li>
                     </ul>
                 </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
        
        <SheetFooter className="p-4 bg-background border-t space-y-2">
            <div className="flex gap-2 w-full pt-2">
                <Button variant="secondary" onClick={onSaveToMemory}>
                    <Bookmark className={cn(isSaved && "fill-primary")} />
                    {isSaved ? 'Saved' : 'Save to Memory'}
                </Button>
                <Button variant="secondary" onClick={onCompare}>
                    <GitCompare />
                    Compare
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
