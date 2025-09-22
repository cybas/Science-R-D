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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type PatentFiltersProps = {
  filters: any;
  onFilterChange: (newFilters: any) => void;
  resultCount: number;
};

const jurisdictionOptions = ['IN', 'US', 'EP', 'WO', 'CN', 'JP'];
const assigneeOptions = ['Example Polymers Ltd.', 'RePoly Corp.', 'FilmTech GmbH'];

export function PatentFilters({ filters, onFilterChange, resultCount }: PatentFiltersProps) {
  return (
    <div className="sticky top-16 z-30 -mx-4 border-b bg-background/80 p-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Input
            placeholder="Search title, abstract, number..."
            className="flex-1 min-w-[200px]"
            value={filters.q}
            onChange={(e) => onFilterChange({ q: e.target.value })}
          />
          <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-auto min-w-[150px] justify-start">Jurisdictions</Button>
            </PopoverTrigger>
            <PopoverContent>
                {jurisdictionOptions.map(j => (
                    <div key={j} className="flex items-center gap-2">
                         <Checkbox id={`jur-${j}`}
                            checked={filters.jurisdictions.includes(j)}
                            onCheckedChange={checked => {
                                const newJurisdictions = checked ? [...filters.jurisdictions, j] : filters.jurisdictions.filter(jur => jur !== j);
                                onFilterChange({ jurisdictions: newJurisdictions });
                            }}
                        />
                        <Label htmlFor={`jur-${j}`} className="font-normal">{j}</Label>
                    </div>
                ))}
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-auto min-w-[150px] justify-start">Assignees</Button>
            </PopoverTrigger>
            <PopoverContent>
                {assigneeOptions.map(a => (
                    <div key={a} className="flex items-center gap-2">
                        <Checkbox id={`asg-${a}`}
                            checked={filters.assignees.includes(a)}
                            onCheckedChange={checked => {
                                const newAssignees = checked ? [...filters.assignees, a] : filters.assignees.filter(asg => asg !== a);
                                onFilterChange({ assignees: newAssignees });
                            }}
                        />
                        <Label htmlFor={`asg-${a}`} className="font-normal">{a}</Label>
                    </div>
                ))}
            </PopoverContent>
          </Popover>

          <ToggleGroup type="single" value={filters.status} onValueChange={(value) => value && onFilterChange({ status: value })} defaultValue="all">
            <ToggleGroupItem value="all">All Status</ToggleGroupItem>
            <ToggleGroupItem value="pending">Pending</ToggleGroupItem>
            <ToggleGroupItem value="granted">Granted</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           <Select value={filters.timeframe} onValueChange={(value) => onFilterChange({ timeframe: value })}>
            <SelectTrigger className="w-auto min-w-[150px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto flex items-center gap-4">
            <Select value={filters.sort} onValueChange={(value) => onFilterChange({ sort: value })}>
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground whitespace-nowrap">{resultCount} Results</div>
          </div>
        </div>
      </div>
    </div>
  );
}
