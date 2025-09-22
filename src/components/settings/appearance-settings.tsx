'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function AppearanceSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the look and feel of the application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label>Theme</Label>
            <Select defaultValue="auto">
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="auto">Auto (system)</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label>Accent Color</Label>
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary border-2 border-primary-foreground ring-2 ring-ring" />
                <Input readOnly defaultValue="Deep Blue (hsl(226, 70%, 40%))" />
            </div>
        </div>
         <div className="space-y-2">
            <Label>Live Preview</Label>
            <div className="p-4 rounded-lg border flex flex-wrap items-center gap-2">
                <Button variant="primary">Ask R&A Ai</Button>
                <Button variant="secondary">Save to Memory</Button>
                <Button variant="link">Subtle Link</Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
