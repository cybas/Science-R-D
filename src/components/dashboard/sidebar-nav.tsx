'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import {
  Award,
  Beaker,
  Database,
  FileText,
  Folder,
  LayoutDashboard,
  Settings,
  Spline,
  LineChart,
  FolderKanban,
} from 'lucide-react';
import Link from 'next/link';
import { MoleculeIcon } from '../icons/molecule-icon';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/molecules', label: 'Molecules', icon: MoleculeIcon },
  { href: '/polymers', label: 'Polymers', icon: Spline },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/papers', label: 'Papers', icon: FileText },
  { href: '/patents', label: 'Patents', icon: Award },
  { href: '/sources', label: 'Sources', icon: Database },
  { href: '/memory', label: 'Memory', icon: Folder },
  { href: '/activity', label: 'Activity', icon: LineChart },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(link.href)}
            tooltip={link.label}
          >
            <Link href={link.href}>
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
