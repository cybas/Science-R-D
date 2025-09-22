'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { WelcomeCard } from '@/components/dashboard/welcome-card';
import { FilterBar } from '@/components/dashboard/filter-bar';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { Workbench } from '@/components/dashboard/workbench';
import { AskAiDrawer } from '@/components/dashboard/ask-ai-drawer';
import { PolymerCompareSheet } from '@/components/dashboard/polymer-compare-sheet';
import { useToast } from '@/hooks/use-toast';
import type { FeedItem, Chemical, Polymer } from '@/lib/data';

type DashboardClientProps = {
  initialItems: FeedItem[];
};

export function DashboardClient({ initialItems }: DashboardClientProps) {
  const [items, setItems] = useState<FeedItem[]>(initialItems);
  const [memoryItems, setMemoryItems] = useState<FeedItem[]>([]);
  const [basket, setBasket] = useState<Chemical[]>([]);
  const [keywordFilters, setKeywordFilters] = useState<string[]>([]);
  
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeDrawerItem = useMemo(() => {
    const itemId = searchParams.get('id');
    const itemType = searchParams.get('type');
    if (searchParams.get('drawer') === 'ask' && itemId && itemType) {
      return items.find(item => item.id === itemId && item.type === itemType) || null;
    }
    return null;
  }, [searchParams, items]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'a') {
        const activeCard = document.querySelector(':hover [data-item-id]');
        if (activeCard) {
            event.preventDefault();
            const id = activeCard.getAttribute('data-item-id');
            const type = activeCard.getAttribute('data-item-type');
            if(id && type) {
                const item = items.find(i => i.id === id && i.type === type);
                if (item) handleOpenDrawer(item);
            }
        }
      }
      if (event.key === 'Escape' && activeDrawerItem) {
          handleCloseDrawer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDrawerItem, items]);

  const comparedPolymerIds = useMemo(() => {
    const compare = searchParams.get('compare');
    return compare ? compare.split(',') : [];
  }, [searchParams]);

  const [polymerToCompare, setPolymerToCompare] = useState<Polymer | null>(null);

  const comparedPolymers = useMemo(() => {
    if (comparedPolymerIds.length === 2) {
      const p1 = items.find(item => item.id === comparedPolymerIds[0] && item.type === 'polymer');
      const p2 = items.find(item => item.id === comparedPolymerIds[1] && item.type === 'polymer');
      return [p1, p2].filter(Boolean) as [Polymer, Polymer];
    }
    return null;
  }, [comparedPolymerIds, items]);

  const handleKeywordFilterToggle = (keyword: string) => {
    setKeywordFilters(prev =>
      prev.includes(keyword) ? prev.filter(k => k !== keyword) : [...prev, keyword]
    );
  };
  
  const filteredItems = useMemo(() => {
    if (keywordFilters.length === 0) return items;
    return items.filter(item => 
      keywordFilters.every(kw => item.tags.some(tag => tag.toLowerCase().includes(kw.toLowerCase())))
    );
  }, [items, keywordFilters]);


  const handleOpenDrawer = (item: FeedItem) => {
    const params = new URLSearchParams(searchParams);
    params.set('drawer', 'ask');
    params.set('type', item.type);
    params.set('id', item.id);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCloseDrawer = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('drawer');
    params.delete('type');
    params.delete('id');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSaveToMemory = (item: FeedItem) => {
    const alreadyExists = memoryItems.find(memItem => memItem.id === item.id);
    if (!alreadyExists) {
      setMemoryItems(prev => [item, ...prev]);
      toast({ title: "Saved to Memory", description: `${item.title || (item as Polymer).name} has been added to your memory.` });
    } else {
        toast({ title: "Already in Memory" });
    }
  };

  const handleRemoveFromMemory = (item: FeedItem) => {
    setMemoryItems(prev => prev.filter(memItem => memItem.id !== item.id));
    toast({ title: "Removed from Memory" });
  }

  const handleAddToBasket = (item: Chemical) => {
    if (!basket.find(basketItem => basketItem.id === item.id)) {
      setBasket(prev => [...prev, item]);
      toast({ title: "Added to Basket", description: `${item.title.split('—')[0].trim()} has been added to the basket.` });
    } else {
      setBasket(prev => prev.filter(basketItem => basketItem.id !== item.id));
      toast({ title: "Removed from Basket" });
    }
  };
  
  const handleRemoveFromBasket = (item: Chemical) => {
    setBasket(prev => prev.filter(basketItem => basketItem.id !== item.id));
    toast({ title: "Removed from Basket" });
  };

  const handleCompare = (item: Polymer) => {
    if (!polymerToCompare) {
      setPolymerToCompare(item);
    } else {
      if(polymerToCompare.id === item.id) return;
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

  const isSaved = (item: FeedItem) => !!memoryItems.find(memItem => memItem.id === item.id);

  return (
    <div className="space-y-8">
      <WelcomeCard />
      <FilterBar resultCount={filteredItems.length} keywordFilters={keywordFilters} onKeywordFilterToggle={handleKeywordFilterToggle} />
      <div className="grid grid-cols-12 gap-x-gutter-d gap-y-8">
        <div className="col-span-12 lg:col-span-8">
          <ActivityFeed
            items={filteredItems}
            onAskAi={handleOpenDrawer}
            onSaveToMemory={handleSaveToMemory}
            onAddToBasket={handleAddToBasket}
            onCompare={handleCompare}
            polymerToCompare={polymerToCompare}
            memoryItems={memoryItems}
            basket={basket}
          />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <Workbench 
            basket={basket} 
            onRemoveFromBasket={handleRemoveFromBasket} 
            memoryItems={memoryItems}
            onRemoveFromMemory={handleRemoveFromMemory}
          />
        </div>
      </div>
      <AskAiDrawer 
        item={activeDrawerItem} 
        open={!!activeDrawerItem} 
        onOpenChange={handleCloseDrawer}
        onSaveToMemory={handleSaveToMemory}
        isSaved={activeDrawerItem ? isSaved(activeDrawerItem) : false}
      />
      <PolymerCompareSheet polymers={comparedPolymers} open={!!comparedPolymers} onOpenChange={handleCloseCompareSheet} />
      {polymerToCompare && (
        <div className="fixed bottom-4 right-4 z-50 bg-background border rounded-lg p-4 shadow-lg flex items-center gap-4">
          <p>Select another polymer to compare with <strong>{polymerToCompare.name}</strong>.</p>
          <button onClick={cancelCompare} className="text-sm font-semibold text-primary">Cancel</button>
        </div>
      )}
    </div>
  );
}
