'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink, MessageSquare, Bookmark, Lock } from 'lucide-react';
import type { Paper } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type PaperCardProps = {
  paper: Paper;
  onDetails: () => void;
  onSaveToMemory: () => void;
  onAskAi: () => void;
  isSaved: boolean;
  isSelected: boolean;
  onToggleSelected: (id: string, selected: boolean) => void;
};

export function PaperCard({ paper, onDetails, onSaveToMemory, onAskAi, isSaved, isSelected, onToggleSelected }: PaperCardProps) {
  return (
    <Card>
      <CardContent className="p-5 grid grid-cols-[auto_1fr] gap-x-4">
        <div className="flex flex-col items-center">
            <Checkbox 
                checked={isSelected}
                onCheckedChange={(checked) => onToggleSelected(paper.id, !!checked)}
                className="mb-4"
                aria-label={`Select paper: ${paper.title}`}
            />
        </div>
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            {paper.journal} · {paper.date} · 
            <Badge variant={paper.status === 'Open' ? 'secondary' : 'outline'} className="ml-2">
                {paper.status === 'Paywalled' && <Lock className="h-3 w-3 mr-1" />}
                {paper.status}
            </Badge>
          </div>
          <div>
            <h3 className="font-semibold text-base line-clamp-2 cursor-pointer hover:underline" onClick={onDetails}>{paper.title}</h3>
            {/* Authors would go here */}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">{paper.summary}</p>
          <div className="flex flex-wrap gap-2">
            {paper.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={onAskAi}
              aria-label={`Ask R&A Ai about ${paper.title}`}
            >
              <MessageSquare />
              <span>Ask R&A Ai</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={onSaveToMemory}>
              <Bookmark className={cn(isSaved && 'fill-primary')} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href={paper.href} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                <span>Read</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
