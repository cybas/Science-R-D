
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Bookmark, Folder, Copy, MoreVertical, Paperclip, FlaskConical, Tag } from 'lucide-react';
import type { Experiment } from '@/lib/experiments-data';

type ExperimentCardProps = {
  experiment: Experiment;
};

const statusColors = {
    Planned: 'bg-blue-100 text-blue-800',
    Running: 'bg-yellow-100 text-yellow-800 animate-pulse',
    Completed: 'bg-green-100 text-green-800',
    Failed: 'bg-red-100 text-red-800',
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {

  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-base font-semibold leading-tight">
              {experiment.runId}
            </CardTitle>
            <Badge className={statusColors[experiment.status]}>{experiment.status}</Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            {experiment.date} by {experiment.owner}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <h4 className="font-medium mb-1">Inputs</h4>
            <div className="flex flex-wrap gap-1">
                {experiment.inputs.map(input => (
                    <Badge key={input.name} variant="secondary">{input.name}</Badge>
                ))}
            </div>
          </div>
           <div>
            <h4 className="font-medium mb-1">Conditions</h4>
            <p className="text-muted-foreground">Temp: {experiment.conditions.temperature}, Time: {experiment.conditions.time}</p>
          </div>
        </div>
        <div>
            <h4 className="font-medium mb-1">Results</h4>
            {experiment.results ? (
                 <div className="flex gap-4 text-xs">
                    <span>Yield: {experiment.results.yield}</span>
                    {experiment.results.iv && <span>IV: {experiment.results.iv}</span>}
                    {experiment.results.tg && <span>Tg: {experiment.results.tg}</span>}
                 </div>
            ): (
                 <p className="text-xs text-muted-foreground">Targets: Tg {experiment.targets.tg || 'N/A'}</p>
            )}
        </div>
      </CardContent>
      <CardFooter className="p-2 border-t flex justify-between items-center">
         <div className="flex items-center gap-2">
            <Button variant="primary" size="sm"><MessageSquare /> Ask AI</Button>
            <Button variant="secondary" size="sm"><Bookmark /> Save</Button>
            <Button variant="secondary" size="sm"><Folder /> Open</Button>
         </div>
         <div className="flex items-center gap-2">
            {experiment.attachments && <Button variant="ghost" size="icon-sm"><Paperclip /> <span className="sr-only">Attachments</span></Button>}
            <Button variant="ghost" size="icon-sm"><FlaskConical /> <span className="sr-only">Process</span></Button>
            <Button variant="ghost" size="icon-sm"><Tag /> <span className="sr-only">Tags</span></Button>
            <Button variant="ghost" size="icon-sm"><Copy /> <span className="sr-only">Duplicate</span></Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm"><MoreVertical /></Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
         </div>
      </CardFooter>
    </Card>
  );
}
// This needs to import DropdownMenu components to work fully, but it's a stub
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
