'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MoleculeFilters } from './molecule-filters';

type FilterValues = {
  role: string;
  hazards: string[];
  mw: [number, number];
  mp: [number, number];
  logP: [number, number];
  suppliers: string[];
  sort: string;
};

type FilterSheetProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterValues;
  onFilterChange: (newFilters: Partial<FilterValues>) => void;
  resultCount: number;
};

export function FilterSheet({ isOpen, onOpenChange, filters, onFilterChange, resultCount }: FilterSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-lg">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          {/* Re-using MoleculeFilters component with some layout adjustments */}
          <div className="flex flex-col gap-4">
             <MoleculeFilters filters={filters} onFilterChange={onFilterChange} resultCount={resultCount} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="w-full">Show {resultCount} results</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
