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
import { List, Kanban } from 'lucide-react';

type ProjectFiltersProps = {
  filters: any;
  onFilterChange: (newFilters: any) => void;
  resultCount: number;
};

const tagOptions = ['Polyesters', 'Recycling', 'Bio-based', 'Barrier', 'Packaging'];
const ownerOptions = ['Jai Singhania', 'A. Rao', 'P. Mehta', 'IP Team'];

export function ProjectFilters({
  filters,
  onFilterChange,
  resultCount,
}: ProjectFiltersProps) {
  return (
    <div className="sticky top-16 z-30 -mx-4 border-b bg-background/80 p-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Input
            placeholder="Search projects..."
            className="flex-1 min-w-[200px]"
            value={filters.q}
            onChange={(e) => onFilterChange({ q: e.target.value })}
          />
          <Select
            value={filters.status}
            onValueChange={(value) => onFilterChange({ status: value })}
          >
            <SelectTrigger className="w-auto min-w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.owner}
            onValueChange={(value) => onFilterChange({ owner: value })}
          >
            <SelectTrigger className="w-auto min-w-[150px]">
              <SelectValue placeholder="Owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owners</SelectItem>
              {ownerOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {tagOptions.map((topic) => (
            <Badge
              key={topic}
              variant={filters.tags.includes(topic) ? 'default' : 'secondary'}
              onClick={() => {
                const newTopics = filters.tags.includes(topic)
                  ? filters.tags.filter((t: string) => t !== topic)
                  : [...filters.tags, topic];
                onFilterChange({ tags: newTopics });
              }}
              className="cursor-pointer"
            >
              {topic}
            </Badge>
          ))}
          <div className="ml-auto flex items-center gap-4">
            <Select
              value={filters.sort}
              onValueChange={(value) => onFilterChange({ sort: value })}
            >
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="milestone">Next Milestone</SelectItem>
              </SelectContent>
            </Select>
            <ToggleGroup
              type="single"
              value={filters.view}
              onValueChange={(value) => value && onFilterChange({ view: value })}
              defaultValue="board"
            >
              <ToggleGroupItem value="board" aria-label="Board view">
                <Kanban className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            <div className="text-sm text-muted-foreground whitespace-nowrap">
              {resultCount} Results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
