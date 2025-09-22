export type Chemical = {
  id: string;
  type: 'chemical';
  title: string;
  formula: string;
  mw: string;
  hazard: string;
  smiles: string;
  href: string;
  tags: string[];
  date: string;
  source: 'PubChem';
};

export type Polymer = {
  id: string;
  type: 'polymer';
  name: string;
  monomers: string[];
  process: string;
  forms: string[];
  props: {
    tg: string;
    tm: string;
    modulus: string;
    tensile?: string;
  };
  notes?: string;
  href: string;
  tags: string[];
  date: string;
  source: 'PoLyInfo' | 'Internal';
};

export type Paper = {
  id: string;
  type: 'paper';
  title: string;
  journal: string;
  date: string;
  status: 'Open' | 'Paywalled';
  summary: string;
  tags: string[];
  href: string;
  source: 'OpenAlex';
};

export type Patent = {
  id: string;
  type: 'patent';
  number: string;
  date: string;
  title: string;
  assignee: string;
  summary: string;
  tags: string[];
  href: string;
  source: 'Lens';
};

export type FeedItem = Chemical | Polymer | Paper | Patent;

export const DATA: FeedItem[] = [
  {
    id: 'chem-pta',
    type: 'chemical',
    title: 'Terephthalic acid — 100-21-0',
    formula: 'C8H6O4',
    mw: '166.13 g/mol',
    hazard: 'N/A',
    smiles: 'O=C(O)c1ccc(cc1)C(=O)O',
    href: 'https://pubchem.ncbi.nlm.nih.gov/compound/7489',
    tags: ['PET', 'Polyester'],
    date: '1d ago',
    source: 'PubChem',
  },
  {
    id: 'poly-pet',
    type: 'polymer',
    name: 'Poly(ethylene terephthalate) (PET)',
    monomers: ['Ethylene glycol', 'Terephthalic acid'],
    process: 'Step-growth (polycondensation)',
    forms: ['film', 'fiber', 'resin'],
    props: {
      tg: '75–85 °C',
      tm: '250–260 °C',
      modulus: '2.8–3.1 GPa',
      tensile: '55–75 MPa',
    },
    href: 'https://polymer.nims.go.jp/',
    tags: ['Polyester', 'BOPET'],
    date: '2d ago',
    source: 'PoLyInfo',
  },
  {
    id: 'pap-bopet-nanoclay',
    type: 'paper',
    title: 'Nanoclay-modified BOPET films for barrier enhancement',
    journal: 'J Appl Polym Sci',
    date: '2d ago',
    status: 'Paywalled',
    summary: 'Surface-treated clay at <3 wt% reduces O2 transmission while keeping haze under 2%…',
    tags: ['BOPET', 'Nanocomposites', 'Barrier'],
    href: 'https://openalex.org/works/W2126289963',
    source: 'OpenAlex',
  },
  {
    id: 'chem-eg',
    type: 'chemical',
    title: 'Ethylene glycol — 107-21-1',
    formula: 'C2H6O2',
    mw: '62.07 g/mol',
    hazard: 'H302',
    smiles: 'OCCO',
    href: 'https://pubchem.ncbi.nlm.nih.gov/compound/174',
    tags: ['PET', 'Monomer'],
    date: '2d ago',
    source: 'PubChem',
  },
  {
    id: 'pat-bopet-barrier',
    type: 'patent',
    number: 'IN-XXXXXX',
    date: '2025-08-11',
    title: 'High-barrier BOPET film via nano-clay masterbatch',
    assignee: 'Example Polymers Ltd.',
    summary: 'Clay loading <3 wt% with compatibilizer improves O2 barrier; extrusion guidelines provided…',
    tags: ['BOPET', 'Nanocomposites', 'Barrier'],
    href: 'https://www.lens.org/',
    source: 'Lens',
  },
  {
    id: 'pap-bio-diol',
    type: 'paper',
    title: 'Bio-based diols for high-Tg PET copolymers',
    journal: 'Polymer',
    date: '3d ago',
    status: 'Open',
    summary: 'Sorbitol-derived diols used as comonomers raise Tg by 12–18 °C while maintaining processability…',
    tags: ['PET', 'Bio-derived', 'Copolymer'],
    href: 'https://openalex.org/works/W2755294939',
    source: 'OpenAlex',
  },
  {
    id: 'chem-isosorbide',
    type: 'chemical',
    title: 'Isosorbide — 652-67-5',
    formula: 'C6H10O4',
    mw: '146.14 g/mol',
    hazard: 'N/A',
    smiles: 'C1C(OC2C(C1O)OC2)O',
    href: 'https://pubchem.ncbi.nlm.nih.gov/compound/12437',
    tags: ['Bio-derived', 'Diol'],
    date: '3d ago',
    source: 'PubChem',
  },
  {
    id: 'poly-pef',
    type: 'polymer',
    name: 'Poly(ethylene furanoate) (PEF)',
    monomers: ['Ethylene glycol', '2,5-furandicarboxylic acid (FDCA)'],
    process: 'Step-growth (polycondensation)',
    forms: ['film', 'resin'],
    props: {
      tg: '~85 °C',
      tm: '210–230 °C',
      modulus: '3.0 GPa', // Example value
    },
    notes: 'O2 barrier ↑ vs PET',
    href: 'https://polymer.nims.go.jp/',
    tags: ['Bio-based', 'Polyester'],
    date: '4d ago',
    source: 'PoLyInfo',
  },
  {
    id: 'poly-pen',
    type: 'polymer',
    name: 'Poly(ethylene naphthalate) (PEN)',
    monomers: ['Ethylene glycol', 'Naphthalene-2,6-dicarboxylic acid'],
    process: 'Step-growth (polycondensation)',
    forms: ['film', 'fiber'],
    props: {
      tg: '~120 °C',
      tm: '~265 °C',
      modulus: '3.5–4.0 GPa',
    },
    href: 'https://polymer.nims.go.jp/',
    tags: ['High-Tg', 'Polyester'],
    date: '5d ago',
    source: 'PoLyInfo',
  },
  {
    id: 'pap-glycolysis',
    type: 'paper',
    title: 'Catalytic glycolysis routes for PET depolymerization',
    journal: 'Green Chem',
    date: '6d ago',
    status: 'Open',
    summary: 'Zn/Co catalysts accelerate EG-assisted PET depolymerization with improved selectivity to BHET…',
    tags: ['Recycling', 'PET', 'Glycolysis'],
    href: 'https://openalex.org/works/W2966838843',
    source: 'OpenAlex',
  },
  {
    id: 'pat-pet-recycle',
    type: 'patent',
    number: 'US-YYYYYY',
    date: '2024-05-02',
    title: 'Catalyst system for PET chemical recycling',
    assignee: 'RePoly Corp.',
    summary: 'Bimetallic catalysts enable low-temperature glycolysis with reduced byproducts…',
    tags: ['PET', 'Recycling', 'Catalysis'],
    href: 'https://www.lens.org/',
    source: 'Lens',
  },
  {
    id: 'pat-seal-layer',
    type: 'patent',
    number: 'EP-ZZZZZZ',
    date: '2023-11-14',
    title: 'Heat-sealable oriented PET film with copolyester layer',
    assignee: 'FilmTech GmbH',
    summary: 'Co-extruded seal layer for low-temp sealing without loss of orientation…',
    tags: ['BOPET', 'Packaging'],
    href: 'https://www.lens.org/',
    source: 'Lens',
  },
];
