import { PaperFilters } from '@/components/papers/paper-filters';
import { PaperList } from '@/components/papers/paper-list';
import { DATA } from '@/lib/data';
import type { Paper } from '@/lib/data';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export default function PapersPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const papers = DATA.filter((item) => item.type === 'paper') as Paper[];

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
                <BreadcrumbPage>Papers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="mt-2">
            <h1 className="text-3xl font-bold tracking-tight">Papers</h1>
            <p className="text-muted-foreground">
              Search and filter recent publications from key journals.
            </p>
          </div>
        </header>
      <PaperList allPapers={papers} searchParams={searchParams} />
    </div>
  );
}
