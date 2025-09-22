'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSettings } from './profile-settings';
import { OrganizationSettings } from './organization-settings';
import { RolesSettings } from './roles-settings';
import { NotificationsSettings } from './notifications-settings';
import { ApiSettings } from './api-settings';
import { AppearanceSettings } from './appearance-settings';
import { DataSettings } from './data-settings';
import { IntegrationsSettings } from './integrations-settings';
import { Button } from '../ui/button';

export function SettingsClient() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, organization, and application settings.
          </p>
        </div>
        <Button>Save All</Button>
      </header>

      <Tabs defaultValue="profile" className="grid grid-cols-12 gap-x-gutter-d">
        <TabsList className="col-span-12 md:col-span-3 h-auto flex-col items-start bg-transparent p-0 border-none">
          <TabsTrigger value="profile" className="w-full justify-start">
            Profile
          </TabsTrigger>
          <TabsTrigger value="organization" className="w-full justify-start">
            Organization
          </TabsTrigger>
          <TabsTrigger value="roles" className="w-full justify-start">
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="notifications" className="w-full justify-start">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api" className="w-full justify-start">
            API & Webhooks
          </TabsTrigger>
          <TabsTrigger value="appearance" className="w-full justify-start">
            Appearance
          </TabsTrigger>
          <TabsTrigger value="data" className="w-full justify-start">
            Data & Exports
          </TabsTrigger>
          <TabsTrigger value="integrations" className="w-full justify-start">
            Integrations
          </TabsTrigger>
        </TabsList>
        <div className="col-span-12 md:col-span-9">
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          <TabsContent value="organization">
            <OrganizationSettings />
          </TabsContent>
          <TabsContent value="roles">
            <RolesSettings />
          </TabsContent>
           <TabsContent value="notifications">
            <NotificationsSettings />
          </TabsContent>
           <TabsContent value="api">
            <ApiSettings />
          </TabsContent>
           <TabsContent value="appearance">
            <AppearanceSettings />
          </TabsContent>
          <TabsContent value="data">
            <DataSettings />
          </TabsContent>
          <TabsContent value="integrations">
            <IntegrationsSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
