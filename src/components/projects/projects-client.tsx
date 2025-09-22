'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ProjectFilters } from './project-filters';
import { ProjectBoardView } from './project-board-view';
import { NewProjectModal } from './new-project-modal';
import type { Project } from '@/lib/projects-data';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

type ProjectsClientProps = {
  allProjects: Project[];
  searchParams?: { [key: string]: string | string[] | undefined };
};

const defaultFilters = {
  q: '',
  status: 'all',
  owner: 'all',
  tags: [] as string[],
  sort: 'recent',
  view: 'board',
};

export function ProjectsClient({
  allProjects,
  searchParams,
}: ProjectsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [projects, setProjects] = useState<Project[]>(allProjects);

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(searchParams as any);
    return {
      q: params.get('q') || defaultFilters.q,
      status: params.get('status') || defaultFilters.status,
      owner: params.get('owner') || defaultFilters.owner,
      tags: params.getAll('tags') || defaultFilters.tags,
      sort: params.get('sort') || defaultFilters.sort,
      view: params.get('view') || defaultFilters.view,
    };
  });
  
  const isNewProjectModalOpen = searchParams?.modal === 'new';

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.status !== defaultFilters.status) params.set('status', filters.status);
    if (filters.owner !== defaultFilters.owner) params.set('owner', filters.owner);
    filters.tags.forEach((t) => params.append('tags', t));
    if (filters.sort !== defaultFilters.sort) params.set('sort', filters.sort);
    if (filters.view !== defaultFilters.view) params.set('view', filters.view);
    
    if (isNewProjectModalOpen) params.set('modal', 'new');

    router.replace(`${pathname}?${params.toString()}`);
  }, [filters, router, pathname, isNewProjectModalOpen]);

  const filteredProjects = useMemo(() => {
    let items = [...projects];
    if (filters.q) {
      const lowerQ = filters.q.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQ) ||
          p.tags.some((t) => t.toLowerCase().includes(lowerQ))
      );
    }
    if (filters.status !== 'all') {
      items = items.filter((p) => p.status.toLowerCase().replace(' ', '-') === filters.status);
    }
    // Add other filters
    return items;
  }, [projects, filters]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSetModalOpen = (isOpen: boolean) => {
    const params = new URLSearchParams(searchParams as any);
    if (isOpen) {
      params.set('modal', 'new');
    } else {
      params.delete('modal');
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const handleCreateProject = (newProjectData: any) => {
      const newProject: Project = {
        ...newProjectData,
        id: `proj-${Date.now()}`,
        status: 'Backlog',
        linkedItems: 0,
        lastUpdated: '1m ago',
        nextMilestoneDate: 'in 30d'
      }
      setProjects(prev => [newProject, ...prev]);
      toast({ title: "Project created", description: `"${newProject.name}" has been added to the backlog.` });
      handleSetModalOpen(false);
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Track goals, link research, and monitor progress.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => handleSetModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
          <Button variant="outline">Import</Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <ProjectFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        resultCount={filteredProjects.length}
      />

      {filters.view === 'board' ? (
        <ProjectBoardView projects={filteredProjects} />
      ) : (
        <div className="text-center text-muted-foreground py-16">List view coming soon.</div>
      )}
      
      <NewProjectModal 
        isOpen={isNewProjectModalOpen} 
        onOpenChange={handleSetModalOpen}
        onCreateProject={handleCreateProject}
        />
    </>
  );
}
