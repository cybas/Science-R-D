import { DashboardClient } from '@/components/dashboard/dashboard-client';
import { DATA } from '@/lib/data';

export default function DashboardPage() {
  // We are fetching data here, in a real app this would be an API call.
  const items = DATA;
  return <DashboardClient initialItems={items} />;
}
