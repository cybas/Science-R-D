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
import { ExternalLink, Bookmark, MessageSquare, Lock } from 'lucide-react';
import type { Paper } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';

type PaperDetailDrawerProps = {
  paper: Paper | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveToMemory: () => void;
  onAskAi: () => void;
  isSaved: boolean;
};

export function PaperDetailDrawer({ paper, open, onOpenChange, onSaveToMemory, onAskAi, isSaved }: PaperDetailDrawerProps) {
  if (!paper) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl p-0 flex flex-col">
        <SheetHeader className="p-6">
          <SheetTitle className="text-base">{paper.title}</SheetTitle>
          <SheetDescription>
            {paper.journal} · {paper.date} ·
             <Badge variant={paper.status === 'Open' ? 'secondary' : 'outline'} className="ml-2">
                {paper.status === 'Paywalled' && <Lock className="h-3 w-3 mr-1" />}
                {paper.status}
            </Badge>
          </SheetDescription>
          <Button asChild variant="link" className="p-0 h-auto text-xs justify-start">
            <Link href={paper.href} target="_blank" rel="noopener noreferrer">
              Read Source <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </SheetHeader>

        <Tabs defaultValue="summary" className="w-full flex-1 flex flex-col min-h-0">
          <div className="px-6">
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="abstract">Abstract</TabsTrigger>
              <TabsTrigger value="figures">Figures</TabsTrigger>
              <TabsTrigger value="citations">Citations</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <div className="p-6 text-sm">
              <TabsContent value="summary">
                 <ul className="space-y-2 list-disc pl-4">
                    <li>Sorbitol-derived diols used as comonomers raise Tg by 12–18 °C.</li>
                    <li>Maintains processability for existing PET workflows.</li>
                    <li>Demonstrates potential for bio-based high-performance polyesters.</li>
                 </ul>
              </TabsContent>
              <TabsContent value="abstract">
                <p className="text-muted-foreground">{paper.summary} This is a placeholder for the full abstract text, which would be longer and more detailed, outlining the background, methods, results, and conclusion of the study.</p>
              </TabsContent>
              <TabsContent value="figures">
                <p className="text-muted-foreground text-center">[Placeholder for figures and captions]</p>
              </TabsContent>
              <TabsContent value="citations">
                 <p className="text-muted-foreground text-center">[Placeholder for BibTeX, RIS, etc.]</p>
              </TabsContent>
              <TabsContent value="notes">
                <Textarea placeholder="Your notes here... (Markdown supported)" className="min-h-[200px]"/>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
        
        <SheetFooter className="p-4 bg-background border-t">
            <div className="flex gap-2 w-full">
                <Button variant="secondary" onClick={onSaveToMemory}>
                    <Bookmark className={cn(isSaved && "fill-primary")} />
                    {isSaved ? 'Saved' : 'Save to Memory'}
                </Button>
                <Button className="flex-1" onClick={onAskAi}>
                    <MessageSquare />Ask R&A Ai
                </Button>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
