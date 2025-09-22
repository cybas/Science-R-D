'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MemoryFilters } from './memory-filters';
import { MemoryCard } from './memory-card';
import { MemoryCollections } from './memory-collections';
import { AskAiDrawer } from '@/components/dashboard/ask-ai-drawer';
import { useToast } from '@/hooks/use-toast';
import type { FeedItem } from '@/lib/data';

type MemoryClientProps = {
  allItems: FeedItem[];
  searchParams?: { [key: string]: string | string[] | undefined };
};

const defaultFilters = {
  q: '',
  collections: ['all'],
  tags: [],
  type: [],
  access: 'all',
  sort: 'recent',
};

export function MemoryClient({ allItems, searchParams }: MemoryClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [memoryItems, setMemoryItems] = useState<FeedItem[]>(allItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(searchParams as any);
    return {
      q: params.get('q') || defaultFilters.q,
      collections: params.getAll('collections').length ? params.getAll('collections') : defaultFilters.collections,
      tags: params.getAll('tags') || defaultFilters.tags,
      type: params.getAll('type') || defaultFilters.type,
      access: params.get('access') || defaultFilters.access,
      sort: params.get('sort') || defaultFilters.sort,
    };
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.collections.length > 0 && filters.collections[0] !== 'all') filters.collections.forEach(c => params.append('collections', c));
    if (filters.type.length > 0) filters.type.forEach(t => params.append('type', t));
    // ... other filters
    if (searchParams?.drawer && searchParams?.id) {
        params.set('drawer', searchParams.drawer as string);
        params.set('id', searchParams.id as string);
        params.set('type', searchParams.type as string);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [filters, router, pathname, searchParams]);

  const filteredItems = useMemo(() => {
    let items = [...memoryItems];

    if (filters.q) {
      const lowerQ = filters.q.toLowerCase();
      items = items.filter(p => ('title' in p ? p.title : p.name).toLowerCase().includes(lowerQ) || p.summary?.toLowerCase().includes(lowerQ));
    }
    if (filters.type.length > 0) {
      items = items.filter(p => filters.type.includes(p.type));
    }
    if (filters.tags.length > 0) {
        items = items.filter(p => p.tags?.some(t => filters.tags.includes(t)));
    }

    return items;
  }, [memoryItems, filters]);
  
  const activeAskAiItem = useMemo(() => {
    const itemId = searchParams?.id as string;
    const itemType = searchParams?.type as string;
    if (searchParams?.drawer === 'ask' && itemId && itemType) {
      return allItems.find((item) => item.id === itemId && item.type === itemType) || null;
    }
    return null;
  }, [searchParams, allItems]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const handleOpenDrawer = (item: FeedItem, drawerType: 'item' | 'ask') => {
    const params = new URLSearchParams(searchParams as any);
    params.set('drawer', drawerType);
    params.set('id', item.id);
    params.set('type', item.type);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCloseDrawer = () => {
    const params = new URLSearchParams(searchParams as any);
    params.delete('drawer');
    params.delete('id');
    params.delete('type');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleRemoveItem = (itemToRemove: FeedItem) => {
     setMemoryItems(prev => prev.filter(i => i.id !== itemToRemove.id));
     toast({ title: 'Removed from Memory' });
  };

  const handleToggleSelection = (itemId: string, selected: boolean) => {
    setSelectedItems(prev => selected ? [...prev, itemId] : prev.filter(id => id !== itemId));
  };

  return (
    <>
      <MemoryFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        resultCount={filteredItems.length}
        selectionCount={selectedItems.length}
      />
      
      <div className="grid grid-cols-12 gap-x-gutter-d gap-y-8">
        <div className="col-span-12 lg:col-span-8 space-y-6">
            {filteredItems.length > 0 ? (
            filteredItems.map(item => (
                <MemoryCard 
                key={item.id}
                item={item}
                onAskAi={() => handleOpenDrawer(item, 'ask')}
                onOpen={() => handleOpenDrawer(item, 'item')}
                onRemove={() => handleRemoveItem(item)}
                onCompare={item.type === 'polymer' ? () => {} : undefined}
                isSelected={selectedItems.includes(item.id)}
                onToggleSelected={handleToggleSelection}
                />
            ))
            ) : (
            <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">No items found. Try adjusting your filters.</p>
            </div>
            )}
        </div>
        <div className="col-span-12 lg:col-span-4">
            <MemoryCollections />
        </div>
      </div>


      <AskAiDrawer 
        item={activeAskAiItem} 
        open={!!activeAskAiItem} 
        onOpenChange={handleCloseDrawer}
        onSaveToMemory={() => {}} // Item is already in memory
        isSaved={true}
      />
    </>
  );
}
