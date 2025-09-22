'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, MessageSquare, Bookmark } from 'lucide-react';
import type { Patent } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type PatentCardProps = {
  patent: Patent;
  onDetails: () => void;
  onSaveToMemory: () => void;
  onAskAi: () => void;
  isSaved: boolean;
};

export function PatentCard({ patent, onDetails, onSaveToMemory, onAskAi, isSaved }: PatentCardProps) {
  const isPending = new Date(patent.date) > new Date();
  const status = isPending ? 'Pending' : 'Granted';

  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <div className="text-sm text-muted-foreground">
          {patent.number} · {patent.date} · 
          <Badge variant={status === 'Pending' ? 'secondary' : 'outline'} className="ml-2">
            {status}
          </Badge>
        </div>
        <div>
          <h3 className="font-semibold text-base line-clamp-2 cursor-pointer hover:underline" onClick={onDetails}>{patent.title}</h3>
          <p className="text-sm text-muted-foreground">{patent.assignee}</p>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{patent.summary}</p>
        <div className="flex flex-wrap gap-2">
          {patent.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={onAskAi}
            aria-label={`Ask R&A Ai about ${patent.title}`}
          >
            <MessageSquare />
            <span>Ask R&A Ai</span>
          </Button>
          <Button variant="secondary" size="sm" onClick={onSaveToMemory}>
            <Bookmark className={cn(isSaved && 'fill-primary')} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </Button>
          <Button asChild variant="secondary" size="sm">
            <Link href={patent.href} target="_blank" rel="noopener noreferrer">
              <ExternalLink />
              <span>View Patent</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
