'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Polymer } from '@/lib/data';

type PolymerCompareSheetProps = {
  polymers: [Polymer, Polymer] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PolymerCompareSheet({ polymers, open, onOpenChange }: PolymerCompareSheetProps) {
  if (!polymers || polymers.length < 2) return null;

  const [p1, p2] = polymers;
  
  const renderDelta = (val1: string, val2: string) => {
    // This is a stub for a more complex comparison logic
    const num1 = parseFloat(val1);
    const num2 = parseFloat(val2);
    if (!isNaN(num1) && !isNaN(num2)) {
      if (num1 > num2) return <span className="text-green-600">(+{Math.abs(num1 - num2).toFixed(1)})</span>;
      if (num2 > num1) return <span className="text-red-600">(-{Math.abs(num1 - num2).toFixed(1)})</span>;
    }
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-4xl p-0" side="bottom">
        <div className="p-6">
          <SheetHeader>
            <SheetTitle>Compare Polymers</SheetTitle>
            <SheetDescription>{p1.name} vs. {p2.name}</SheetDescription>
          </SheetHeader>
        </div>
        <Tabs defaultValue="properties" className="w-full">
          <div className="px-6">
            <TabsList>
              <TabsTrigger value="key-points">Key Points</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="monomers">Monomers/Process</TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div className="p-6">
            <TabsContent value="key-points">
              <div className="grid grid-cols-2 gap-6">
                 <div>
                    <h3 className="font-semibold">{p1.name}</h3>
                    <p className="text-sm mt-2">Notes: {p1.notes || 'N/A'}</p>
                 </div>
                 <div>
                    <h3 className="font-semibold">{p2.name}</h3>
                    <p className="text-sm mt-2">Notes: {p2.notes || 'N/A'}</p>
                 </div>
              </div>
            </TabsContent>
            <TabsContent value="properties">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>{p1.name}</TableHead>
                    <TableHead>{p2.name}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Tg</TableCell>
                    <TableCell>{p1.props.tg}</TableCell>
                    <TableCell>{p2.props.tg} {renderDelta(p1.props.tg, p2.props.tg)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tm</TableCell>
                    <TableCell>{p1.props.tm}</TableCell>
                    <TableCell>{p2.props.tm} {renderDelta(p1.props.tm, p2.props.tm)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Modulus</TableCell>
                    <TableCell>{p1.props.modulus}</TableCell>
                    <TableCell>{p2.props.modulus} {renderDelta(p1.props.modulus, p2.props.modulus)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tensile Strength</TableCell>
                    <TableCell>{p1.props.tensile || 'N/A'}</TableCell>
                    <TableCell>{p2.props.tensile || 'N/A'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="monomers">
               <div className="grid grid-cols-2 gap-6">
                 <div>
                    <h3 className="font-semibold">{p1.name}</h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><strong>Monomers:</strong> {p1.monomers.join(', ')}</p>
                      <p><strong>Process:</strong> {p1.process}</p>
                    </div>
                 </div>
                 <div>
                    <h3 className="font-semibold">{p2.name}</h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><strong>Monomers:</strong> {p2.monomers.join(', ')}</p>
                      <p><strong>Process:</strong> {p2.process}</p>
                    </div>
                 </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
