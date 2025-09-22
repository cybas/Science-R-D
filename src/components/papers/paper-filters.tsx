'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookCheck, Lock } from 'lucide-react';

type PaperFiltersProps = {
  filters: any;
  onFilterChange: (newFilters: any) => void;
  resultCount: number;
  onBulkCreateDigest: () => void;
  selectionCount: number;
};

const topicOptions = ['PET', 'Depolymerization', 'Nanocomposites', 'Bio-derived'];

export function PaperFilters({ filters, onFilterChange, resultCount, onBulkCreateDigest, selectionCount }: PaperFiltersProps) {
  return (
    <div className="sticky top-16 z-30 -mx-4 border-b bg-background/80 p-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Input
            placeholder="Search title, abstract, DOI..."
            className="flex-1 min-w-[200px]"
            value={filters.q}
            onChange={(e) => onFilterChange({ q: e.target.value })}
          />
          <Select value={filters.timeframe} onValueChange={(value) => onFilterChange({ timeframe: value })}>
            <SelectTrigger className="w-auto min-w-[150px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <ToggleGroup type="single" value={filters.oa} onValueChange={(value) => value && onFilterChange({ oa: value })} defaultValue="all">
            <ToggleGroupItem value="all">All</ToggleGroupItem>
            <ToggleGroupItem value="open">Open</ToggleGroupItem>
            <ToggleGroupItem value="paywalled"><Lock className="h-3 w-3 mr-1.5" />Paywalled</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {topicOptions.map((topic) => (
            <Badge
              key={topic}
              variant={filters.topics.includes(topic) ? 'default' : 'secondary'}
              onClick={() => {
                const newTopics = filters.topics.includes(topic)
                  ? filters.topics.filter((t: string) => t !== topic)
                  : [...filters.topics, topic];
                onFilterChange({ topics: newTopics });
              }}
              className="cursor-pointer"
            >
              {topic}
            </Badge>
          ))}
          <div className="ml-auto flex items-center gap-4">
             {selectionCount > 0 && (
                <Button size="sm" onClick={onBulkCreateDigest}>
                    <BookCheck className="mr-2 h-4 w-4" />
                    Create Digest ({selectionCount})
                </Button>
            )}
            <Select value={filters.sort} onValueChange={(value) => onFilterChange({ sort: value })}>
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="citations">Citations</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground whitespace-nowrap">{resultCount} Results</div>
          </div>
        </div>
      </div>
    </div>
  );
}
