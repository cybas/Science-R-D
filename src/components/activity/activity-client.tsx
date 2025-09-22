'use client';

import { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DateRangePicker } from '@/components/activity/date-range-picker';
import { KpiCards } from '@/components/activity/kpi-cards';
import { ActivityChart } from '@/components/activity/activity-chart';
import { BreakdownChart } from '@/components/activity/breakdown-chart';
import { TopKeywordsChart } from '@/components/activity/top-keywords-chart';
import { TopSourcesChart } from '@/components/activity/top-sources-chart';
import { FunnelChart } from '@/components/activity/funnel-chart';
import { RecentActivityTable } from '@/components/activity/recent-activity-table';
import { TopUsersTable } from '@/components/activity/top-users-table';
import { useToast } from '@/hooks/use-toast';
import { Share, Calendar as CalendarIcon, ChevronDown, Check } from 'lucide-react';
import { Switch } from '../ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


export function ActivityClient() {
  const { toast } = useToast();
  const [isScheduleModalOpen, setScheduleModalOpen] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: 'Link copied to clipboard' });
  };
  
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
              <BreadcrumbPage>Activity</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
            <p className="text-muted-foreground">Track usage and outcomes across R&A Ai.</p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Export <ChevronDown className="ml-2 h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>PNG</DropdownMenuItem>
                <DropdownMenuItem>PDF</DropdownMenuItem>
                <DropdownMenuItem>CSV</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" onClick={() => setScheduleModalOpen(true)}>Schedule Report</Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="sticky top-16 z-30 -mx-4 border-b bg-background/80 p-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4">
          <DateRangePicker />
           <Select defaultValue="day">
                <SelectTrigger className="w-auto min-w-[120px]">
                    <SelectValue placeholder="Group by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                </SelectContent>
            </Select>
             <Select defaultValue="all">
                <SelectTrigger className="w-auto min-w-[120px]">
                    <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="me">Me</SelectItem>
                    <SelectItem value="org">Org</SelectItem>
                </SelectContent>
            </Select>
          <div className="flex items-center space-x-2">
            <Switch id="compare-period" />
            <Label htmlFor="compare-period">vs previous period</Label>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            Active users: 7 • Items saved: 42
          </div>
        </div>
      </div>

      <KpiCards />

      <div className="grid grid-cols-1 gap-6">
        <ActivityChart />
      </div>

       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BreakdownChart />
        <TopKeywordsChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopSourcesChart />
        <FunnelChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
            <RecentActivityTable />
        </div>
        <div className="lg:col-span-4">
            <TopUsersTable />
        </div>
      </div>

      <Dialog open={isScheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Report</DialogTitle>
            <DialogDescription>
              Set up a recurring email report for this activity dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-title">Title</Label>
              <Input id="report-title" defaultValue="Weekly R&D Activity Digest" />
            </div>
            <div className="space-y-2">
              <Label>Frequency</Label>
               <Select defaultValue="weekly">
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
            </Select>
            </div>
             <div className="space-y-2">
                <Label>Recipients</Label>
                <Input placeholder="Add emails..." />
             </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setScheduleModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              setScheduleModalOpen(false);
              toast({ title: 'Report Scheduled' });
            }}>Save Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
