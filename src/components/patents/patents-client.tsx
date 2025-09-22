'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { PatentFilters } from './patent-filters';
import { PatentCard } from './patent-card';
import { PatentDetailDrawer } from './patent-detail-drawer';
import { AskAiDrawer } from '@/components/dashboard/ask-ai-drawer';
import { useToast } from '@/hooks/use-toast';
import type { Patent } from '@/lib/data';

type PatentsClientProps = {
  allPatents: Patent[];
  searchParams?: { [key: string]: string | string[] | undefined };
};

const defaultFilters = {
  q: '',
  timeframe: '1y',
  jurisdictions: [],
  assignees: [],
  status: 'all',
  sort: 'relevance',
};

export function PatentsClient({ allPatents, searchParams }: PatentsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [memoryItems, setMemoryItems] = useState<Patent[]>([]);
  
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(searchParams as any);
    return {
      q: params.get('q') || defaultFilters.q,
      timeframe: params.get('timeframe') || defaultFilters.timeframe,
      jurisdictions: params.getAll('jurisdictions') || defaultFilters.jurisdictions,
      assignees: params.getAll('assignees') || defaultFilters.assignees,
      status: params.get('status') || defaultFilters.status,
      sort: params.get('sort') || defaultFilters.sort,
    };
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.timeframe !== defaultFilters.timeframe) params.set('timeframe', filters.timeframe);
    if (filters.status !== defaultFilters.status) params.set('status', filters.status);
    filters.jurisdictions.forEach(j => params.append('jurisdictions', j));
    filters.assignees.forEach(a => params.append('assignees', a));
    // ... other filters
    if (searchParams?.drawer && searchParams?.id) {
        params.set('drawer', searchParams.drawer as string);
        params.set('id', searchParams.id as string);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [filters, router, pathname, searchParams]);

  const filteredPatents = useMemo(() => {
    let items = [...allPatents];

    if (filters.q) {
      const lowerQ = filters.q.toLowerCase();
      items = items.filter(p => p.title.toLowerCase().includes(lowerQ) || p.summary.toLowerCase().includes(lowerQ) || p.assignee.toLowerCase().includes(lowerQ));
    }
    
    if (filters.assignees.length > 0) {
      items = items.filter(p => filters.assignees.some(a => p.assignee.toLowerCase().includes(a.toLowerCase())));
    }

    if (filters.status !== 'all') {
       const isPending = (p: Patent) => new Date(p.date) > new Date();
       if(filters.status === 'pending') items = items.filter(p => isPending(p));
       if(filters.status === 'granted') items = items.filter(p => !isPending(p));
    }

    return items;
  }, [allPatents, filters]);
  
  const activeDetailItem = useMemo(() => {
    const itemId = searchParams?.id as string;
    if (searchParams?.drawer === 'patent' && itemId) {
      return allPatents.find((item) => item.id === itemId) || null;
    }
    return null;
  }, [searchParams, allPatents]);

  const activeAskAiItem = useMemo(() => {
    const itemId = searchParams?.id as string;
    if (searchParams?.drawer === 'ask' && searchParams?.type === 'patent' && itemId) {
      return allPatents.find((item) => item.id === itemId) || null;
    }
    return null;
  }, [searchParams, allPatents]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const handleOpenDrawer = (item: Patent, drawerType: 'patent' | 'ask') => {
    const params = new URLSearchParams(searchParams as any);
    params.set('drawer', drawerType);
    params.set('id', item.id);
    if(drawerType === 'ask') params.set('type', 'patent');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCloseDrawer = () => {
    const params = new URLSearchParams(searchParams as any);
    params.delete('drawer');
    params.delete('id');
    params.delete('type');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSaveToMemory = (item: Patent) => {
     if (!memoryItems.find((memItem) => memItem.id === item.id)) {
      setMemoryItems((prev) => [item, ...prev]);
      toast({ title: 'Saved to Memory' });
    } else {
      setMemoryItems(prev => prev.filter(i => i.id !== item.id));
      toast({ title: 'Removed from Memory' });
    }
  };
  
  const isSaved = (item: Patent) => !!memoryItems.find(memItem => memItem.id === item.id);

  return (
    <>
      <PatentFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        resultCount={filteredPatents.length}
      />
      
      <div className="space-y-6">
        {filteredPatents.length > 0 ? (
          filteredPatents.map(patent => (
            <PatentCard 
              key={patent.id}
              patent={patent}
              onAskAi={() => handleOpenDrawer(patent, 'ask')}
              onSaveToMemory={() => handleSaveToMemory(patent)}
              onDetails={() => handleOpenDrawer(patent, 'patent')}
              isSaved={isSaved(patent)}
            />
          ))
        ) : (
          <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
            <p className="text-muted-foreground">No patents found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

       <PatentDetailDrawer
        patent={activeDetailItem}
        open={!!activeDetailItem}
        onOpenChange={handleCloseDrawer}
        onSaveToMemory={() => activeDetailItem && handleSaveToMemory(activeDetailItem)}
        onAskAi={() => activeDetailItem && handleOpenDrawer(activeDetailItem, 'ask')}
        isSaved={!!activeDetailItem && isSaved(activeDetailItem)}
      />

      <AskAiDrawer 
        item={activeAskAiItem} 
        open={!!activeAskAiItem} 
        onOpenChange={handleCloseDrawer}
        onSaveToMemory={() => activeAskAiItem && handleSaveToMemory(activeAskAiItem as Patent)}
        isSaved={activeAskAiItem ? isSaved(activeAskAiItem) : false}
      />
    </>
  );
}
