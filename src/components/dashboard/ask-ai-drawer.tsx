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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChemicalStructureIcon } from '../icons/chemical-structure-icon';
import { Send, Bookmark, ExternalLink } from 'lucide-react';
import type { FeedItem, Chemical, Polymer, Paper, Patent } from '@/lib/data';
import Link from 'next/link';

type AskAiDrawerProps = {
  item: FeedItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveToMemory: (item: FeedItem) => void;
  isSaved: boolean;
};

const quickPrompts = {
  chemical: [
    'Suggest comonomers to raise Tg',
    'Compatible catalysts/conditions?',
    'Safety & handling (GHS/REACH)'
  ],
  polymer: [
    'Alternative monomers to increase modulus',
    'Compare with PET/PEN',
    'Process window & risks'
  ],
  paper: [
    'Key claims & limitations',
    'Related prior art',
    'Practical takeaway'
  ],
  patent: [
    'Key claims & limitations',
    'Related prior art',
    'Practical takeaway'
  ]
};

export function AskAiDrawer({ item, open, onOpenChange, onSaveToMemory, isSaved }: AskAiDrawerProps) {
  if (!item) return null;

  const handleSaveClick = () => {
    onSaveToMemory(item);
  }

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
            <div className="flex flex-wrap gap-2 text-xs mt-2">
                {poly.monomers.map(m => <Badge key={m} variant="secondary">{m}</Badge>)}
                <Badge variant="outline">{poly.process}</Badge>
            </div>
            <div className="text-xs mt-2 text-muted-foreground">
                Tg: {poly.props.tg} &nbsp; Tm: {poly.props.tm}
            </div>
          </div>
        );
      case 'paper':
        const paper = item as Paper;
        return (
          <div>
            <SheetTitle>{paper.title}</SheetTitle>
            <SheetDescription className="text-xs">{paper.journal} · {paper.date}</SheetDescription>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{paper.summary}</p>
          </div>
        );
      case 'patent':
        const patent = item as Patent;
        return (
          <div>
            <SheetTitle>{patent.title}</SheetTitle>
            <SheetDescription className="text-xs">{patent.assignee} · {patent.number}</SheetDescription>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{patent.summary}</p>
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
        <div className="p-6 space-y-4">
            <h4 className="font-semibold text-sm">Quick Prompts</h4>
            <div className="flex flex-wrap gap-2">
              {prompts.map(prompt => <Badge key={prompt} variant="secondary" className="cursor-pointer">{prompt}</Badge>)}
            </div>
        </div>
        <Separator />
        <ScrollArea className="flex-1">
          <div className="p-6 text-sm text-center text-muted-foreground">
            Chat history will appear here.
          </div>
        </ScrollArea>
        <SheetFooter className="p-4 bg-background border-t flex-col gap-4">
          <div className="relative w-full">
            <Input placeholder="Ask a follow-up question..." className="pr-10" />
            <Button type="submit" size="icon-sm" className="absolute right-1.5 top-1/2 -translate-y-1/2">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
           <div className="flex justify-between items-center w-full">
             <div className="flex gap-2">
                <Button variant={isSaved ? "default" : "primary"} onClick={handleSaveClick}>
                    <Bookmark /> {isSaved ? 'Saved to Memory' : 'Save to Memory'}
                </Button>
                <Button asChild variant="secondary">
                    <Link href={item.href} target="_blank">
                        <ExternalLink /> Open Source
                    </Link>
                </Button>
             </div>
             <p className="text-xs text-muted-foreground">Research assistance only; verify before lab use.</p>
           </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
