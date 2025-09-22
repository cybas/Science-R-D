'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { CrawlStats } from '@/lib/sources-data';

type CrawlHealthCardProps = {
  stats: CrawlStats;
};

export function CrawlHealthCard({ stats }: CrawlHealthCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crawl Health (7d)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Success Rate</span>
          <span className="font-medium">{stats.successRate}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Items/day</span>
          <span className="font-medium">{stats.itemsPerDay}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Avg. Parse Time</span>
          <span className="font-medium">{stats.avgParseTime}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Dedup Rate</span>
          <span className="font-medium">{stats.dedupRate}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
