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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>
            Manage your personal information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="Jai Singhania" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="jai@ester.example" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" defaultValue="R&D Lead" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue="Polyesters" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="locale">Locale</Label>
               <Select defaultValue="en-IN">
                <SelectTrigger id="locale"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="en-IN">English (India)</SelectItem>
                    <SelectItem value="en-US">English (United States)</SelectItem>
                </SelectContent>
               </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
               <Select defaultValue="Asia/Kolkata">
                <SelectTrigger id="timezone"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                     <SelectItem value="America/New_York">America/New York (GMT-4:00)</SelectItem>
                </SelectContent>
               </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
        <CardFooter>
            <Button variant="outline">Sign out other sessions</Button>
        </CardFooter>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your application experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="landingRoute">Default landing route</Label>
               <Select defaultValue="/dashboard">
                <SelectTrigger id="landingRoute"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="/dashboard">/dashboard</SelectItem>
                    <SelectItem value="/memory">/memory</SelectItem>
                </SelectContent>
               </Select>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label>Keyboard shortcuts</Label>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="density">Density</Label>
               <Select defaultValue="comfortable">
                <SelectTrigger id="density"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                </SelectContent>
               </Select>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
