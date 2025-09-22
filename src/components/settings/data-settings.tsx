'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const exports = [
    { date: '2025-09-20', type: 'Memory (CSV)', status: 'Ready'},
    { date: '2025-09-18', type: 'Digest (MD)', status: 'Ready'},
]

export function DataSettings() {
  return (
     <div className="space-y-8">
    <Card className="rounded-xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Data & Exports</CardTitle>
        <CardDescription>
          Manage data retention policies and view export history.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-5">
        <div>
            <h3 className="font-semibold text-base">Retention</h3>
             <div className="space-y-4 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Log Retention</Label>
                        <Select defaultValue="365">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="90">90 days</SelectItem>
                                <SelectItem value="180">180 days</SelectItem>
                                <SelectItem value="365">365 days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Soft-delete Period</Label>
                        <Select defaultValue="30">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7">7 days</SelectItem>
                                <SelectItem value="30">30 days</SelectItem>
                                <SelectItem value="90">90 days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Auto-delete originals</Label>
                    <CardDescription>Automatically delete original source files after a set period.</CardDescription>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
            </div>
        </div>
         <div>
            <h3 className="font-semibold text-base">Exports History</h3>
            <Table className="mt-2">
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {exports.map(e => (
                         <TableRow key={e.date}>
                            <TableCell>{e.date}</TableCell>
                            <TableCell>{e.type}</TableCell>
                            <TableCell><Badge variant="secondary">{e.status}</Badge></TableCell>
                            <TableCell><Button variant="link" className="p-0 h-auto">Download</Button></TableCell>
                         </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
     <Card className="border-destructive rounded-xl shadow-sm">
        <CardHeader>
            <CardTitle className="text-lg">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-medium">Delete Organization</h4>
                    <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
                </div>
                <Button variant="destructive">Delete</Button>
            </div>
        </CardContent>
    </Card>
    </div>
  );
}
