'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Chemical } from '@/lib/data';
import { BrainCircuit } from 'lucide-react';

type MoleculeCompareSheetProps = {
  molecules: Chemical[] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MoleculeCompareSheet({ molecules, open, onOpenChange }: MoleculeCompareSheetProps) {
  if (!molecules || molecules.length < 2) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-5xl p-0" side="bottom">
        <div className="p-6">
          <SheetHeader>
            <SheetTitle>Compare Molecules</SheetTitle>
            <SheetDescription>
              {molecules.map(m => m.title.split('—')[0].trim()).join(' vs. ')}
            </SheetDescription>
          </SheetHeader>
        </div>
        <Tabs defaultValue="key-specs" className="w-full">
          <div className="px-6">
            <TabsList>
              <TabsTrigger value="key-specs">Key Specs</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div className="p-6 max-h-[60vh] overflow-auto">
            <TabsContent value="key-specs">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    {molecules.map(m => <TableHead key={m.id}>{m.title.split('—')[0].trim()}</TableHead>)}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">CAS</TableCell>
                    {molecules.map(m => <TableCell key={m.id}>{m.title.split('—')[1].trim()}</TableCell>)}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Role</TableCell>
                    {molecules.map(m => <TableCell key={m.id}>{m.role}</TableCell>)}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Formula</TableCell>
                    {molecules.map(m => <TableCell key={m.id}>{m.formula}</TableCell>)}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">MW</TableCell>
                    {molecules.map(m => <TableCell key={m.id}>{m.mw}</TableCell>)}
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="properties">
              {/* This would be populated with real data */}
              <p className="text-sm text-muted-foreground">Property data not available for comparison.</p>
            </TabsContent>
            <TabsContent value="safety">
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Molecule</TableHead>
                    <TableHead>GHS Hazard</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {molecules.map(m => (
                        <TableRow key={m.id}>
                            <TableCell className="font-medium">{m.title.split('—')[0].trim()}</TableCell>
                            <TableCell>{m.hazard || 'N/A'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </div>
           <SheetFooter className="p-4 bg-background border-t">
            <Button>
                <BrainCircuit className="mr-2 h-4 w-4" /> Generate Summary
            </Button>
          </SheetFooter>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
