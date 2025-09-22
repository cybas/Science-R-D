'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const collections = ['All', 'Shortlist', 'Pinned', 'To Read', 'BOPET Alternatives'];
const tags = ['PET', 'Bio-derived', 'Nanocomposites', 'High-Tg', 'Recycling', 'Polyester'];
const recentNotes = [
    {id: '1', text: 'Sorbitol-derived diols are key for raising Tg...'},
    {id: '2', text: 'This nanoclay masterbatch patent seems critical...'},
    {id: '3', text: 'Compare PEF barrier properties with PEN...'},
];

export function MemoryCollections() {
  return (
    <div className="space-y-8">
        <Card>
            <CardContent className="p-0">
                 <Tabs defaultValue="collections">
                    <TabsList className="w-full rounded-b-none rounded-t-lg">
                        <TabsTrigger value="collections" className="flex-1">Collections</TabsTrigger>
                        <TabsTrigger value="tags" className="flex-1">Tags</TabsTrigger>
                    </TabsList>
                    <TabsContent value="collections" className="p-4 m-0">
                        <div className="flex flex-col gap-2">
                            {collections.map(c => <Badge key={c} variant={ c === 'All' ? 'default' : 'secondary'} className="justify-start cursor-pointer py-1 text-sm">{c}</Badge>)}
                        </div>
                    </TabsContent>
                    <TabsContent value="tags" className="p-4 m-0">
                        <Input placeholder="Filter tags..." className="mb-4" />
                        <div className="flex flex-wrap gap-2">
                             {tags.map(t => <Badge key={t} variant="secondary" className="cursor-pointer">{t}</Badge>)}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Recent Notes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {recentNotes.map(note => (
                        <div key={note.id} className="text-sm p-2 bg-muted/50 rounded-md cursor-pointer hover:bg-muted">
                            <p className="truncate">{note.text}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
