
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Eye, FileDown, Send } from 'lucide-react';
import type { FeedItem } from '@/lib/data';

type DigestBuilderProps = {
  selectedItems: FeedItem[];
  onPreview: () => void;
  onSchedule: () => void;
};

export function DigestBuilder({ selectedItems, onPreview, onSchedule }: DigestBuilderProps) {
  return (
    <Card className="sticky top-32">
      <CardHeader>
        <CardTitle>Digest Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="digest-title">Title</Label>
          <Input id="digest-title" defaultValue="Weekly Polymer Insights" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="digest-desc">Description</Label>
          <Textarea id="digest-desc" placeholder="Optional summary for your digest..." />
        </div>
        <Separator />
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                 <Label>Include</Label>
                 <Select defaultValue="selected">
                    <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="selected">Selected Items ({selectedItems.length})</SelectItem>
                        <SelectItem value="all">All Filtered Items</SelectItem>
                    </SelectContent>
                 </Select>
            </div>
            <div className="flex items-center justify-between">
                 <Label>Layout</Label>
                 <Select defaultValue="brief">
                    <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="brief">Brief</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                        <SelectItem value="table">Table</SelectItem>
                    </SelectContent>
                 </Select>
            </div>
        </div>
         <Separator />
        <div className="space-y-2">
             <div className="flex items-center justify-between"><Label>Include Header</Label><Switch defaultChecked /></div>
             <div className="flex items-center justify-between"><Label>Include Items</Label><Switch defaultChecked /></div>
             <div className="flex items-center justify-between"><Label>Include Footer</Label><Switch /></div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-stretch">
        <Button onClick={onPreview}><Eye className="mr-2 h-4 w-4" /> Preview</Button>
        <div className="flex gap-2">
        <Button variant="secondary" className="flex-1"><FileDown className="mr-2 h-4 w-4" /> Export</Button>
        <Button variant="secondary" className="flex-1" onClick={onSchedule}><Send className="mr-2 h-4 w-4" /> Schedule</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
