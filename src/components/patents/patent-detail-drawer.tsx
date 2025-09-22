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
import { ExternalLink, Bookmark, MessageSquare } from 'lucide-react';
import type { Patent } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';

type PatentDetailDrawerProps = {
  patent: Patent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveToMemory: () => void;
  onAskAi: () => void;
  isSaved: boolean;
};

export function PatentDetailDrawer({ patent, open, onOpenChange, onSaveToMemory, onAskAi, isSaved }: PatentDetailDrawerProps) {
  if (!patent) return null;

  const isPending = new Date(patent.date) > new Date();
  const status = isPending ? 'Pending' : 'Granted';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl p-0 flex flex-col">
        <SheetHeader className="p-6">
          <SheetDescription>
            {patent.number} · {patent.assignee} · {patent.date}
          </SheetDescription>
          <SheetTitle className="text-base">{patent.title}</SheetTitle>
          <Button asChild variant="link" className="p-0 h-auto text-xs justify-start">
            <Link href={patent.href} target="_blank" rel="noopener noreferrer">
              View Patent <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </SheetHeader>

        <Tabs defaultValue="summary" className="w-full flex-1 flex flex-col min-h-0">
          <div className="px-6">
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="claims">Claims</TabsTrigger>
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="status">Legal Status</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <div className="p-6 text-sm">
              <TabsContent value="summary">
                 <div className="space-y-4">
                    <p className="text-muted-foreground">{patent.summary}</p>
                    <h4 className="font-semibold">Key Claims</h4>
                    <ul className="space-y-2 list-disc pl-4">
                        <li>A BOPET film comprising a masterbatch of surface-treated nanoclay at a concentration of 0.5-3.0 wt%.</li>
                        <li>The film exhibiting an oxygen transmission rate (OTR) of less than 2.0 cc/m²/day.</li>
                    </ul>
                 </div>
              </TabsContent>
              <TabsContent value="claims">
                <p className="text-muted-foreground text-center">[Placeholder for full claims list]</p>
              </TabsContent>
              <TabsContent value="family">
                <p className="text-muted-foreground text-center">[Placeholder for patent family table]</p>
              </TabsContent>
              <TabsContent value="status">
                 <div className="space-y-2">
                    <Badge>{status}</Badge>
                    <p className="text-muted-foreground">[Placeholder for legal status timeline]</p>
                 </div>
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
