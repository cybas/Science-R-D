'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const roles = [
    { role: 'Admin', count: 2, members: 'Jai Singhania, A. Rao' },
    { role: 'Researcher', count: 5, members: 'P. Mehta, (+4 others)' },
    { role: 'IP Analyst', count: 2, members: 'S. Verma, K. Iyer' },
    { role: 'Viewer', count: 3, members: '(+3 others)' },
];

export function RolesSettings() {
  return (
    <Card className="rounded-xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Roles & Permissions</CardTitle>
        <CardDescription>
          Manage user roles and their access levels.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-5">
        <div>
            <h3 className="text-base font-semibold">Assignments</h3>
            <Table className="mt-2">
                <TableHeader>
                    <TableRow>
                        <TableHead>Role</TableHead>
                        <TableHead>Users</TableHead>
                        <TableHead>Assigned</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roles.map(r => (
                        <TableRow key={r.role}>
                            <TableCell className="font-medium">{r.role}</TableCell>
                            <TableCell>{r.count}</TableCell>
                            <TableCell>{r.members}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
         <div>
            <h3 className="text-base font-semibold">Permission Notes</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2 space-y-1">
                <li>IP Analyst can create digests & export but cannot edit Sources.</li>
                <li>Viewer has Ask-AI allowed (daily token cap: 50).</li>
            </ul>
        </div>
      </CardContent>
    </Card>
  );
}
