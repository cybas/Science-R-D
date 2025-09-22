
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ReportFilters } from './report-filters';
import { ReportCard } from './report-card';
import { DigestBuilder } from './digest-builder';
import { PreviewModal } from './preview-modal';
import { ScheduleModal } from './schedule-modal';
import { useToast } from '@/hooks/use-toast';
import type { FeedItem } from '@/lib/data';
import { Plus, Download } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

type ReportsClientProps = {
  allItems: FeedItem[];
  searchParams?: { [key: string]: string | string[] | undefined };
};

const defaultFilters = {
  q: '',
  timeframe: '7d',
  types: [],
  sources: [],
  projects: [],
  tags: [],
  sort: 'relevance',
};

export function ReportsClient({ allItems, searchParams }: ReportsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(searchParams as any);
    return {
      q: params.get('q') || defaultFilters.q,
      timeframe: params.get('timeframe') || defaultFilters.timeframe,
      types: params.getAll('types') || defaultFilters.types,
      sort: params.get('sort') || defaultFilters.sort,
    };
  });

  const isPreviewOpen = searchParams?.modal === 'preview';
  const isScheduleOpen = searchParams?.modal === 'schedule';

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.timeframe !== defaultFilters.timeframe) params.set('timeframe', filters.timeframe);
    if (filters.types.length > 0) filters.types.forEach(t => params.append('types', t));
    
    if (isPreviewOpen) params.set('modal', 'preview');
    if (isScheduleOpen) params.set('modal', 'schedule');

    router.replace(`${pathname}?${params.toString()}`);
  }, [filters, router, pathname, isPreviewOpen, isScheduleOpen]);

  const filteredItems = useMemo(() => {
    let items = [...allItems];
    if (filters.q) {
      const lowerQ = filters.q.toLowerCase();
      items = items.filter(p => ('title' in p ? p.title : p.name).toLowerCase().includes(lowerQ) || ('summary' in p && p.summary?.toLowerCase().includes(lowerQ)));
    }
    if (filters.types.length > 0) {
      items = items.filter(p => filters.types.includes(p.type));
    }
    return items;
  }, [allItems, filters]);
  
  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const setModalOpen = (modal: 'preview' | 'schedule' | null) => {
    const params = new URLSearchParams(searchParams as any);
    if (modal) {
      params.set('modal', modal);
    } else {
      params.delete('modal');
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleToggleSelection = (itemId: string, selected: boolean) => {
    setSelectedItems(prev => selected ? [...prev, itemId] : prev.filter(id => id !== itemId));
  };
  
  const handleScheduleSave = () => {
    setModalOpen(null);
    toast({ title: "Digest Scheduled", description: "Your report will be delivered as configured." });
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Digests</h1>
          <p className="text-muted-foreground">Bundle updates for stakeholders. Export or schedule delivery.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => {}}><Plus className="mr-2 h-4 w-4" /> New Digest</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline"><Download className="mr-2 h-4 w-4" />Export</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>CSV</DropdownMenuItem>
                <DropdownMenuItem>Markdown</DropdownMenuItem>
                <DropdownMenuItem>PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ReportFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        resultCount={filteredItems.length}
      />
      
      <div className="grid grid-cols-12 gap-x-gutter-d gap-y-8">
        <div className="col-span-12 lg:col-span-8 space-y-4">
            {filteredItems.map(item => (
                <ReportCard 
                    key={item.id}
                    item={item}
                    isSelected={selectedItems.includes(item.id)}
                    onToggleSelected={handleToggleSelection}
                />
            ))}
        </div>
        <div className="col-span-12 lg:col-span-4">
          <DigestBuilder 
            selectedItems={allItems.filter(i => selectedItems.includes(i.id))}
            onPreview={() => setModalOpen('preview')}
            onSchedule={() => setModalOpen('schedule')}
          />
        </div>
      </div>

      <PreviewModal isOpen={isPreviewOpen} onOpenChange={() => setModalOpen(null)} />
      <ScheduleModal isOpen={isScheduleOpen} onOpenChange={() => setModalOpen(null)} onSave={handleScheduleSave} />
    </>
  );
}
