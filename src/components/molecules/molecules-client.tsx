'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Share2, Settings2 } from 'lucide-react';
import { MoleculeCard } from './molecule-card';
import { MoleculeSearch } from './molecule-search';
import { MoleculeFilters } from './molecule-filters';
import { MoleculeDetailDrawer } from './molecule-detail-drawer';
import { AskAiDrawer } from '@/components/dashboard/ask-ai-drawer';
import { SelectedBasket } from './selected-basket';
import { useToast } from '@/hooks/use-toast';
import type { Chemical, FeedItem } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';
import { MoleculeCompareSheet } from './molecule-compare-sheet';
import { FilterSheet } from './filter-sheet';

type MoleculesClientProps = {
  molecules: Chemical[];
  searchParams?: { [key: string]: string | string[] | undefined };
};

type FilterValues = {
  role: string;
  hazards: string[];
  mw: [number, number];
  mp: [number, number];
  logP: [number, number];
  suppliers: string[];
  sort: string;
};

const defaultFilters: FilterValues = {
  role: 'all',
  hazards: [],
  mw: [0, 1000],
  mp: [-100, 500],
  logP: [-5, 10],
  suppliers: [],
  sort: 'relevance',
};

export function MoleculesClient({ molecules, searchParams: serverSearchParams }: MoleculesClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [mode, setMode] = useState(searchParams.get('mode') || 'similarity');
  const [basket, setBasket] = useState<Chemical[]>([]);
  const [memoryItems, setMemoryItems] = useState<Chemical[]>([]);
  
  const [filters, setFilters] = useState<FilterValues>(() => {
    const params = new URLSearchParams(serverSearchParams as any);
    return {
      role: params.get('role') || defaultFilters.role,
      hazards: params.get('hazard')?.split(',') || defaultFilters.hazards,
      mw: params.get('mwMin') && params.get('mwMax') 
        ? [Number(params.get('mwMin')), Number(params.get('mwMax'))] 
        : defaultFilters.mw,
      mp: params.get('mpMin') && params.get('mpMax')
        ? [Number(params.get('mpMin')), Number(params.get('mpMax'))]
        : defaultFilters.mp,
      logP: params.get('logPMin') && params.get('logPMax')
        ? [Number(params.get('logPMin')), Number(params.get('logPMax'))]
        : defaultFilters.logP,
      suppliers: params.get('suppliers')?.split(',') || defaultFilters.suppliers,
      sort: params.get('sort') || defaultFilters.sort,
    };
  });

  const [isFilterSheetOpen, setFilterSheetOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (mode !== 'similarity') params.set('mode', mode);
    if (filters.role !== 'all') params.set('role', filters.role);
    if (filters.hazards.length > 0) params.set('hazard', filters.hazards.join(','));
    if (filters.mw[0] !== defaultFilters.mw[0] || filters.mw[1] !== defaultFilters.mw[1]) {
        params.set('mwMin', String(filters.mw[0]));
        params.set('mwMax', String(filters.mw[1]));
    }
    // ... other filters
    if (filters.sort !== 'relevance') params.set('sort', filters.sort);

    const drawerType = searchParams.get('drawer');
    const drawerId = searchParams.get('id');
    if (drawerId && drawerType) {
      params.set('drawer', drawerType);
      params.set('id', drawerId);
    }

    const compareIds = searchParams.get('compare');
    if(compareIds) {
      params.set('compare', compareIds);
    }
    
    router.replace(`${pathname}?${params.toString()}`);
  }, [query, mode, filters, router, pathname, searchParams]);

  const filteredMolecules = useMemo(() => {
    let items = [...molecules];

    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      items = items.filter(
        (m) =>
          m.title.toLowerCase().includes(lowerCaseQuery) ||
          m.smiles.toLowerCase().includes(lowerCaseQuery) ||
          m.tags.some(t => t.toLowerCase().includes(lowerCaseQuery))
      );
    }
    
    if (filters.role !== 'all') {
      items = items.filter(m => m.role?.toLowerCase() === filters.role.toLowerCase());
    }

    if (filters.hazards.length > 0) {
      items = items.filter(m => !!m.hazard && filters.hazards.includes(m.hazard));
    }
    
    items = items.filter(m => {
        const mw = parseFloat(m.mw);
        return mw >= filters.mw[0] && mw <= filters.mw[1];
    });

    if (filters.sort === 'mw') {
      items.sort((a, b) => parseFloat(a.mw) - parseFloat(b.mw));
    } else if (filters.sort === 'recent') {
      // Assuming date is "Xd ago" format for simplicity
      const getDateValue = (date: string) => parseInt(date.split('d')[0]);
      items.sort((a, b) => getDateValue(a.date) - getDateValue(b.date));
    }

    return items;
  }, [molecules, query, mode, filters]);

  const activeDetailItem = useMemo(() => {
    const itemId = searchParams.get('id');
    if (searchParams.get('drawer') === 'chem' && itemId) {
      return molecules.find((item) => item.id === itemId) || null;
    }
    return null;
  }, [searchParams, molecules]);

  const activeAskAiItem = useMemo(() => {
    const itemId = searchParams.get('id');
    const itemType = searchParams.get('type');
    if (searchParams.get('drawer') === 'ask' && itemId && itemType === 'chemical') {
      return molecules.find((item) => item.id === itemId) || null;
    }
    return null;
  }, [searchParams, molecules]);

  const getHoveredItem = () => {
    const activeCard = document.querySelector(':hover [data-item-id]');
    if (activeCard) {
        const id = activeCard.getAttribute('data-item-id');
        if(id) {
            return molecules.find(i => i.id === id);
        }
    }
    return undefined;
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const item = getHoveredItem();
      if (!item) return;

      if (event.key.toLowerCase() === 'a') {
        event.preventDefault();
        handleAskAi(item);
      }
      if (event.key.toLowerCase() === 'b') {
        event.preventDefault();
        handleAddToBasket(item);
      }
      if (event.key.toLowerCase() === 's') {
        event.preventDefault();
        handleSaveToMemory(item);
      }
      if (event.key === 'Escape') {
          if (activeDetailItem) handleCloseDetailDrawer();
          if (activeAskAiItem) handleCloseAskAiDrawer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDetailItem, activeAskAiItem, molecules]);

  const handleOpenDetailDrawer = (item: Chemical) => {
    const params = new URLSearchParams(searchParams);
    params.set('drawer', 'chem');
    params.set('id', item.id);
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const handleCloseDetailDrawer = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('drawer');
    params.delete('id');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleAskAi = (item: Chemical) => {
    const params = new URLSearchParams(searchParams);
    params.set('drawer', 'ask');
    params.set('type', 'chemical');
    params.set('id', item.id);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCloseAskAiDrawer = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('drawer');
    params.delete('type');
    params.delete('id');
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleSaveToMemory = (item: Chemical) => {
    if (!memoryItems.find((memItem) => memItem.id === item.id)) {
      setMemoryItems((prev) => [item, ...prev]);
      toast({
        title: 'Saved to Memory',
        description: `${item.title.split('—')[0].trim()} has been added to your memory.`,
      });
    } else {
        setMemoryItems(prev => prev.filter(i => i.id !== item.id));
        toast({ title: "Removed from Memory" });
    }
  };

  const handleAddToBasket = (item: Chemical) => {
    if (!basket.find((basketItem) => basketItem.id === item.id)) {
      setBasket((prev) => [...prev, item]);
      toast({
        title: 'Added to Basket',
        description: `${item.title.split('—')[0].trim()} has been added to the basket.`,
      });
    } else {
      setBasket((prev) => prev.filter((basketItem) => basketItem.id !== item.id));
      toast({ title: 'Removed from Basket' });
    }
  };

  const handleRemoveFromBasket = (item: Chemical) => {
    setBasket((prev) => prev.filter((basketItem) => basketItem.id !== item.id));
    toast({ title: 'Removed from Basket' });
  };
  
  const handleFilterChange = (newFilters: Partial<FilterValues>) => {
    setFilters(prev => ({...prev, ...newFilters}));
  }
  
  const isSaved = (item: FeedItem) => !!memoryItems.find(memItem => memItem.id === item.id);
  const isInBasket = (item: Chemical) => !!basket.find(basketItem => basketItem.id === item.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Molecules</h1>
          <p className="text-muted-foreground">
            Search by name, CAS, or SMILES. Filter by properties and safety to shortlist monomers & reagents.
          </p>
        </div>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Export</span>
        </Button>
      </div>

      <MoleculeSearch query={query} setQuery={setQuery} mode={mode} setMode={setMode} />

      {isMobile ? (
        <Button variant="outline" className="w-full" onClick={() => setFilterSheetOpen(true)}>
          <Settings2 className="mr-2 h-4 w-4" />
          Filters ({filteredMolecules.length} results)
        </Button>
      ) : (
        <MoleculeFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          resultCount={filteredMolecules.length}
        />
      )}

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-9">
          {filteredMolecules.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredMolecules.map((molecule) => (
                <MoleculeCard
                  key={molecule.id}
                  molecule={molecule}
                  onDetails={() => handleOpenDetailDrawer(molecule)}
                  onSaveToMemory={() => handleSaveToMemory(molecule)}
                  onAskAi={() => handleAskAi(molecule)}
                  onAddToBasket={() => handleAddToBasket(molecule)}
                  isSaved={isSaved(molecule)}
                  isInBasket={isInBasket(molecule)}
                />
              ))}
            </div>
            ) : (
              <div className="flex flex-col h-96 items-center justify-center rounded-lg border-2 border-dashed">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">No Results Found</h3>
                  <p className="text-muted-foreground mt-2">Try clearing your filters or pasting a SMILES string.</p>
                  <p className="text-xs text-muted-foreground mt-4">e.g., O=C(O)c1ccc(cc1)C(=O)O for Terephthalic acid</p>
                  <div className="mt-4 flex gap-2 justify-center">
                     <Button variant="outline" onClick={() => setFilters(defaultFilters)}>Clear filters</Button>
                     <Button variant="secondary" onClick={() => {setQuery(''); setFilters({...defaultFilters, role: 'Monomer'})}}>Show all monomers</Button>
                  </div>
                </div>
              </div>
            )}
        </div>
        <div className="col-span-12 lg:col-span-3">
          {!isMobile && <SelectedBasket basket={basket} onRemove={handleRemoveFromBasket} />}
        </div>
      </div>

      <MoleculeDetailDrawer
        molecule={activeDetailItem}
        open={!!activeDetailItem}
        onOpenChange={handleCloseDetailDrawer}
        onSaveToMemory={() => activeDetailItem && handleSaveToMemory(activeDetailItem)}
        onAddToBasket={() => activeDetailItem && handleAddToBasket(activeDetailItem)}
        onAskAi={() => activeDetailItem && handleAskAi(activeDetailItem)}
        isSaved={!!activeDetailItem && isSaved(activeDetailItem)}
        isInBasket={!!activeDetailItem && isInBasket(activeDetailItem)}
      />

      <AskAiDrawer 
        item={activeAskAiItem} 
        open={!!activeAskAiItem} 
        onOpenChange={handleCloseAskAiDrawer}
        onSaveToMemory={() => activeAskAiItem && handleSaveToMemory(activeAskAiItem)}
        isSaved={activeAskAiItem ? isSaved(activeAskAiItem) : false}
      />
      
      {/* Compare Sheet might be needed later, but the prompt does not require wiring it up now */}
      {/* <MoleculeCompareSheet
        molecules={comparedMolecules}
        open={!!comparedMolecules}
        onOpenChange={handleCloseCompareSheet}
      /> */}
      
      {isMobile && <SelectedBasket basket={basket} onRemove={handleRemoveFromBasket} isDrawer />}
      <FilterSheet 
        isOpen={isFilterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        filters={filters}
        onFilterChange={handleFilterChange}
        resultCount={filteredMolecules.length}
      />

    </div>
  );
}
