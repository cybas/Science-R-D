import { SourcesClient } from '@/components/sources/sources-client';
import { SOURCES_DATA, CRAWL_ERRORS, CRAWL_STATS } from '@/lib/sources-data';

export default function SourcesPage() {
  return <SourcesClient 
    sources={SOURCES_DATA} 
    crawlErrors={CRAWL_ERRORS}
    crawlStats={CRAWL_STATS}
    />;
}
