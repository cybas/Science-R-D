
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink, MessageSquare, Bookmark } from 'lucide-react';
import type { FeedItem } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FlaskConical, GitCompare, FileText } from 'lucide-react';

type ReportCardProps = {
  item: FeedItem;
  isSelected: boolean;
  onToggleSelected: (id: string, selected: boolean) => void;
};

const getIcon = (type: string) => {
    switch(type) {
        case 'chemical': return <FlaskConical className="h-4 w-4 text-muted-foreground" />;
        case 'polymer': return <GitCompare className="h-4 w-4 text-muted-foreground" />;
        case 'paper': return <FileText className="h-4 w-4 text-muted-foreground" />;
        case 'patent': return <FileText className="h-4 w-4 text-muted-foreground" />;
        default: return null;
    }
}

export function ReportCard({ item, isSelected, onToggleSelected }: ReportCardProps) {
  return (
    <Card className={cn(isSelected && "border-primary")}>
      <CardContent className="p-4 grid grid-cols-[auto_1fr_auto] gap-x-4">
        <div className="flex flex-col items-center pt-1">
            <Checkbox 
                checked={isSelected}
                onCheckedChange={(checked) => onToggleSelected(item.id, !!checked)}
                aria-label={`Select item: ${'title' in item ? item.title : item.name}`}
            />
        </div>
        <div className="space-y-2">
            <h3 className="font-semibold text-sm line-clamp-1">
                {'title' in item ? item.title : item.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{'summary' in item ? item.summary : `ID: ${item.id}`}</p>
            <div className="flex flex-wrap gap-1">
                {item.tags?.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
            </div>
        </div>
         <div className="flex flex-col items-end justify-start pt-1">
            {getIcon(item.type)}
        </div>
      </CardContent>
    </Card>
  );
}
