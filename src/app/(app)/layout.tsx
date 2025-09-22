import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/dashboard/sidebar-nav';
import { UserNav } from '@/components/dashboard/user-nav';
import { Beaker, Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      defaultOpen
      style={{ '--sidebar-width': '260px' } as React.CSSProperties}
    >
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xl font-semibold"
          >
            <Beaker className="h-7 w-7 text-primary" />
            <span>Ester R&D</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4 text-xs text-muted-foreground">
          Powered by R&A Ai
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-background/80 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-screen-xl items-center gap-4 px-4 md:px-6">
            <div className="flex-1">
              <SidebarTrigger className="md:hidden" />
            </div>
            <div className="hidden w-full max-w-md flex-1 md:block lg:max-w-lg xl:max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search chemicals, polymers, SMILES, CAS, papers & patents…"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex flex-1 items-center justify-end">
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto w-full max-w-screen-xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
