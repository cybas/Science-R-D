'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

type NewProjectModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (projectData: any) => void;
};

export function NewProjectModal({
  isOpen,
  onOpenChange,
  onCreateProject,
}: NewProjectModalProps) {
    const [name, setName] = useState('');
    const [owners, setOwners] = useState('Jai Singhania');
    const [tags, setTags] = useState('Polyesters, Bio-based');
    const [objective, setObjective] = useState('');

  const handleCreate = () => {
    // Basic validation
    if (!name || !objective) {
      alert('Please fill in Name and Objective.');
      return;
    }
    
    onCreateProject({
      name,
      owners: owners.split(',').map(o => o.trim()),
      tags: tags.split(',').map(t => t.trim()),
      objective,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Define the goals and scope for a new R&D initiative.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="objective" className="text-right">
              Objective
            </Label>
            <Textarea id="objective" value={objective} onChange={e => setObjective(e.target.value)} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="owners" className="text-right">
              Owners
            </Label>
            <Input id="owners" value={owners} onChange={e => setOwners(e.target.value)} className="col-span-3" placeholder="Comma-separated" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <Input id="tags" value={tags} onChange={e => setTags(e.target.value)} className="col-span-3" placeholder="Comma-separated" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
