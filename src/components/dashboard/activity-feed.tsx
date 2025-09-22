'use client';

import React, { useState, useEffect } from 'react';
import { ActivityCard } from './activity-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { FeedItem, Chemical, Polymer } from '@/lib/data';

type ActivityFeedProps = {
  items: FeedItem[];
  onAskAi: (item: FeedItem) => void;
  onSaveToMemory: (item: FeedItem) => void;
  onAddToBasket: (item: Chemical) => void;
  onCompare: (item: Polymer) => void;
  polymerToCompare: Polymer | null;
  memoryItems: FeedItem[];
  basket: Chemical[];
};

export function ActivityFeed({ 
  items, 
  onAskAi, 
  onSaveToMemory, 
  onAddToBasket,
  onCompare,
  polymerToCompare,
  memoryItems,
  basket
}: ActivityFeedProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground">No results. Loosen filters or extend timeframe.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <ActivityCard
          key={item.id}
          item={item}
          onAskAi={onAskAi}
          onSaveToMemory={onSaveToMemory}
          onAddToBasket={onAddToBasket}
          onCompare={onCompare}
          isComparing={!!polymerToCompare}
          isSaved={!!memoryItems.find(m => m.id === item.id)}
          isInBasket={item.type === 'chemical' && !!basket.find(b => b.id === item.id)}
        />
      ))}
    </div>
  );
}
