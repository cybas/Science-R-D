'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SourceTable } from './source-table';
import { AddSourceDrawer } from './add-source-drawer';
import { CrawlHealthCard } from './crawl-health-card';
import { RecentErrorsCard } from './recent-errors-card';
import type { Source, CrawlError, CrawlStats } from '@/lib/sources-data';
import { Plus, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type SourcesClientProps = {
  sources: Source[];
  crawlErrors: CrawlError[];
  crawlStats: CrawlStats;
};

export function SourcesClient({ sources, crawlErrors, crawlStats }: SourcesClientProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<Source | null>(null);
  const [preset, setPreset] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddSource = (presetType: string | null = null) => {
    setPreset(presetType);
    setEditingSource(null);
    setDrawerOpen(true);
  };
  
  const handleEditSource = (source: Source) => {
    setPreset(null);
    setEditingSource(source);
    setDrawerOpen(true);
  };

  const handleSaveSource = (sourceData: any) => {
    // In a real app, this would be an API call
    console.log('Saving source:', sourceData);
    toast({
      title: editingSource ? 'Source Updated' : 'Source Added',
      description: `The source configuration for "${sourceData.name}" has been saved.`,
    });
    setDrawerOpen(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Sources</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sources</h1>
            <p className="text-muted-foreground">Manage data connectors for your R&D workspace.</p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Presets <ChevronDown className="ml-2 h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleAddSource('PubChem')}>PubChem (API)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddSource('PoLyInfo')}>PoLyInfo (Domain)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddSource('OpenAlex')}>OpenAlex (API)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddSource('The Lens')}>The Lens (API)</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleAddSource('Company Website')}>Company Website (Domain)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddSource('Journal')}>Journal/Publisher (RSS)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddSource('ArXiv')}>ArXiv RSS (Preprints)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddSource('Google Alerts')}>Google Alerts (Email Bridge)</DropdownMenuItem>
                 <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleAddSource('User-Added Website')}>User-Added Website (Domain)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddSource('Whitepapers')}>Whitepapers (Upload)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => handleAddSource(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add Source
            </Button>
            <Button variant="outline">Import CSV</Button>
            <Button variant="outline">Export</Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-x-gutter-d gap-y-8">
        <div className="col-span-12 lg:col-span-9">
          <SourceTable sources={sources} onEdit={handleEditSource} />
        </div>
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <CrawlHealthCard stats={crawlStats} />
          <RecentErrorsCard errors={crawlErrors} />
        </div>
      </div>

      <AddSourceDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setDrawerOpen}
        onSave={handleSaveSource}
        source={editingSource}
        preset={preset}
      />
    </div>
  );
}
