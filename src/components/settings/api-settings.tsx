'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const apiKeys = [
    { key: 'ci-build-key', created: '2025-09-15', used: '2d ago', status: 'Active' },
];

const webhooks = [
    { events: 'item.saved, digest.created, crawl.error', url: 'https://hooks.example/ester-rd', status: 'Active' }
]

export function ApiSettings() {
  return (
    <div className="space-y-8">
      <Card className="rounded-xl border-slate-200 shadow-sm">
        <CardHeader className="flex-row items-center justify-between p-5">
            <div>
              <CardTitle className="text-lg">API Keys</CardTitle>
              <CardDescription>Manage API keys for programmatic access.</CardDescription>
            </div>
            <Button>Create API Key</Button>
        </CardHeader>
        <CardContent className="p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((k) => (
                <TableRow key={k.key}>
                  <TableCell className="font-mono">{k.key}</TableCell>
                  <TableCell>{k.created}</TableCell>
                  <TableCell>{k.used}</TableCell>
                  <TableCell><Badge>{k.status}</Badge></TableCell>
                   <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Revoke</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="rounded-xl border-slate-200 shadow-sm">
        <CardHeader  className="flex-row items-center justify-between p-5">
          <div>
            <CardTitle className="text-lg">Webhooks</CardTitle>
            <CardDescription>Configure webhooks to receive events.</CardDescription>
          </div>
          <Button>Add Webhook</Button>
        </CardHeader>
        <CardContent className="space-y-4 p-5">
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Events</TableHead>
                <TableHead>URL</TableHead>
                 <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((w, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-xs">{w.events}</TableCell>
                  <TableCell className="font-mono text-xs">{w.url}</TableCell>
                   <TableCell><Badge>{w.status}</Badge></TableCell>
                   <TableCell>
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent>
                             <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="pt-4">
            <h4 className="font-medium text-sm">Delivery Log</h4>
            <div className="p-3 mt-2 border rounded-lg text-xs font-mono bg-muted/50 h-32 overflow-auto">
                <p>2025-09-22 10:05:01 item.saved → https://hooks.example/ester-rd: 200 OK</p>
                <p>2025-09-22 10:04:15 item.saved → https://hooks.example/ester-rd: 200 OK</p>
                <p>2025-09-22 09:00:00 digest.created → https://hooks.example/ester-rd: 200 OK</p>
                <p>2025-09-21 16:30:44 crawl.error → https://hooks.example/ester-rd: 200 OK</p>
                <p>2025-09-21 15:12:03 item.saved → https://hooks.example/ester-rd: 200 OK</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
