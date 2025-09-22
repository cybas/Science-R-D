'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type MemoryFiltersProps = {
  filters: any;
  onFilterChange: (newFilters: any) => void;
  resultCount: number;
  selectionCount: number;
};

const typeOptions = ['molecule', 'polymer', 'paper', 'patent', 'hypothesis'];
const tagOptions = ['PET', 'Bio-derived', 'Nanocomposites', 'High-Tg', 'Recycling'];

export function MemoryFilters({ filters, onFilterChange, resultCount, selectionCount }: MemoryFiltersProps) {
  return (
    <div className="sticky top-16 z-30 -mx-4 border-b bg-background/80 p-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4">
        <Input
          placeholder="Search titles, abstracts, notes..."
          className="flex-1 min-w-[200px]"
          value={filters.q}
          onChange={(e) => onFilterChange({ q: e.target.value })}
        />
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-auto min-w-[150px] justify-start text-left font-normal">
                    {filters.type.length > 0 ? `${filters.type.length} types selected` : 'All Types'}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                {typeOptions.map(t => (
                    <div key={t} className="flex items-center gap-2 capitalize">
                        <Checkbox id={`type-${t}`} 
                            checked={filters.type.includes(t)}
                            onCheckedChange={checked => {
                                const newTypes = checked ? [...filters.type, t] : filters.type.filter(ty => ty !== t);
                                onFilterChange({ type: newTypes });
                            }}
                        />
                        <Label htmlFor={`type-${t}`}>{t}</Label>
                    </div>
                ))}
            </PopoverContent>
        </Popover>

        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-auto min-w-[150px] justify-start text-left font-normal">
                    {filters.tags.length > 0 ? `${filters.tags.length} tags selected` : 'All Tags'}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                {tagOptions.map(t => (
                    <div key={t} className="flex items-center gap-2">
                        <Checkbox id={`tag-${t}`} 
                            checked={filters.tags.includes(t)}
                            onCheckedChange={checked => {
                                const newTags = checked ? [...filters.tags, t] : filters.tags.filter(tg => tg !== t);
                                onFilterChange({ tags: newTags });
                            }}
                        />
                        <Label htmlFor={`tag-${t}`}>{t}</Label>
                    </div>
                ))}
            </PopoverContent>
        </Popover>
        
        <div className="ml-auto flex items-center gap-4">
            {selectionCount > 0 && <Button size="sm">Actions ({selectionCount})</Button>}
            <Select value={filters.sort} onValueChange={(value) => onFilterChange({ sort: value })}>
                <SelectTrigger className="w-auto">
                <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="source">Source</SelectItem>
                </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground whitespace-nowrap">{resultCount} Results</div>
        </div>
      </div>
    </div>
  );
}
