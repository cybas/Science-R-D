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
import { PolymerFilters } from './polymer-filters';
import type { FilterValues } from './polymers-client';

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
      <SheetContent side="left" className="w-full max-w-sm">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <PolymerFilters filters={filters} onFilterChange={onFilterChange} resultCount={resultCount} isSheet />
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
