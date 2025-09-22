
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ExperimentFilters } from './experiment-filters';
import { ExperimentCard } from './experiment-card';
import { RunComposer } from './run-composer';
import type { Experiment } from '@/lib/experiments-data';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

type ExperimentsClientProps = {
  allExperiments: Experiment[];
  searchParams?: { [key: string]: string | string[] | undefined };
};

const defaultFilters = {
  q: '',
  status: 'all',
  process: [],
  owner: 'all',
  projects: [],
  tags: [],
  timeframe: 'all',
  sort: 'recent',
};

export function ExperimentsClient({
  allExperiments,
  searchParams,
}: ExperimentsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [experiments, setExperiments] = useState<Experiment[]>(allExperiments);

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(searchParams as any);
    return {
      q: params.get('q') || defaultFilters.q,
      status: params.get('status') || defaultFilters.status,
      process: params.getAll('process') || defaultFilters.process,
      owner: params.get('owner') || defaultFilters.owner,
      projects: params.getAll('projects') || defaultFilters.projects,
      tags: params.getAll('tags') || defaultFilters.tags,
      timeframe: params.get('timeframe') || defaultFilters.timeframe,
      sort: params.get('sort') || defaultFilters.sort,
    };
  });

  const isNewRunModalOpen = searchParams?.modal === 'new';

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.status !== 'all') params.set('status', filters.status);
    if (isNewRunModalOpen) params.set('modal', 'new');
    
    // Add other filters to params
    
    router.replace(`${pathname}?${params.toString()}`);
  }, [filters, router, pathname, isNewRunModalOpen]);

  const filteredExperiments = useMemo(() => {
    let items = [...experiments];
    if (filters.q) {
      const lowerQ = filters.q.toLowerCase();
      items = items.filter(
        (p) =>
          p.runId.toLowerCase().includes(lowerQ) ||
          p.tags.some((t) => t.toLowerCase().includes(lowerQ))
      );
    }
    if (filters.status !== 'all') {
      items = items.filter((p) => p.status.toLowerCase() === filters.status);
    }
    return items;
  }, [experiments, filters]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };
  
  const handleCreateRun = (newRunData: any) => {
      // Logic to create new run
      toast({ title: "Run Created", description: `Experiment ${newRunData.runId} has been planned.` });
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Experiments</h1>
          <p className="text-muted-foreground">
            Record polymerization recipes, conditions, and outcomes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => {}}>
            <Plus className="mr-2 h-4 w-4" />
            New Run
          </Button>
          <Button variant="outline">Import</Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <ExperimentFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        resultCount={filteredExperiments.length}
      />
        
      <div className="grid grid-cols-12 gap-x-gutter-d gap-y-8">
        <div className="col-span-12 lg:col-span-8 space-y-4">
            {filteredExperiments.map(exp => <ExperimentCard key={exp.id} experiment={exp} />)}
        </div>
        <div className="col-span-12 lg:col-span-4">
            <RunComposer />
        </div>
      </div>
    </>
  );
}
