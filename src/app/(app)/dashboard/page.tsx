
import { DashboardClient } from '@/components/dashboard/dashboard-client';
import { DATA } from '@/lib/data';

export const dynamic = "force-dynamic";

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
    // We are fetching data here, in a real app this would be an API call.
    const items = DATA;
    return <DashboardClient initialItems={items} searchParams={searchParams} />;
}
