'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import type { Chemical } from '@/lib/data';

const processFilters = [
  'Step-growth',
  'Chain-growth',
  'ROP',
  'ATRP',
  'RAFT',
  'Anionic',
  'Cationic',
  'Polycondensation',
];

type WorkbenchProps = {
  basket: Chemical[];
  onRemoveFromBasket: (item: Chemical) => void;
  memoryItems: any[];
  onRemoveFromMemory: (item: any) => void;
};

export function Workbench({ basket, onRemoveFromBasket, memoryItems, onRemoveFromMemory }: WorkbenchProps) {
  return (
    <Tabs defaultValue="workbench" className="sticky top-[152px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="workbench">Workbench</TabsTrigger>
        <TabsTrigger value="memory">Memory</TabsTrigger>
      </TabsList>
      <TabsContent value="workbench">
        <Card>
          <CardHeader>
            <CardTitle>Workbench</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Structure Search</h3>
              <Input placeholder="Name / CAS / SMILES" />
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  Similarity
                </Button>
                <Button variant="secondary" size="sm">
                  Substructure
                </Button>
                <Button variant="secondary" size="sm">
                  Exact
                </Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-semibold">Property Targets</h3>
              <div className="space-y-2">
                <label className="text-sm">Tg: -50 to 300 °C</label>
                <Slider defaultValue={[-50, 300]} min={-50} max={300} step={10} />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Tm: 50 to 400 °C</label>
                <Slider defaultValue={[50, 400]} min={50} max={400} step={10} />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Modulus: 0.1 to 20 GPa</label>
                <Slider defaultValue={[0.1, 20]} min={0.1} max={20} step={0.1} />
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="font-semibold">Process Filters</h3>
              <div className="flex flex-wrap gap-2">
                {processFilters.map((filter) => (
                  <Badge key={filter} variant="secondary" className="cursor-pointer">
                    {filter}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Separator />
            <div className="w-full space-y-2">
              <h3 className="font-semibold">Basket</h3>
              {basket.length > 0 ? (
                <>
                  <ScrollArea className="h-40">
                    <div className="space-y-2">
                      {basket.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/50">
                          <span>{item.title.split('—')[0].trim()}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            aria-label="Remove from basket"
                            onClick={() => onRemoveFromBasket(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <Button asChild className="w-full">
                    <Link href="/polymers?design=1">Design Polymer</Link>
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Chemicals added to the basket will appear here.</p>
              )}
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="memory">
        <Card>
          <CardHeader>
            <CardTitle>Memory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Find in Memory..." />
            <div className="flex gap-2">
              <Badge variant="default">All</Badge>
              <Badge variant="secondary">Shortlist</Badge>
              <Badge variant="secondary">Notes</Badge>
            </div>
            <ScrollArea className="h-[calc(100vh-450px)]">
              {memoryItems.length > 0 ? (
                 <div className="space-y-2">
                    {memoryItems.map((item: any) => (
                      <Card key={item.id} className="p-3">
                        <p className="font-semibold text-sm truncate">{item.title || item.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.summary || `ID: ${item.id}`}</p>
                        <div className="mt-2 flex gap-2">
                           <Button variant="secondary" size="sm">Open</Button>
                           <Button variant="secondary" size="sm">Compare</Button>
                           <Button variant="ghost" size="sm" onClick={() => onRemoveFromMemory(item)}>Remove</Button>
                        </div>
                      </Card>
                    ))}
                 </div>
              ) : (
                <div className="flex h-60 items-center justify-center rounded-md border-2 border-dashed">
                    <p className="text-center text-sm text-muted-foreground">Saved items will appear here.</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
