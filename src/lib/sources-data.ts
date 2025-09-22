export type Source = {
  id: string;
  name: string;
  type: 'API' | 'Domain' | 'RSS' | 'Email/Webhook' | 'Upload';
  scope: string[];
  schedule: string;
  lastRun: string;
  itemsLast7d: number;
  health: 'OK' | 'Warning' | 'Error' | 'Bridge needed';
  autoSave: boolean;
  access?: 'Open' | 'Paywalled' | 'Unknown' | 'Open/Unknown';
  provider?: string;
  url?: string;
  query?: string;
  ipcFilters?: string[];
  tag?: string;
};

export const SOURCES_DATA: Source[] = [
  {
    id: 'src-1',
    name: 'PubChem',
    type: 'API',
    scope: ['Chemicals'],
    schedule: 'Hourly',
    lastRun: '12m ago',
    itemsLast7d: 140,
    health: 'OK',
    autoSave: true,
    provider: 'PubChem PUG REST',
  },
  {
    id: 'src-2',
    name: 'PoLyInfo',
    type: 'Domain',
    scope: ['Polymers'],
    schedule: 'Daily',
    lastRun: '3h ago',
    itemsLast7d: 22,
    health: 'OK',
    autoSave: true,
    url: 'https://polymer.nims.go.jp/',
  },
  {
    id: 'src-3',
    name: 'OpenAlex',
    type: 'API',
    scope: ['Papers'],
    schedule: 'Hourly',
    lastRun: '18m ago',
    itemsLast7d: 85,
    health: 'OK',
    autoSave: false,
    query: '(polymer OR polyester) AND (PET OR PEF OR PEN)',
    access: 'Open/Unknown',
  },
  {
    id: 'src-4',
    name: 'The Lens',
    type: 'API',
    scope: ['Patents'],
    schedule: 'Daily',
    lastRun: '2h ago',
    itemsLast7d: 40,
    health: 'OK',
    autoSave: false,
    ipcFilters: ['C08G', 'B32B', 'C08K'],
  },
  {
    id: 'src-5',
    name: 'esterindustries.com/news',
    type: 'Domain',
    scope: ['Company'],
    schedule: 'Daily',
    lastRun: '6h ago',
    itemsLast7d: 6,
    health: 'OK',
    autoSave: false,
    url: 'https://esterindustries.com/news',
  },
  {
    id: 'src-6',
    name: 'MDPI Polymers',
    type: 'Domain/RSS',
    scope: ['Papers'],
    schedule: 'Daily',
    lastRun: '8h ago',
    itemsLast7d: 12,
    health: 'OK',
    autoSave: false,
    access: 'Open/Unknown',
    url: 'https://www.mdpi.com/journal/polymers',
  },
  {
    id: 'src-7',
    name: 'Wiley JAPS',
    type: 'Domain',
    scope: ['Papers'],
    schedule: 'Daily',
    lastRun: '2h ago',
    itemsLast7d: 9,
    health: 'Warning',
    autoSave: false,
    access: 'Paywalled',
    url: 'https://onlinelibrary.wiley.com/journal/10974628',
  },
  {
    id: 'src-8',
    name: 'ArXiv (polymers)',
    type: 'RSS',
    scope: ['Preprints'],
    schedule: 'Hourly',
    lastRun: '30m ago',
    itemsLast7d: 7,
    health: 'OK',
    autoSave: false,
    tag: 'Preprint',
    query: 'polymers OR "nanocomposite"'
  },
  {
    id: 'src-9',
    name: 'Google Alerts (bridge)',
    type: 'Email/Webhook',
    scope: ['News'],
    schedule: 'Daily',
    lastRun: '1d ago',
    itemsLast7d: 0,
    health: 'Bridge needed',
    autoSave: false,
  },
  {
    id: 'src-10',
    name: 'Whitepapers (uploads)',
    type: 'Upload',
    scope: ['Documents'],
    schedule: 'On-demand',
    lastRun: '10m ago',
    itemsLast7d: 3,
    health: 'OK',
    autoSave: true,
  },
];

export type CrawlError = {
  time: string;
  source: string;
  error: string;
  suggestion: string;
};

export const CRAWL_ERRORS: CrawlError[] = [
    { time: '10:22', source: 'Wiley JAPS', error: 'Paywall detected (HTML only)', suggestion: 'Mark as Paywalled' },
    { time: '09:15', source: 'PoLyInfo', error: 'Timeout on /property/P000123', suggestion: 'Retrying' },
    { time: '08:47', source: 'User-Added Site', error: 'robots.txt disallowed crawling', suggestion: 'Switch to RSS' },
];

export type CrawlStats = {
    successRate: number;
    itemsPerDay: number;
    avgParseTime: number;
    dedupRate: number;
};

export const CRAWL_STATS: CrawlStats = {
    successRate: 96,
    itemsPerDay: 28,
    avgParseTime: 480,
    dedupRate: 22,
};
