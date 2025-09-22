'use client';

import { useState } from 'react';
import type { Project } from '@/lib/projects-data';
import { ProjectCard } from './project-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const columns = ['Backlog', 'In Progress', 'Review', 'Done'];

type ProjectBoardViewProps = {
  projects: Project[];
};

export function ProjectBoardView({ projects }: ProjectBoardViewProps) {
  // Drag and drop state would be managed here with a library like dnd-kit
  const [boardProjects, setBoardProjects] = useState(projects);

  const getProjectsByStatus = (status: string) =>
    boardProjects.filter((p) => p.status === status);

  return (
    <ScrollArea className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-4">
        {columns.map((status) => (
          <div key={status} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold tracking-tight px-1">
              {status}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({getProjectsByStatus(status).length})
              </span>
            </h2>
            <div className="space-y-4 rounded-lg bg-muted/50 p-2 min-h-96">
              {getProjectsByStatus(status).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {getProjectsByStatus(status).length === 0 && (
                 <div className="flex items-center justify-center h-24 text-sm text-muted-foreground">
                    Drop projects here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
       <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
