import { MemoryClient } from '@/components/memory/memory-client';
import { DATA } from '@/lib/data';
import type { FeedItem } from '@/lib/data';

// Add a dummy hypothesis item
const HYPOTHESIS_ITEM: FeedItem = {
    id: 'hypothesis-1',
    type: 'hypothesis' as any,
    name: 'PET-PEF copolymer (70/30) targeting Tg ≥ 95 °C',
    summary: 'A hypothetical copolymer of PET and PEF designed to increase the glass transition temperature.',
    tags: ['Hypothesis', 'PET', 'PEF'],
    date: '0d ago',
    source: 'Internal',
    href: '#',
};


export default function MemoryPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  // For this page, we'll just use all the data as if it were "saved"
  const allMemoryItems: FeedItem[] = [...DATA, HYPOTHESIS_ITEM];

  return (
    <div className="space-y-8">
       <header>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Memory</h1>
            <p className="text-muted-foreground">
              Your saved library across molecules, polymers, papers, and patents — with notes, tags, collections, compare, and “hypothesis” items from the Design Assistant.
            </p>
          </div>
        </header>
        <MemoryClient allItems={allMemoryItems} searchParams={searchParams} />
    </div>
  );
}
