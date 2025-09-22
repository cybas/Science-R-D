'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '../ui/separator';

type FilterValues = {
  role: string;
  hazards: string[];
  mw: [number, number];
  mp: [number, number];
  logP: [number, number];
  suppliers: string[];
  sort: string;
};

type MoleculeFiltersProps = {
  filters: FilterValues;
  onFilterChange: (newFilters: Partial<FilterValues>) => void;
  resultCount: number;
};

const hazardOptions = ['H225', 'H302', 'H314', 'H315', 'H351'];
const supplierOptions = ['Sigma', 'TCI', 'Local'];

export function MoleculeFilters({ filters, onFilterChange, resultCount }: MoleculeFiltersProps) {
  return (
    <div className="sticky top-16 z-30 -mx-4 border-b bg-background/80 p-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-4 gap-y-2">
        <Select value={filters.role} onValueChange={(value) => onFilterChange({ role: value })}>
          <SelectTrigger className="w-auto min-w-[150px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Monomer">Monomer</SelectItem>
            <SelectItem value="Initiator">Initiator</SelectItem>
            <SelectItem value="Catalyst">Catalyst</SelectItem>
            <SelectItem value="Solvent">Solvent</SelectItem>
            <SelectItem value="Additive">Additive</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-auto min-w-[150px] justify-start">
              Hazards
              {filters.hazards.length > 0 && <Badge variant="secondary" className="ml-2">{filters.hazards.length}</Badge>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 space-y-2" align="start">
             <Label className="font-semibold">Filter by GHS Hazard</Label>
             {hazardOptions.map(h => (
                <div key={h} className="flex items-center gap-2">
                    <Checkbox id={`haz-${h}`}
                        checked={filters.hazards.includes(h)}
                        onCheckedChange={checked => {
                            const newHazards = checked ? [...filters.hazards, h] : filters.hazards.filter(hz => hz !== h);
                            onFilterChange({ hazards: newHazards });
                        }}
                    />
                    <Label htmlFor={`haz-${h}`} className="font-normal">{h}</Label>
                </div>
             ))}
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-auto min-w-[150px] justify-start">Properties</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 space-y-4" align="start">
            <div>
              <Label>MW: {filters.mw[0]} - {filters.mw[1]}</Label>
              <Slider value={filters.mw} onValueChange={(value) => onFilterChange({ mw: value as [number, number]})} min={0} max={1000} step={10}/>
            </div>
            <div>
              <Label>m.p. (°C): {filters.mp[0]} - {filters.mp[1]}</Label>
              <Slider value={filters.mp} onValueChange={(value) => onFilterChange({ mp: value as [number, number]})} min={-100} max={500} step={10}/>
            </div>
             <div>
              <Label>logP: {filters.logP[0]} - {filters.logP[1]}</Label>
              <Slider value={filters.logP} onValueChange={(value) => onFilterChange({ logP: value as [number, number]})} min={-5} max={10} step={0.5}/>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-auto min-w-[150px] justify-start">
              Suppliers
              {filters.suppliers.length > 0 && <Badge variant="secondary" className="ml-2">{filters.suppliers.length}</Badge>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 space-y-2" align="start">
             <Label className="font-semibold">Filter by Supplier</Label>
             {supplierOptions.map(s => (
                <div key={s} className="flex items-center gap-2">
                    <Checkbox id={`sup-${s}`}
                        checked={filters.suppliers.includes(s)}
                        onCheckedChange={checked => {
                            const newSuppliers = checked ? [...filters.suppliers, s] : filters.suppliers.filter(sp => sp !== s);
                            onFilterChange({ suppliers: newSuppliers });
                        }}
                    />
                    <Label htmlFor={`sup-${s}`} className="font-normal">{s}</Label>
                </div>
             ))}
          </PopoverContent>
        </Popover>
        
        <div className="ml-auto flex items-center gap-4">
            <Select value={filters.sort} onValueChange={value => onFilterChange({ sort: value })}>
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="mw">MW</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
              </SelectContent>
            </Select>
            <Separator orientation="vertical" className="h-6" />
            <div className="text-sm text-muted-foreground">{resultCount} Results</div>
        </div>
      </div>
    </div>
  );
}
