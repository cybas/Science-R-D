'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import type { Source } from '@/lib/sources-data';
import { MoreHorizontal, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type SourceTableProps = {
  sources: Source[];
  onEdit: (source: Source) => void;
};

const healthIcons = {
    OK: <CheckCircle className="h-4 w-4 text-green-500" />,
    Warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
    Error: <XCircle className="h-4 w-4 text-red-500" />,
    'Bridge needed': <Clock className="h-4 w-4 text-gray-500" />,
};

export function SourceTable({ sources, onEdit }: SourceTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configured Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"><Checkbox /></TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead>Items (7d)</TableHead>
              <TableHead>Health</TableHead>
              <TableHead>Scope</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sources.map((source) => (
              <TableRow key={source.id}>
                <TableCell><Checkbox /></TableCell>
                <TableCell className="font-medium">{source.name}</TableCell>
                <TableCell>{source.type}</TableCell>
                <TableCell>{source.schedule}</TableCell>
                <TableCell>{source.lastRun}</TableCell>
                <TableCell>{source.itemsLast7d}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {healthIcons[source.health]}
                    <span>{source.health}</span>
                  </div>
                </TableCell>
                <TableCell>
                    <div className="flex flex-wrap gap-1">
                        {source.scope.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                    </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => onEdit(source)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Pause</DropdownMenuItem>
                      <DropdownMenuItem>Fetch Now</DropdownMenuItem>
                      <DropdownMenuItem>View Logs</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="text-sm text-muted-foreground">Showing 1-10 of 10 sources</div>
        <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
