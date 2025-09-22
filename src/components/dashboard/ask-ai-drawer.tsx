'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChemicalStructureIcon } from '../icons/chemical-structure-icon';
import { Send } from 'lucide-react';
import type { FeedItem, Chemical, Polymer, Paper, Patent } from '@/lib/data';

type AskAiDrawerProps = {
  item: FeedItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const quickPrompts = {
  chemical: [
    'Suggest comonomers to raise Tg',
    'Routes & catalysts from these monomers',
    'Safety / regulatory flags (GHS, REACH)'
  ],
  polymer: [
    'Compare with saved alternatives',
    'Suggest comonomers to raise Tg',
    'What are its degradation products?'
  ],
  paper: [
    'Summarize the key findings',
    'What are the experimental methods?',
    'Find related patents'
  ],
  patent: [
    'What is the core novelty?',
    'Compare claims with prior art',
    'Who are the inventors?'
  ]
};

export function AskAiDrawer({ item, open, onOpenChange }: AskAiDrawerProps) {
  if (!item) return null;

  const getHeader = () => {
    switch (item.type) {
      case 'chemical':
        const chem = item as Chemical;
        return (
          <div className="flex gap-4">
            <div className="w-16 h-16 flex-shrink-0 rounded-md bg-muted flex items-center justify-center">
              <ChemicalStructureIcon smiles={chem.smiles} className="h-12 w-12" />
            </div>
            <div>
              <SheetTitle>{chem.title.split('—')[0].trim()}</SheetTitle>
              <SheetDescription className="font-mono text-xs">{chem.formula} · {chem.mw}</SheetDescription>
              <SheetDescription className="text-xs">CAS: {chem.title.split('—')[1].trim()}</SheetDescription>
            </div>
          </div>
        );
      case 'polymer':
        const poly = item as Polymer;
        return (
          <div>
            <SheetTitle>{poly.name}</SheetTitle>
            <SheetDescription className="text-xs">{poly.monomers.join(', ')}</SheetDescription>
            <SheetDescription className="text-xs">{poly.process}</SheetDescription>
          </div>
        );
      case 'paper':
        const paper = item as Paper;
        return (
          <div>
            <SheetTitle>{paper.title}</SheetTitle>
            <SheetDescription className="text-xs">{paper.journal} · {paper.date}</SheetDescription>
          </div>
        );
      case 'patent':
        const patent = item as Patent;
        return (
          <div>
            <SheetTitle>{patent.title}</SheetTitle>
            <SheetDescription className="text-xs">{patent.assignee} · {patent.number}</SheetDescription>
          </div>
        );
    }
  };

  const prompts = quickPrompts[item.type];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[560px] p-0 flex flex-col">
        <SheetHeader className="p-6">
          {getHeader()}
        </SheetHeader>
        <Separator />
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-4">
            <h4 className="font-semibold text-sm">Quick Prompts</h4>
            <div className="flex flex-wrap gap-2">
              {prompts.map(prompt => <Badge key={prompt} variant="secondary" className="cursor-pointer">{prompt}</Badge>)}
            </div>
            <Separator />
            {/* Chat history would go here */}
            <div className="text-sm text-center text-muted-foreground pt-10">
              Chat history will appear here.
            </div>
          </div>
        </ScrollArea>
        <SheetFooter className="p-4 bg-background border-t">
          <div className="relative w-full">
            <Input placeholder="Ask a follow-up question..." className="pr-10" />
            <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
