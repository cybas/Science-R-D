'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-react';
import { PolymerCard } from './polymer-card';
import { PolymerFilters } from './polymer-filters';
import { PolymerDetailDrawer } from './polymer-detail-drawer';
import { DesignAssistant } from './design-assistant';
import { AskAiDrawer } from '@/components/dashboard/ask-ai-drawer';
import { PolymerCompareSheet } from '@/components/dashboard/polymer-compare-sheet';
import { FilterSheet } from './filter-sheet';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Polymer, Chemical } from '@/lib/data';

type PolymersClientProps = {
  polymers: Polymer[];
  allChemicals: Chemical[];
};

export type FilterValues = {
  q: string;
  class: string[];
  monomers: string[];
  process: string[];
  form: string[];
  Tg: [number, number];
  Tm: [number, number];
  Modulus: [number, number];
  sort: string;
};

const defaultFilters: FilterValues = {
  q: '',
  class: [],
  monomers: [],
  process: [],
  form: [],
  Tg: [-50, 300],
  Tm: [50, 400],
  Modulus: [0.1, 20],
  sort: 'relevance',
};

export function PolymersClient({ polymers, allChemicals }: PolymersClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [basket, setBasket] = useState<Chemical[]>([]);
  const [memoryItems, setMemoryItems] = useState<(Polymer | {id: string, name: string, type: 'polymer', summary: string, tags: string[]})[]>([]);
  const [filters, setFilters] = useState<FilterValues>(defaultFilters);
  const [isFilterSheetOpen, setFilterSheetOpen] = useState(false);
  const [polymerToCompare, setPolymerToCompare] = useState<Polymer | null>(null);

  // Initialize filters and basket from URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    setFilters({
      q: params.get('q') || defaultFilters.q,
      class: params.get('class')?.split(',') || defaultFilters.class,
      monomers: params.get('monomers')?.split(',') || defaultFilters.monomers,
      process: params.get('process')?.split(',') || defaultFilters.process,
      form: params.get('form')?.split(',') || defaultFilters.form,
      Tg: params.has('TgMin') && params.has('TgMax') ? [Number(params.get('TgMin')), Number(params.get('TgMax'))] : defaultFilters.Tg,
      Tm: params.has('TmMin') && params.has('TmMax') ? [Number(params.get('TmMin')), Number(params.get('TmMax'))] : defaultFilters.Tm,
      Modulus: params.has('ModMin') && params.has('ModMax') ? [Number(params.get('ModMin')), Number(params.get('ModMax'))] : defaultFilters.Modulus,
      sort: params.get('sort') || defaultFilters.sort,
    });
    
    if(params.get('design') === '1'){
        const basketMonomers = allChemicals.filter(c => c.role === 'Monomer').slice(0,2);
        setBasket(basketMonomers);
    }
  }, [searchParams, allChemicals]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.class.length > 0) params.set('class', filters.class.join(','));
    // ... add other filters to params
    if (filters.sort !== 'relevance') params.set('sort', filters.sort);
    
    const drawerType = searchParams.get('drawer');
    const drawerId = searchParams.get('id');
    if(drawerId && drawerType) {
        params.set('drawer', drawerType);
        params.set('id', drawerId);
    }

    const compareIds = searchParams.get('compare');
    if(compareIds) {
      params.set('compare', compareIds);
    }
    
    router.replace(`${pathname}?${params.toString()}`);
  }, [filters, router, pathname, searchParams]);

  const filteredPolymers = useMemo(() => {
    let items = [...polymers];

    if (filters.q) {
      const lowerCaseQuery = filters.q.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerCaseQuery) ||
          p.monomers.some(m => m.toLowerCase().includes(lowerCaseQuery)) ||
          p.tags.some(t => t.toLowerCase().includes(lowerCaseQuery))
      );
    }

    if (filters.class.length > 0) {
        items = items.filter(p => p.tags.some(t => filters.class.includes(t)));
    }
    
    // Add other filter logic here (process, form, properties)

    return items;
  }, [polymers, filters]);
  
  const activeDetailItem = useMemo(() => {
    const itemId = searchParams.get('id');
    if (searchParams.get('drawer') === 'polymer' && itemId) {
      return polymers.find((item) => item.id === itemId) || null;
    }
    return null;
  }, [searchParams, polymers]);

  const activeAskAiItem = useMemo(() => {
    const itemId = searchParams.get('id');
    if (searchParams.get('drawer') === 'ask' && itemId) {
      return polymers.find((item) => item.id === itemId) || null;
    }
    return null;
  }, [searchParams, polymers]);

  const comparedPolymers = useMemo(() => {
    const compare = searchParams.get('compare');
    const ids = compare ? compare.split(',') : [];
    if (ids.length === 2) {
      const p1 = polymers.find(item => item.id === ids[0]);
      const p2 = polymers.find(item => item.id === ids[1]);
      return [p1, p2].filter(Boolean) as [Polymer, Polymer];
    }
    return null;
  }, [searchParams, polymers]);

  const handleFilterChange = (newFilters: Partial<FilterValues>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleOpenDrawer = (item: Polymer, drawerType: 'polymer' | 'ask') => {
    const params = new URLSearchParams(searchParams);
    params.set('drawer', drawerType);
    params.set('id', item.id);
    if(drawerType === 'ask') params.set('type', 'polymer');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCloseDrawer = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('drawer');
    params.delete('id');
    params.delete('type');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSaveToMemory = (item: Polymer | {id: string, name: string, type: 'polymer', summary: string, tags: string[]}) => {
    if (!memoryItems.find((memItem) => memItem.id === item.id)) {
      setMemoryItems((prev) => [item, ...prev]);
      toast({ title: 'Saved to Memory' });
    } else {
      setMemoryItems(prev => prev.filter(i => i.id !== item.id));
      toast({ title: "Removed from Memory" });
    }
  };
  
  const handleRemoveFromBasket = (item: Chemical) => {
    setBasket(prev => prev.filter(b => b.id !== item.id));
    toast({ title: 'Removed from Basket' });
  };

  const handleCompare = (item: Polymer) => {
    if (!polymerToCompare) {
      setPolymerToCompare(item);
      toast({ title: 'Select another polymer to compare.' });
    } else {
      if(polymerToCompare.id === item.id) {
          setPolymerToCompare(null);
          return;
      };
      const params = new URLSearchParams(searchParams);
      params.set('compare', `${polymerToCompare.id},${item.id}`);
      router.push(`${pathname}?${params.toString()}`);
      setPolymerToCompare(null);
    }
  };

  const cancelCompare = () => {
    setPolymerToCompare(null);
  }

  const handleCloseCompareSheet = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('compare');
    router.push(`${pathname}?${params.toString()}`);
  }
  
  const isSaved = (item: Polymer) => !!memoryItems.find(memItem => memItem.id === item.id);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Polymers</h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse families, filter by properties & process, or design candidates from selected monomers.
          </p>
        </div>
      </div>
      
      {isMobile ? (
         <Button variant="outline" className="w-full" onClick={() => setFilterSheetOpen(true)}>
          <Settings2 className="mr-2 h-4 w-4" />
          Filters ({filteredPolymers.length} results)
        </Button>
      ) : (
        <PolymerFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          resultCount={filteredPolymers.length}
        />
      )}

      <div className="grid grid-cols-12 gap-x-gutter-d gap-y-8">
        <div className="col-span-12 lg:col-span-9">
            {filteredPolymers.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredPolymers.map((polymer) => (
                    <PolymerCard
                    key={polymer.id}
                    polymer={polymer}
                    onDetails={() => handleOpenDrawer(polymer, 'polymer')}
                    onSaveToMemory={() => handleSaveToMemory(polymer)}
                    onAskAi={() => handleOpenDrawer(polymer, 'ask')}
                    onCompare={() => handleCompare(polymer)}
                    isSaved={isSaved(polymer)}
                    />
                ))}
                </div>
            ) : (
                 <div className="flex flex-col h-96 items-center justify-center rounded-lg border-2 border-dashed">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold">No Polymers Found</h3>
                        <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
                        <div className="mt-4 flex gap-2 justify-center">
                            <Button variant="outline" onClick={() => setFilters(defaultFilters)}>Clear all filters</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className="col-span-12 lg:col-span-3">
          <DesignAssistant 
            basket={basket}
            onRemoveFromBasket={handleRemoveFromBasket}
            onSaveHypothesis={handleSaveToMemory}
          />
        </div>
      </div>
      
      <PolymerDetailDrawer
        polymer={activeDetailItem}
        open={!!activeDetailItem}
        onOpenChange={handleCloseDrawer}
        onSaveToMemory={() => activeDetailItem && handleSaveToMemory(activeDetailItem)}
        onAskAi={() => activeDetailItem && handleOpenDrawer(activeDetailItem, 'ask')}
        onCompare={() => activeDetailItem && handleCompare(activeDetailItem)}
        isSaved={!!activeDetailItem && isSaved(activeDetailItem)}
      />

      <AskAiDrawer 
        item={activeAskAiItem} 
        open={!!activeAskAiItem} 
        onOpenChange={handleCloseDrawer}
        onSaveToMemory={() => activeAskAiItem && handleSaveToMemory(activeAskAiItem)}
        isSaved={activeAskAiItem ? isSaved(activeAskAiItem) : false}
      />
      
      <PolymerCompareSheet polymers={comparedPolymers} open={!!comparedPolymers} onOpenChange={handleCloseCompareSheet} />

      <FilterSheet 
        isOpen={isFilterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        filters={filters}
        onFilterChange={handleFilterChange}
        resultCount={filteredPolymers.length}
      />

       {polymerToCompare && (
        <div className="fixed bottom-4 right-4 z-50 bg-background border rounded-lg p-4 shadow-lg flex items-center gap-4">
          <p>Select another polymer to compare with <strong>{polymerToCompare.name}</strong>.</p>
          <Button onClick={cancelCompare} variant="ghost" size="sm">Cancel</Button>
        </div>
      )}
    </div>
  );
}
