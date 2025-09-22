'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { Source } from '@/lib/sources-data';
import { useState, useEffect } from 'react';
import { getPresetConfig } from './source-presets';

type AddSourceDrawerProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (source: any) => void;
  source: Source | null;
  preset: string | null;
};

export function AddSourceDrawer({ isOpen, onOpenChange, onSave, source, preset }: AddSourceDrawerProps) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (source) {
      setFormData(source);
    } else if (preset) {
      setFormData(getPresetConfig(preset));
    } else {
      setFormData(getPresetConfig('User-Added Website'));
    }
  }, [source, preset, isOpen]);

  const handleSave = () => {
    onSave(formData);
  };
  
  const renderGeneralFields = () => (
     <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Name</Label>
                <Input value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
             <div className="space-y-2">
                <Label>Type</Label>
                <Input value={formData.type || ''} readOnly />
            </div>
        </div>
         {formData.url !== undefined && (
            <div className="space-y-2">
                <Label>URL</Label>
                <Input value={formData.url || ''} onChange={e => setFormData({...formData, url: e.target.value})} />
            </div>
         )}
          {formData.provider !== undefined && (
            <div className="space-y-2">
                <Label>Provider</Label>
                <Input value={formData.provider || ''} readOnly />
            </div>
         )}
         {formData.query !== undefined && (
            <div className="space-y-2">
                <Label>Query Template</Label>
                <Textarea value={formData.query || ''} onChange={e => setFormData({...formData, query: e.target.value})} />
            </div>
         )}
         <div className="space-y-2">
            <Label>Scope</Label>
            <Input value={formData.scope?.join(', ') || ''} onChange={e => setFormData({...formData, scope: e.target.value.split(',').map(s => s.trim())})} />
        </div>
        <div className="space-y-2">
            <Label>Schedule</Label>
            <Select value={formData.schedule || ''} onValueChange={value => setFormData({...formData, schedule: value})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Hourly">Hourly</SelectItem>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                </SelectContent>
            </Select>
        </div>
     </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl p-0 flex flex-col">
        <SheetHeader className="p-6">
          <SheetTitle>{source ? 'Edit Source' : 'Add Source'}</SheetTitle>
          <SheetDescription>{formData.description || 'Configure a new data source.'}</SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="general" className="w-full flex-1 flex flex-col min-h-0">
          <div className="px-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <div className="p-6 text-sm">
              <TabsContent value="general">
                {renderGeneralFields()}
              </TabsContent>
              <TabsContent value="rules">
                <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                        <Label>Use Selected Keywords from Settings</Label>
                        <Switch checked={formData.autoSave} onCheckedChange={checked => setFormData({...formData, autoSave: checked})} />
                    </div>
                    {/* More rules would go here */}
                </div>
              </TabsContent>
              <TabsContent value="test">
                <p className="text-muted-foreground text-center py-8">
                  Click "Run Test" to see a sample of items this source would find.
                </p>
                <div className="text-center">
                    <Button>Run Test</Button>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
        
        <SheetFooter className="p-4 bg-background border-t">
            <div className="flex justify-end gap-2 w-full">
                <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save Source</Button>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
