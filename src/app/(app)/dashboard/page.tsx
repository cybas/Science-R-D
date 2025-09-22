import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { MainFeed } from "@/components/dashboard/main-feed";
import { Workbench } from "@/components/dashboard/workbench";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeCard />
      <div className="space-y-8">
        <FilterBar />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <MainFeed />
          </div>
          <div className="lg:col-span-4">
            <Workbench />
          </div>
        </div>
      </div>
    </div>
  );
}
