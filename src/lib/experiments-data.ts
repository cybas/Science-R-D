
export type Experiment = {
  id: string;
  runId: string;
  status: 'Planned' | 'Running' | 'Completed' | 'Failed';
  process: string;
  owner: string;
  date: string;
  inputs: {
    name: string;
    role: 'Monomer' | 'Catalyst' | 'Initiator' | 'Solvent' | 'RAFT Agent';
  }[];
  conditions: {
    temperature: string;
    time: string;
    pressure?: string;
    catalystPercent?: number;
  };
  targets: {
    tg?: string;
    modulus?: string;
  };
  results?: {
    yield: string;
    iv?: string;
    mn?: string;
    mw?: string;
    dispersity?: string;
    tg?: string;
    tm?: string;
    notes?: string;
  };
  tags: string[];
  projectId?: string;
  attachments?: number;
};

export const EXPERIMENTS_DATA: Experiment[] = [
  {
    id: 'exp-1',
    runId: 'EXP-2025-001',
    status: 'Completed',
    process: 'Polycondensation',
    owner: 'Jai Singhania',
    date: '1d ago',
    inputs: [
      { name: 'Ethylene glycol', role: 'Monomer' },
      { name: 'Terephthalic acid', role: 'Monomer' },
      { name: 'Titanium(IV) butoxide', role: 'Catalyst' },
    ],
    conditions: {
      temperature: '250°C',
      time: '4h',
    },
    targets: {
      tg: '≥ 75°C',
    },
    results: {
      yield: '87%',
      iv: '0.66 dL/g',
      tg: '80°C',
    },
    tags: ['PET'],
    projectId: 'proj-1',
    attachments: 2,
  },
  {
    id: 'exp-2',
    runId: 'EXP-2025-002',
    status: 'Running',
    process: 'Polycondensation',
    owner: 'A. Rao',
    date: '2h ago',
    inputs: [
        { name: 'Ethylene glycol', role: 'Monomer' },
        { name: '2,5-Furandicarboxylic acid (FDCA)', role: 'Monomer' },
        { name: 'Antimony trioxide', role: 'Catalyst' },
    ],
    conditions: {
      temperature: '240°C (target)',
      time: 'in progress',
    },
    targets: {
      tg: '≥ 90°C',
    },
    tags: ['PEF', 'Bio-based'],
    projectId: 'proj-4',
  },
   {
    id: 'exp-3',
    runId: 'EXP-2025-003',
    status: 'Planned',
    process: 'RAFT',
    owner: 'P. Mehta',
    date: 'in 2d',
    inputs: [
        { name: 'Isosorbide diacrylate', role: 'Monomer' },
        { name: 'RAFT Agent', role: 'RAFT Agent' },
    ],
    conditions: {
      temperature: '80°C',
      time: '6h',
    },
    targets: {
      modulus: '≥ 3.5 GPa',
    },
    tags: ['Bio-based', 'Acrylic'],
  },
];
