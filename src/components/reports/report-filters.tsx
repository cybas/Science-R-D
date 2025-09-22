
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

type ReportFiltersProps = {
  filters: any;
  onFilterChange: (newFilters: any) => void;
  resultCount: number;
};

const typeOptions = ['molecule', 'polymer', 'paper', 'patent', 'run', 'hypothesis'];
const sourceOptions = ['PubChem', 'PoLyInfo', 'OpenAlex', 'Lens', 'Internal'];

export function ReportFilters({ filters, onFilterChange, resultCount }: ReportFiltersProps) {
  return (
    <div className="sticky top-16 z-30 -mx-4 border-b bg-background/80 p-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4">
        <Input
          placeholder="Filter items for your digest..."
          className="flex-1 min-w-[200px]"
          value={filters.q}
          onChange={(e) => onFilterChange({ q: e.target.value })}
        />
        <Select value={filters.timeframe} onValueChange={(value) => onFilterChange({ timeframe: value })}>
            <SelectTrigger className="w-auto min-w-[150px]"><SelectValue /></SelectTrigger>
            <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
        </Select>
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-auto min-w-[150px] justify-start text-left font-normal">
                    {filters.types.length > 0 ? `${filters.types.length} types selected` : 'All Types'}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                {typeOptions.map(t => (
                    <div key={t} className="flex items-center gap-2 capitalize">
                        <Checkbox id={`type-${t}`} 
                            checked={filters.types.includes(t)}
                            onCheckedChange={checked => {
                                const newTypes = checked ? [...filters.types, t] : filters.types.filter(ty => ty !== t);
                                onFilterChange({ types: newTypes });
                            }}
                        />
                        <Label htmlFor={`type-${t}`}>{t}</Label>
                    </div>
                ))}
            </PopoverContent>
        </Popover>

        <div className="ml-auto flex items-center gap-4">
            <Select value={filters.sort} onValueChange={(value) => onFilterChange({ sort: value })}>
                <SelectTrigger className="w-auto"><SelectValue placeholder="Sort" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground whitespace-nowrap">{resultCount} Results</div>
        </div>
      </div>
    </div>
  );
}
