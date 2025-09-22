
'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type ExperimentFiltersProps = {
  filters: any;
  onFilterChange: (newFilters: any) => void;
  resultCount: number;
};

const processOptions = ['Step-growth', 'ROP', 'ATRP', 'RAFT', 'Anionic', 'Cationic', 'Polycondensation'];
const ownerOptions = ['Jai Singhania', 'A. Rao', 'P. Mehta'];
const projectOptions = ['High-Tg PET', 'BOPET Barrier', 'PET Recycling'];

export function ExperimentFilters({
  filters,
  onFilterChange,
  resultCount,
}: ExperimentFiltersProps) {
  return (
    <div className="sticky top-16 z-30 -mx-4 border-b bg-background/80 p-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Input
            placeholder="Search experiments by ID, tags..."
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
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
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
           <Select
            value={filters.timeframe}
            onValueChange={(value) => onFilterChange({ timeframe: value })}
          >
            <SelectTrigger className="w-auto min-w-[150px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium">Process:</span>
          {processOptions.map((topic) => (
            <Badge
              key={topic}
              variant={filters.process.includes(topic) ? 'default' : 'secondary'}
              onClick={() => {
                const newTopics = filters.process.includes(topic)
                  ? filters.process.filter((t: string) => t !== topic)
                  : [...filters.process, topic];
                onFilterChange({ process: newTopics });
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
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground whitespace-nowrap">
              {resultCount} Results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
