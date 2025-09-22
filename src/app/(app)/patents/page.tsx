import { PatentsClient } from '@/components/patents/patents-client';
import { DATA } from '@/lib/data';
import type { Patent } from '@/lib/data';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

export default function PatentsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const patents = DATA.filter((item) => item.type === 'patent') as Patent[];

  return (
    <div className="space-y-6">
      <header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Patents</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-2">
          <h1 className="text-3xl font-bold tracking-tight">Patents</h1>
          <p className="text-muted-foreground">
            Explore patent landscapes by assignee, technology class, or keyword.
          </p>
        </div>
      </header>
      <PatentsClient allPatents={patents} searchParams={searchParams} />
    </div>
  );
}
