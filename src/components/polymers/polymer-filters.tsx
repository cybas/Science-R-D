'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import type { FilterValues } from './polymers-client';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

type PolymerFiltersProps = {
  filters: FilterValues;
  onFilterChange: (newFilters: Partial<FilterValues>) => void;
  resultCount: number;
  isSheet?: boolean;
};

const classOptions = ['Polyester', 'Polyamide', 'Polycarbonate', 'Polyolefin', 'Acrylics', 'Elastomers'];
const processOptions = ['Step-growth', 'Chain-growth', 'ROP', 'ATRP', 'RAFT', 'Anionic', 'Cationic', 'Polycondensation'];
const formOptions = ['film', 'fiber', 'resin'];

export function PolymerFilters({ filters, onFilterChange, resultCount, isSheet = false }: PolymerFiltersProps) {
  const FilterWrapper = isSheet ? 'div' : Popover;
  const TriggerWrapper = isSheet ? 'div' : PopoverTrigger;
  const ContentWrapper = isSheet ? 'div' : PopoverContent;

  const contentProps = isSheet ? {} : { className: "w-80 p-4 space-y-4", align: "start" };

  return (
    <div className={cn(!isSheet && "sticky top-16 z-30 -mx-4 border-b bg-background/80 p-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8")}>
      <div className={cn("mx-auto flex w-full max-w-7xl items-center", isSheet ? 'flex-col gap-4' : 'flex-wrap gap-x-4 gap-y-2')}>
        
        <Input 
            placeholder="Search name, class, monomer..." 
            className="flex-1 min-w-[200px]"
            value={filters.q}
            onChange={(e) => onFilterChange({ q: e.target.value })}
        />

        <FilterWrapper>
            <TriggerWrapper asChild={!isSheet}>
                <Button variant="outline" className="w-auto min-w-[150px] justify-start">
                    Class
                    {filters.class.length > 0 && <Badge variant="secondary" className="ml-2">{filters.class.length}</Badge>}
                </Button>
            </TriggerWrapper>
            <ContentWrapper {...contentProps}>
                 <Label className="font-semibold">Polymer Class</Label>
                 {classOptions.map(c => (
                    <div key={c} className="flex items-center gap-2">
                        <Checkbox id={`cls-${c}`}
                            checked={filters.class.includes(c)}
                            onCheckedChange={checked => {
                                const newClasses = checked ? [...filters.class, c] : filters.class.filter(cl => cl !== c);
                                onFilterChange({ class: newClasses });
                            }}
                        />
                        <Label htmlFor={`cls-${c}`} className="font-normal">{c}</Label>
                    </div>
                 ))}
            </ContentWrapper>
        </FilterWrapper>

        <FilterWrapper>
            <TriggerWrapper asChild={!isSheet}>
                <Button variant="outline" className="w-auto min-w-[150px] justify-start">Process</Button>
            </TriggerWrapper>
            <ContentWrapper {...contentProps} className="w-96 p-4">
                 <Label className="font-semibold">Polymerization Process</Label>
                 <div className="flex flex-wrap gap-2">
                    {processOptions.map(p => (
                        <Badge key={p} 
                            variant={filters.process.includes(p) ? 'default' : 'secondary'}
                            onClick={() => {
                                const newProcesses = filters.process.includes(p) ? filters.process.filter(pr => pr !== p) : [...filters.process, p];
                                onFilterChange({ process: newProcesses });
                            }}
                            className="cursor-pointer"
                        >
                            {p}
                        </Badge>
                    ))}
                 </div>
            </ContentWrapper>
        </FilterWrapper>
        
        <FilterWrapper>
            <TriggerWrapper asChild={!isSheet}>
                <Button variant="outline" className="w-auto min-w-[150px] justify-start">Properties</Button>
            </TriggerWrapper>
            <ContentWrapper {...contentProps}>
                 <div>
                    <Label>Tg: {filters.Tg[0]} - {filters.Tg[1]} °C</Label>
                    <Slider value={filters.Tg} onValueChange={(value) => onFilterChange({ Tg: value as [number, number]})} min={-50} max={300} step={10}/>
                 </div>
                 <div>
                    <Label>Tm: {filters.Tm[0]} - {filters.Tm[1]} °C</Label>
                    <Slider value={filters.Tm} onValueChange={(value) => onFilterChange({ Tm: value as [number, number]})} min={50} max={400} step={10}/>
                 </div>
                 <div>
                    <Label>Modulus: {filters.Modulus[0]} - {filters.Modulus[1]} GPa</Label>
                    <Slider value={filters.Modulus} onValueChange={(value) => onFilterChange({ Modulus: value as [number, number]})} min={0.1} max={20} step={0.1}/>
                 </div>
            </ContentWrapper>
        </FilterWrapper>
        
        <div className={cn("flex items-center gap-4", isSheet ? 'w-full' : 'ml-auto')}>
            <Select value={filters.sort} onValueChange={value => onFilterChange({ sort: value })}>
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="Tg">Tg</SelectItem>
                <SelectItem value="Modulus">Modulus</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground whitespace-nowrap">{resultCount} Results</div>
        </div>
      </div>
    </div>
  );
}
