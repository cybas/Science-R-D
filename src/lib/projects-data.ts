export type Project = {
  id: string;
  name: string;
  owners: string[];
  tags: string[];
  status: 'Backlog' | 'In Progress' | 'Review' | 'Done';
  nextMilestoneDate: string;
  linkedItems: number;
  lastUpdated: string;
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-1',
    name: 'High-Tg PET Copolymer',
    owners: ['Jai Singhania', 'A. Rao'],
    tags: ['Polyesters', 'Bio-based'],
    status: 'In Progress',
    nextMilestoneDate: 'in 6d',
    linkedItems: 6,
    lastUpdated: '1d ago',
  },
  {
    id: 'proj-2',
    name: 'BOPET Barrier Film (Nanoclay)',
    owners: ['P. Mehta'],
    tags: ['Barrier', 'Packaging'],
    status: 'Review',
    nextMilestoneDate: 'in 12d',
    linkedItems: 5,
    lastUpdated: '3d ago',
  },
  {
    id: 'proj-3',
    name: 'PET Chemical Recycling (Glycolysis)',
    owners: ['IP Team'],
    tags: ['Recycling', 'Sustainability'],
    status: 'In Progress',
    nextMilestoneDate: 'in 9d',
    linkedItems: 7,
    lastUpdated: '2h ago',
  },
  {
    id: 'proj-4',
    name: 'Bio-PEF Scale-up Feasibility',
    owners: ['A. Rao'],
    tags: ['Bio-based', 'PEF'],
    status: 'Backlog',
    nextMilestoneDate: 'in 30d',
    linkedItems: 2,
    lastUpdated: '1w ago',
  },
];
