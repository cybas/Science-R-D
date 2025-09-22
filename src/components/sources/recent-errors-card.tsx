'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { CrawlError } from '@/lib/sources-data';
import { AlertTriangle } from 'lucide-react';

type RecentErrorsCardProps = {
  errors: CrawlError[];
};

export function RecentErrorsCard({ errors }: RecentErrorsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Errors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {errors.map((error, index) => (
          <div key={index} className="text-xs">
            <p className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-3 w-3 text-yellow-500" />
                <span>{error.time} - {error.source}</span>
            </p>
            <p className="text-muted-foreground pl-5">{error.error}</p>
            <p className="text-blue-600 pl-5">Suggestion: {error.suggestion}</p>
          </div>
        ))}
        <Button variant="link" size="sm" className="w-full">View all logs</Button>
      </CardContent>
    </Card>
  );
}
