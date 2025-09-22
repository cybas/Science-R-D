export const getPresetConfig = (preset: string) => {
  switch (preset) {
    case 'PubChem':
      return {
        name: 'PubChem',
        type: 'API',
        provider: 'PubChem PUG REST',
        scope: ['Chemicals'],
        schedule: 'Hourly',
        description: 'Source for chemical properties and identifiers.',
        autoSave: true,
      };
    case 'PoLyInfo':
      return {
        name: 'PoLyInfo',
        type: 'Domain',
        url: 'https://polymer.nims.go.jp/',
        scope: ['Polymers'],
        schedule: 'Daily',
        description: 'Polymer properties, monomers, and processes.',
        autoSave: true,
      };
    case 'OpenAlex':
        return {
            name: 'OpenAlex',
            type: 'API',
            scope: ['Papers'],
            schedule: 'Hourly',
            query: '(polymer OR polyester) AND (PET OR PEF OR PEN OR BOPET OR "nanocomposite")',
            description: 'Scholarly articles from around the world.',
            autoSave: false,
        };
    case 'The Lens':
        return {
            name: 'The Lens',
            type: 'API',
            scope: ['Patents'],
            schedule: 'Daily',
            description: 'Patent and scholarly search.',
            ipcFilters: ['C08G', 'B32B', 'C08K'],
            autoSave: false,
        };
    case 'Company Website':
        return {
            name: 'Ester Industries News',
            type: 'Domain',
            url: 'https://esterindustries.com/news',
            scope: ['Company'],
            schedule: 'Daily',
            description: 'News and updates from a company website.',
            autoSave: false,
        }
    case 'Journal':
        return {
            name: 'MDPI Polymers',
            type: 'Domain/RSS',
            url: 'https://www.mdpi.com/journal/polymers',
            scope: ['Papers'],
            schedule: 'Daily',
            description: 'A specific scientific journal.',
            autoSave: false,
        }
    case 'ArXiv':
        return {
            name: 'ArXiv Preprints',
            type: 'RSS',
            query: 'polymers OR "nanocomposite"',
            scope: ['Preprints'],
            schedule: 'Hourly',
            description: 'Preprints from ArXiv in relevant categories.',
            autoSave: false,
        }
    case 'Google Alerts':
        return {
            name: 'Google Alerts Bridge',
            type: 'Email/Webhook',
            scope: ['News'],
            schedule: 'Daily',
            description: 'Forward Google Alerts via email to an ingest address.',
            autoSave: false,
        }
    case 'Whitepapers':
        return {
            name: 'Whitepaper Uploads',
            type: 'Upload',
            scope: ['Documents'],
            schedule: 'On-demand',
            description: 'Manually upload PDF whitepapers.',
            autoSave: true,
        }
    default: // User-Added Website
      return {
        name: '',
        type: 'Domain',
        url: '',
        scope: [],
        schedule: 'Daily',
        description: 'Add a custom website to crawl.',
        autoSave: false,
      };
  }
};
