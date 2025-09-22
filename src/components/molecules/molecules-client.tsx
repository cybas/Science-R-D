'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Export, Settings2 } from 'lucide-react';
import { MoleculeCard } from './molecule-card';
import { MoleculeSearch } from './molecule-search';
import { MoleculeFilters } from './molecule-filters';
import { MoleculeDetailDrawer } from './molecule-detail-drawer';
import { SelectedBasket } from './selected-basket';
import { useToast } from '@/hooks/use-toast';
import type { Chemical } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';
import { MoleculeCompareSheet } from './molecule-compare-sheet';
import { FilterSheet } from './filter-sheet';

type MoleculesClientProps = {
  molecules: Chemical[];
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

export function MoleculesClient({ molecules }: MoleculesClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [mode, setMode] = useState(searchParams.get('mode') || 'similarity');
  const [basket, setBasket] = useState<Chemical[]>([]);
  const [memoryItems, setMemoryItems] = useState<Chemical[]>([]);
  const [compareList, setCompareList] = useState<Chemical[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  
  const [filters, setFilters] = useState<FilterValues>(() => {
    const params = new URLSearchParams(searchParams);
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

    const drawerId = searchParams.get('id');
    const drawerType = searchParams.get('drawer');
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
      items = items.filter(m => filters.hazards.includes(m.hazard));
    }
    
    // This is a rough parse, a real implementation would be more robust
    items = items.filter(m => {
        const mw = parseFloat(m.mw);
        return mw >= filters.mw[0] && mw <= filters.mw[1];
    });


    // Sorting
    if (filters.sort === 'mw') {
      items.sort((a, b) => parseFloat(a.mw) - parseFloat(b.mw));
    } else if (filters.sort === 'recent') {
      // Assuming 'date' is like "1d ago" - this is a stub sort
      items.sort((a, b) => parseInt(a.date) - parseInt(b.date));
    }

    return items;
  }, [molecules, query, mode, filters]);

  const activeDrawerItem = useMemo(() => {
    const itemId = searchParams.get('id');
    if (searchParams.get('drawer') === 'chem' && itemId) {
      return molecules.find((item) => item.id === itemId) || null;
    }
    return null;
  }, [searchParams, molecules]);

  const comparedMoleculeIds = useMemo(() => {
    const compare = searchParams.get('compare');
    return compare ? compare.split(',') : [];
  }, [searchParams]);

  const comparedMolecules = useMemo(() => {
    if (comparedMoleculeIds.length >= 2) {
      return comparedMoleculeIds
        .map(id => molecules.find(m => m.id === id))
        .filter(Boolean) as Chemical[];
    }
    return null;
  }, [comparedMoleculeIds, molecules]);

  const handleOpenDrawer = (item: Chemical) => {
    const params = new URLSearchParams(searchParams);
    params.set('drawer', 'chem');
    params.set('id', item.id);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCloseDrawer = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('drawer');
    params.delete('id');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSaveToMemory = (item: Chemical) => {
    if (!memoryItems.find((memItem) => memItem.id === item.id)) {
      setMemoryItems((prev) => [item, ...prev]);
      toast({
        title: 'Saved to Memory',
        description: `${item.title.split('—')[0].trim()} has been added to your memory.`,
      });
    }
  };

  const handleAddToBasket = (item: Chemical) => {
    if (!basket.find((basketItem) => basketItem.id === item.id)) {
      setBasket((prev) => [...prev, item]);
      toast({
        title: 'Added to Basket',
        description: `${item.title.split('—')[0].trim()} has been added to the basket.`,
      });
    }
  };

  const handleRemoveFromBasket = (item: Chemical) => {
    setBasket((prev) => prev.filter((basketItem) => basketItem.id !== item.id));
    toast({ title: 'Removed from Basket' });
  };
  
  const handleCompareToggle = (item: Chemical) => {
    setIsComparing(true);
    setCompareList(prev => {
        const exists = prev.find(i => i.id === item.id);
        let newList;
        if (exists) {
            newList = prev.filter(i => i.id !== item.id);
        } else {
            newList = [...prev, item];
        }

        if (newList.length >= 2) {
            const params = new URLSearchParams(searchParams);
            params.set('compare', newList.map(i => i.id).join(','));
            router.push(`${pathname}?${params.toString()}`);
            setIsComparing(false);
            return [];
        }
        return newList;
    });
  };

  const handleCloseCompareSheet = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('compare');
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleAskAi = (item: Chemical) => {
    // This would open the Ask AI drawer, which is a global component
    // For now, we just log to console
    console.log('Ask AI for:', item.title);
  };
  
  const handleFilterChange = (newFilters: Partial<FilterValues>) => {
    setFilters(prev => ({...prev, ...newFilters}));
  }

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
          <Export className="h-4 w-4" />
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
          <div className="space-y-4">
            {filteredMolecules.length > 0 ? (
              filteredMolecules.map((molecule) => (
                <MoleculeCard
                  key={molecule.id}
                  molecule={molecule}
                  onDetails={() => handleOpenDrawer(molecule)}
                  onSaveToMemory={() => handleSaveToMemory(molecule)}
                  onAskAi={() => handleAskAi(molecule)}
                  onAddToBasket={() => handleAddToBasket(molecule)}
                  onCompare={() => handleCompareToggle(molecule)}
                  isComparing={isComparing}
                  isSelectedForCompare={!!compareList.find(c => c.id === molecule.id)}
                />
              ))
            ) : (
              <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
                <div className="text-center">
                  <p className="text-muted-foreground">No results found.</p>
                  <div className="mt-4 flex gap-2 justify-center">
                     <Button variant="outline" onClick={() => setFilters(defaultFilters)}>Clear filters</Button>
                     <Button variant="secondary" onClick={() => {setQuery(''); setFilters({...defaultFilters, role: 'Monomer'})}}>Show all monomers</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          {!isMobile && <SelectedBasket basket={basket} onRemove={handleRemoveFromBasket} />}
        </div>
      </div>

      <MoleculeDetailDrawer
        molecule={activeDrawerItem}
        open={!!activeDrawerItem}
        onOpenChange={handleCloseDrawer}
      />
      
      <MoleculeCompareSheet
        molecules={comparedMolecules}
        open={!!comparedMolecules}
        onOpenChange={handleCloseCompareSheet}
      />

      {isComparing && (
        <div className="fixed bottom-4 right-4 z-50 bg-background border rounded-lg p-4 shadow-lg flex items-center gap-4">
          <p>Select {3 - compareList.length} more molecules to compare.</p>
          <Button variant="ghost" onClick={() => { setIsComparing(false); setCompareList([]); }}>Cancel</Button>
        </div>
      )}
      
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
