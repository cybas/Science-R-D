'use client';

import { useState, useEffect, useRef } from 'react';
import {
  User,
  Building,
  Users,
  Bell,
  Code,
  Paintbrush,
  Database,
  Puzzle,
  FlaskConical,
} from 'lucide-react';

import { SettingsNav } from './settings-nav';
import { ProfileSettings } from './profile-settings';
import { OrganizationSettings } from './organization-settings';
import { RolesSettings } from './roles-settings';
import { NotificationsSettings } from './notifications-settings';
import { ApiSettings } from './api-settings';
import { AppearanceSettings } from './appearance-settings';
import { DataSettings } from './data-settings';
import { IntegrationsSettings } from './integrations-settings';
import { ResearchDefaultsSettings } from './research-defaults-settings';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const sections = [
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    component: ProfileSettings,
  },
  {
    id: 'organization',
    label: 'Organization',
    icon: Building,
    component: OrganizationSettings,
  },
  {
    id: 'roles',
    label: 'Roles & Permissions',
    icon: Users,
    component: RolesSettings,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    component: NotificationsSettings,
  },
  {
    id: 'api',
    label: 'API & Webhooks',
    icon: Code,
    component: ApiSettings,
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: Paintbrush,
    component: AppearanceSettings,
  },
  {
    id: 'data',
    label: 'Data & Exports',
    icon: Database,
    component: DataSettings,
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: Puzzle,
    component: IntegrationsSettings,
  },
  {
    id: 'research-defaults',
    label: 'Research Defaults',
    icon: FlaskConical,
    component: ResearchDefaultsSettings,
  },
];

export function SettingsClient({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const [activeSection, setActiveSection] = useState('profile');
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (activeSection !== id) {
              setActiveSection(id);
              // Update URL without causing a re-render or navigation
              const url = `/settings?tab=${id}#${id}`;
              window.history.replaceState(
                { ...window.history.state, as: url, url: url },
                '',
                url
              );
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0.1,
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [activeSection]);
  
  useEffect(() => {
    const handleFormChange = () => setHasChanges(true);
    const form = document.querySelector('.settings-form');
    form?.addEventListener('input', handleFormChange);
    return () => form?.removeEventListener('input', handleFormChange);
  }, []);

  const handleSave = () => {
    if (hasChanges) {
      toast({ title: 'All changes saved', description: 'Your settings have been updated.' });
      setHasChanges(false);
    } else {
      toast({ title: 'Nothing to save', description: 'No changes have been made.' });
    }
  };

  const handleReset = () => {
    // In a real app, you'd reset the form state
    toast({ title: 'Reset complete', description: 'Changes have been discarded.' });
    setHasChanges(false);
  };

  return (
    <div className="mx-auto max-w-[1200px] space-y-6 px-6 md:px-8">
      <header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[260px_1fr]">
        <SettingsNav
          sections={sections}
          activeSection={activeSection}
          className="hidden md:block"
        />

        <div className="md:hidden">
          <SettingsNav sections={sections} activeSection={activeSection} isMobile />
        </div>

        <main className="flex flex-col gap-y-8 settings-form">
          <header>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account, organization, and application settings.
            </p>
          </header>
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="scroll-mt-24 space-y-4"
            >
              <h2 className="text-xl font-semibold tracking-tight">{section.label}</h2>
              <section.component />
            </section>
          ))}
        </main>
      </div>
      
       <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm border-t md:relative md:p-0 md:bg-transparent md:border-none">
        <div className="mx-auto max-w-[1200px] flex justify-end gap-2 md:sticky md:bottom-8">
          <Button variant="ghost" onClick={handleReset} disabled={!hasChanges}>Reset Changes</Button>
          <Button onClick={handleSave} disabled={!hasChanges}>Save All</Button>
        </div>
      </div>
    </div>
  );
}
