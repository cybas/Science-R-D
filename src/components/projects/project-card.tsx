'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  MessageSquare,
  Bookmark,
  Folder,
  Upload,
  MoreVertical,
  Calendar,
  FlaskConical,
  FileText,
  Spline,
} from 'lucide-react';
import type { Project } from '@/lib/projects-data';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <Card className="bg-card hover:bg-card/95 cursor-grab active:cursor-grabbing">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold leading-tight line-clamp-2">
            {project.name}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="-my-1 -mr-2">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Pause</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>Next milestone: {project.nextMilestoneDate}</span>
        </div>
         <div className="text-xs text-muted-foreground grid grid-cols-2 gap-x-4 gap-y-1">
            <div className="flex items-center gap-2"><FlaskConical className="h-3 w-3" /> Molecules (2)</div>
            <div className="flex items-center gap-2"><Spline className="h-3 w-3" /> Polymers (1)</div>
            <div className="flex items-center gap-2"><FileText className="h-3 w-3" /> Papers (3)</div>
            <div className="flex items-center gap-2"><FileText className="h-3 w-3" /> Patents (0)</div>
        </div>

      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
         <div className="flex -space-x-2">
            {project.owners.map(owner => (
                 <Avatar key={owner} className="h-6 w-6 border-2 border-card">
                    <AvatarFallback>{getInitials(owner)}</AvatarFallback>
                </Avatar>
            ))}
         </div>
         <div className="flex items-center gap-1">
             <Button variant="primary" size="icon-sm"><MessageSquare /></Button>
             <Button variant="secondary" size="icon-sm"><Bookmark /></Button>
             <Button variant="secondary" size="icon-sm"><Folder /></Button>
         </div>
      </CardFooter>
    </Card>
  );
}
