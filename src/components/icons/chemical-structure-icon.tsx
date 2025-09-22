import React from 'react';

// This is a placeholder component. A real implementation would use a library
// like RDKit.js or Smiles-Drawer to render a 2D structure from a SMILES string.
export function ChemicalStructureIcon({ smiles, ...props }: React.SVGProps<SVGSVGElement> & { smiles: string }) {
  // Simple hash to get a slightly different placeholder for different smiles
  const hash = smiles.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const pathData = [
    'M12 2v6',
    'M12 16v6',
    'M12 8a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4Z',
    'M6 12a2 2 0 1 0-4 0a2 2 0 0 0 4 0Z',
    'M18 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0Z',
    'm-2-5-3-3',
    'm8 0 3-3'
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={pathData[hash % pathData.length]} />
      <path d={pathData[(hash + 1) % pathData.length]} />
      <path d={pathData[(hash + 2) % pathData.length]} />
    </svg>
  );
}
