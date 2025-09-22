'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, MessageSquare, Bookmark, GitCompare } from 'lucide-react';
import type { Polymer } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type PolymerCardProps = {
  polymer: Polymer;
  onDetails: () => void;
  onSaveToMemory: () => void;
  onAskAi: () => void;
  onCompare: () => void;
  isSaved: boolean;
};

export function PolymerCard({
  polymer,
  onDetails,
  onSaveToMemory,
  onAskAi,
  onCompare,
  isSaved,
}: PolymerCardProps) {

  return (
    <Card className="flex flex-col" data-item-id={polymer.id} data-item-type="polymer">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold cursor-pointer hover:underline" onClick={onDetails}>{polymer.name}</CardTitle>
        <p className="text-xs text-muted-foreground">{polymer.source} · {polymer.date}</p>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="space-y-2 text-sm">
            <div className="flex flex-wrap gap-1">
                <strong className="font-medium text-muted-foreground w-20 shrink-0">Monomers</strong>
                {polymer.monomers.map(m => <Badge key={m} variant="secondary">{m}</Badge>)}
            </div>
             <div className="flex flex-wrap gap-1">
                <strong className="font-medium text-muted-foreground w-20 shrink-0">Process</strong>
                <Badge variant="outline">{polymer.process}</Badge>
            </div>
             <div className="flex flex-wrap gap-1">
                <strong className="font-medium text-muted-foreground w-20 shrink-0">Forms</strong>
                 {polymer.forms.map(f => <Badge key={f} variant="outline" className="font-normal">{f}</Badge>)}
            </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
            <div><span className="font-semibold">Tg:</span> {polymer.props.tg}</div>
            <div><span className="font-semibold">Tm:</span> {polymer.props.tm}</div>
            <div><span className="font-semibold">Modulus:</span> {polymer.props.modulus}</div>
            {polymer.props.tensile && <div><span className="font-semibold">Tensile:</span> {polymer.props.tensile}</div>}
        </div>
        {polymer.notes && <p className="text-sm text-accent-foreground/80 bg-accent/20 p-2 rounded-md">{polymer.notes}</p>}
      </CardContent>
       <div className="border-t p-2 flex flex-wrap gap-2 justify-start">
            <Button
              variant="primary"
              size="sm"
              onClick={onAskAi}
              aria-label={`Ask R&A Ai about ${polymer.name}`}
            >
              <MessageSquare />
              <span>Ask R&A Ai</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={onSaveToMemory}>
              <Bookmark className={cn(isSaved && "fill-primary")} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
            <Button asChild variant="secondary" size="sm">
                <Link href={polymer.href} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    <span>Open Source</span>
                </Link>
            </Button>
            <Button variant="secondary" size="sm" onClick={onCompare}>
              <GitCompare />
              <span>Compare</span>
            </Button>
        </div>
    </Card>
  );
}
