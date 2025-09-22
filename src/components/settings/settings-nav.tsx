'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface SettingsNavProps {
  sections: { id: string; label: string; icon: React.ElementType }[];
  activeSection: string;
  isMobile?: boolean;
  className?: string;
}

export function SettingsNav({
  sections,
  activeSection,
  isMobile = false,
  className,
}: SettingsNavProps) {
  const router = useRouter();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const href = `/settings?tab=${sectionId}#${sectionId}`;
    router.push(href, { scroll: false });
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  if (isMobile) {
    return (
      <ScrollArea className="w-full whitespace-nowrap rounded-lg border bg-background">
        <div className="flex w-max space-x-2 p-2">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`/settings?tab=${section.id}#${section.id}`}
              onClick={(e) => handleNavClick(e, section.id)}
              className={cn(
                'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              )}
            >
              {section.label}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }

  return (
    <nav className={cn('sticky top-24 self-start', className)}>
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              href={`/settings?tab=${section.id}#${section.id}`}
              onClick={(e) => handleNavClick(e, section.id)}
              className={cn(
                'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted',
                activeSection === section.id &&
                  'font-semibold text-primary'
              )}
            >
              <div
                className={cn(
                  'w-0.5 h-6 rounded-full bg-transparent group-hover:bg-primary/20',
                  activeSection === section.id && 'bg-primary'
                )}
              />
              <section.icon
                className={cn(
                  'h-5 w-5',
                  activeSection === section.id && 'text-primary'
                )}
              />
              <span>{section.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
