'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { PaperFilters } from './paper-filters';
import { PaperCard } from './paper-card';
import { PaperDetailDrawer } from './paper-detail-drawer';
import { AskAiDrawer } from '@/components/dashboard/ask-ai-drawer';
import { DigestModal } from './digest-modal';
import { useToast } from '@/hooks/use-toast';
import type { Paper } from '@/lib/data';

type PaperListProps = {
  allPapers: Paper[];
  searchParams?: { [key: string]: string | string[] | undefined };
};

const defaultFilters = {
  q: '',
  timeframe: '7d',
  journals: [],
  oa: 'all',
  topics: [],
  authors: [],
  sort: 'relevance',
};

export function PaperList({ allPapers, searchParams }: PaperListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [memoryItems, setMemoryItems] = useState<Paper[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDigestModalOpen, setDigestModalOpen] = useState(false);

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(searchParams as any);
    return {
      q: params.get('q') || defaultFilters.q,
      timeframe: params.get('timeframe') || defaultFilters.timeframe,
      journals: params.getAll('journals') || defaultFilters.journals,
      oa: params.get('oa') || defaultFilters.oa,
      topics: params.getAll('topics') || defaultFilters.topics,
      authors: params.getAll('authors') || defaultFilters.authors,
      sort: params.get('sort') || defaultFilters.sort,
    };
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.timeframe !== defaultFilters.timeframe) params.set('timeframe', filters.timeframe);
    if (filters.oa !== defaultFilters.oa) params.set('oa', filters.oa);
    filters.topics.forEach(t => params.append('topics', t));
    // ... other filters
    if (searchParams?.drawer && searchParams?.id) {
        params.set('drawer', searchParams.drawer as string);
        params.set('id', searchParams.id as string);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [filters, router, pathname, searchParams]);

  const filteredPapers = useMemo(() => {
    let items = [...allPapers];

    if (filters.q) {
      const lowerQ = filters.q.toLowerCase();
      items = items.filter(p => p.title.toLowerCase().includes(lowerQ) || p.summary.toLowerCase().includes(lowerQ));
    }
    if (filters.oa !== 'all') {
      items = items.filter(p => p.status.toLowerCase().startsWith(filters.oa));
    }
    if (filters.topics.length > 0) {
      items = items.filter(p => p.tags.some(t => filters.topics.includes(t)));
    }

    return items;
  }, [allPapers, filters]);
  
  const activeDetailItem = useMemo(() => {
    const itemId = searchParams?.id as string;
    if (searchParams?.drawer === 'paper' && itemId) {
      return allPapers.find((item) => item.id === itemId) || null;
    }
    return null;
  }, [searchParams, allPapers]);

  const activeAskAiItem = useMemo(() => {
    const itemId = searchParams?.id as string;
    if (searchParams?.drawer === 'ask' && searchParams?.type === 'paper' && itemId) {
      return allPapers.find((item) => item.id === itemId) || null;
    }
    return null;
  }, [searchParams, allPapers]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const handleOpenDrawer = (item: Paper, drawerType: 'paper' | 'ask') => {
    const params = new URLSearchParams(searchParams as any);
    params.set('drawer', drawerType);
    params.set('id', item.id);
    if(drawerType === 'ask') params.set('type', 'paper');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCloseDrawer = () => {
    const params = new URLSearchParams(searchParams as any);
    params.delete('drawer');
    params.delete('id');
    params.delete('type');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSaveToMemory = (item: Paper) => {
     if (!memoryItems.find((memItem) => memItem.id === item.id)) {
      setMemoryItems((prev) => [item, ...prev]);
      toast({ title: 'Saved to Memory' });
    } else {
      setMemoryItems(prev => prev.filter(i => i.id !== item.id));
      toast({ title: 'Removed from Memory' });
    }
  };

  const handleToggleSelection = (itemId: string, selected: boolean) => {
    setSelectedItems(prev => selected ? [...prev, itemId] : prev.filter(id => id !== itemId));
  };
  
  const isSaved = (item: Paper) => !!memoryItems.find(memItem => memItem.id === item.id);

  return (
    <>
      <PaperFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        resultCount={filteredPapers.length}
        onBulkCreateDigest={() => setDigestModalOpen(true)}
        selectionCount={selectedItems.length}
      />
      
      <div className="space-y-6">
        {filteredPapers.length > 0 ? (
          filteredPapers.map(paper => (
            <PaperCard 
              key={paper.id}
              paper={paper}
              onAskAi={() => handleOpenDrawer(paper, 'ask')}
              onSaveToMemory={() => handleSaveToMemory(paper)}
              onDetails={() => handleOpenDrawer(paper, 'paper')}
              isSaved={isSaved(paper)}
              isSelected={selectedItems.includes(paper.id)}
              onToggleSelected={handleToggleSelection}
            />
          ))
        ) : (
          <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
            <p className="text-muted-foreground">No papers found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

       <PaperDetailDrawer
        paper={activeDetailItem}
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
        onSaveToMemory={() => activeAskAiItem && handleSaveToMemory(activeAskAiItem as Paper)}
        isSaved={activeAskAiItem ? isSaved(activeAskAiItem) : false}
      />
      
      <DigestModal
        isOpen={isDigestModalOpen}
        onOpenChange={setDigestModalOpen}
        itemCount={selectedItems.length || filteredPapers.length}
      />
    </>
  );
}
