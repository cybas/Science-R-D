'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ExternalLink, MessageSquare, Bookmark, GitCompare, MoreVertical, Star, FileText, FlaskConical } from 'lucide-react';
import type { FeedItem, Chemical, Polymer, Paper, Patent } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChemicalStructureIcon } from '../icons/chemical-structure-icon';

type MemoryCardProps = {
  item: FeedItem;
  onAskAi: () => void;
  onOpen: () => void;
  onCompare?: () => void;
  onRemove: () => void;
  isSelected: boolean;
  onToggleSelected: (id: string, selected: boolean) => void;
};

const getIcon = (type: string) => {
    switch(type) {
        case 'chemical': return <FlaskConical className="h-3 w-3" />;
        case 'polymer': return <GitCompare className="h-3 w-3" />;
        case 'paper': return <FileText className="h-3 w-3" />;
        case 'patent': return <FileText className="h-3 w-3" />;
        case 'hypothesis': return <FlaskConical className="h-3 w-3" />;
        default: return null;
    }
}

export function MemoryCard({ item, onAskAi, onOpen, onCompare, onRemove, isSelected, onToggleSelected }: MemoryCardProps) {
    const isHypothesis = item.type === 'hypothesis' as any;
    const hasNotes = Math.random() > 0.7; // Fake it for now
    const isPinned = Math.random() > 0.8; // Fake it for now

    const renderCardContent = () => {
        switch (item.type) {
        case 'chemical':
            const chem = item as Chemical;
            return <p className="text-sm text-muted-foreground">Formula: {chem.formula} · MW: {chem.mw} · Role: {chem.role}</p>
        case 'polymer':
             const poly = item as Polymer;
            return <p className="text-sm text-muted-foreground">Tg: {poly.props.tg} · Tm: {poly.props.tm} · Modulus: {poly.props.modulus}</p>
        case 'hypothesis' as any:
        case 'paper':
        case 'patent':
            return <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
        default:
            return null;
        }
    };
    
  return (
    <Card className={cn(isSelected && "border-primary")}>
      <CardContent className="p-4 grid grid-cols-[auto_1fr] gap-x-4">
        <div className="flex flex-col items-center pt-1">
            <Checkbox 
                checked={isSelected}
                onCheckedChange={(checked) => onToggleSelected(item.id, !!checked)}
                aria-label={`Select item: ${'title' in item ? item.title : item.name}`}
            />
        </div>
        <div className="space-y-3">
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            {getIcon(item.type)}
            <span>{item.source}</span> ·
            <span>Saved {item.date}</span>
            {item.type === 'paper' && (item as Paper).status === 'Paywalled' && <Badge variant="outline">Paywalled</Badge>}
            {isPinned && <Star className="h-3 w-3 text-amber-500 fill-current" />}
            {hasNotes && <FileText className="h-3 w-3" />}
            {isHypothesis && <Badge variant="secondary">🧪 Hypothesis</Badge>}
          </div>
          <div>
            <h3 className="font-semibold text-base line-clamp-2 cursor-pointer hover:underline" onClick={onOpen}>
                {'title' in item ? item.title : item.name}
            </h3>
          </div>
            {renderCardContent()}
          <div className="flex flex-wrap gap-1">
            {item.tags?.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
          </div>
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={onAskAi}
              aria-label={`Ask R&A Ai about ${'title' in item ? item.title : item.name}`}
            >
              <MessageSquare />
              <span>Ask R&A Ai</span>
            </Button>
            <Button asChild variant="secondary" size="sm">
                <Link href={'href' in item ? item.href : '#'} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    <span>Open Source</span>
                </Link>
            </Button>
            {onCompare && (
                <Button variant="secondary" size="sm" onClick={onCompare}>
                    <GitCompare />
                    <span>Compare</span>
                </Button>
            )}
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm"><MoreVertical /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Move to Collection</DropdownMenuItem>
                    <DropdownMenuItem>Pin</DropdownMenuItem>
                    <DropdownMenuItem>Add Note</DropdownMenuItem>
                    <DropdownMenuItem onClick={onRemove} className="text-destructive">Remove</DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
