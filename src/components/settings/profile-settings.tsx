'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export function ProfileSettings() {
  return (
    <div className="space-y-8">
      <Card className="rounded-xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">User Profile</CardTitle>
          <CardDescription>
            Manage your personal information.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-5">
            <div className="flex items-center justify-between">
              <Label className="min-w-[160px]">Full Name</Label>
              <Input id="fullName" defaultValue="Jai Singhania" className="flex-1"/>
            </div>
            <div className="flex items-center justify-between">
              <Label className="min-w-[160px]">Email</Label>
              <Input id="email" defaultValue="jai@ester.example" readOnly className="flex-1" />
            </div>
            <div className="flex items-center justify-between">
              <Label className="min-w-[160px]">Title</Label>
              <Input id="title" defaultValue="R&D Lead" className="flex-1"/>
            </div>
            <div className="flex items-center justify-between">
              <Label className="min-w-[160px]">Department</Label>
              <Input id="department" defaultValue="Polyesters" className="flex-1"/>
            </div>
             <div className="flex items-center justify-between">
              <Label className="min-w-[160px]">Locale</Label>
               <Select defaultValue="en-IN">
                <SelectTrigger id="locale" className="flex-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="en-IN">English (India)</SelectItem>
                    <SelectItem value="en-US">English (United States)</SelectItem>
                </SelectContent>
               </Select>
            </div>
             <div className="flex items-center justify-between">
              <Label className="min-w-[160px]">Timezone</Label>
               <Select defaultValue="Asia/Kolkata">
                <SelectTrigger id="timezone" className="flex-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                     <SelectItem value="America/New_York">America/New York (GMT-4:00)</SelectItem>
                </SelectContent>
               </Select>
            </div>
        </CardContent>
      </Card>
      <Card className="rounded-xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Security</CardTitle>
          <CardDescription>Manage your security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-5">
           <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label>Multi-Factor Authentication (MFA)</Label>
                <CardDescription>
                  Requires a second factor to sign in.
                </CardDescription>
              </div>
              <Switch defaultChecked/>
            </div>
             <div className="space-y-2">
                <Label>Active Sessions</Label>
                <div className="text-sm text-muted-foreground p-3 border rounded-lg">
                    <p>Mac • Mumbai, IN (Current)</p>
                    <Separator className="my-2" />
                    <p>Windows • Noida, IN</p>
                </div>
            </div>
        </CardContent>
        <CardFooter className="p-5 border-t border-slate-200">
            <Button variant="outline">Sign out other sessions</Button>
        </CardFooter>
      </Card>
       <Card className="rounded-xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Preferences</CardTitle>
          <CardDescription>Customize your application experience.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-5">
            <div className="flex items-center justify-between">
              <Label className="min-w-[160px]">Default landing route</Label>
               <Select defaultValue="/dashboard">
                <SelectTrigger id="landingRoute" className="flex-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="/dashboard">/dashboard</SelectItem>
                    <SelectItem value="/memory">/memory</SelectItem>
                </SelectContent>
               </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label className="min-w-[160px]">Density</Label>
               <Select defaultValue="comfortable">
                <SelectTrigger id="density" className="flex-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                </SelectContent>
               </Select>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3 md:col-span-2">
              <div className="space-y-0.5">
                <Label>Keyboard shortcuts</Label>
              </div>
              <Switch defaultChecked />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
