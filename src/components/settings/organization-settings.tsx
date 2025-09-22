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
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';

export function OrganizationSettings() {
    const router = useRouter();
  return (
    <Card className="rounded-xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Organization Profile</CardTitle>
        <CardDescription>
          Manage your organization's details.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-5">
         <div className="flex items-center justify-between">
            <Label className="min-w-[160px]">Name</Label>
            <Input id="orgName" defaultValue="Ester R&D" className="flex-1" />
        </div>
        <div className="flex items-center justify-between">
            <Label className="min-w-[160px]">Billing Email</Label>
            <Input id="billingEmail" defaultValue="accounts@ester.example" className="flex-1" />
        </div>
        <div className="flex items-center justify-between">
            <Label className="min-w-[160px]">Address</Label>
            <Input id="address" defaultValue="Khatima, Uttarakhand, IN" className="flex-1" />
        </div>
        <div className="flex items-center justify-between">
            <Label className="min-w-[160px]">Verified Domains</Label>
            <Input id="domains" defaultValue="esterindustries.com" className="flex-1" />
        </div>
      </CardContent>
      <CardHeader className="border-t border-slate-200">
        <CardTitle className="text-lg">Branding</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-5">
        <div className="flex items-center justify-between">
            <Label className="min-w-[160px]">Sidebar Logo Text</Label>
            <Input id="sidebarLogo" defaultValue="Ester R&D" className="flex-1" />
        </div>
        <div className="flex items-center justify-between">
            <Label className="min-w-[160px]">Footer Credit</Label>
            <div className="flex-1 flex items-center justify-between rounded-md border border-slate-200 p-2">
                <p className="text-sm text-muted-foreground">"Powered by R&A Ai"</p>
                <Switch defaultChecked/>
            </div>
        </div>
      </CardContent>
       <CardHeader className="border-t border-slate-200">
          <CardTitle className="text-lg">Data & Compliance</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-5">
             <div className="flex items-center justify-between">
                <Label className="min-w-[160px]">Data Residency</Label>
                <Input readOnly defaultValue="India" className="flex-1" />
            </div>
            <div />
            <div className="flex items-center justify-between">
                <Label className="min-w-[160px]">DPO</Label>
                <Input id="dpo" defaultValue="dpo@ester.example" className="flex-1" />
            </div>
             <div className="flex items-center justify-between">
                <Label className="min-w-[160px]">Security Contact</Label>
                <Input id="security" defaultValue="secops@ester.example" className="flex-1" />
            </div>
             <div className="flex items-center justify-between">
                <Label className="min-w-[160px]">Legal Contact</Label>
                <Input id="legal" defaultValue="legal@ester.example" className="flex-1" />
            </div>
        </CardContent>
    </Card>
  );
}
