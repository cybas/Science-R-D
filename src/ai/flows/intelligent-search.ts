// IntelligentSearchFlow.ts
'use server';
/**
 * @fileOverview Implements the intelligent search flow for the Ester R&D Polymer Research Dashboard.
 *
 * - intelligentSearch - A function that handles the intelligent search process.
 * - IntelligentSearchInput - The input type for the intelligentSearch function.
 * - IntelligentSearchOutput - The return type for the intelligentSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentSearchInputSchema = z.object({
  query: z.string().describe('The search query provided by the user.'),
});
export type IntelligentSearchInput = z.infer<typeof IntelligentSearchInputSchema>;

const IntelligentSearchOutputSchema = z.object({
  results: z.string().describe('A summary of the search results.'),
});
export type IntelligentSearchOutput = z.infer<typeof IntelligentSearchOutputSchema>;

export async function intelligentSearch(input: IntelligentSearchInput): Promise<IntelligentSearchOutput> {
  return intelligentSearchFlow(input);
}

const intelligentSearchPrompt = ai.definePrompt({
  name: 'intelligentSearchPrompt',
  input: {schema: IntelligentSearchInputSchema},
  output: {schema: IntelligentSearchOutputSchema},
  prompt: `You are an expert research assistant for polymer research.
  Your job is to take a search query from the user and return a summary of the results.
  The user is able to search across chemicals, polymers, SMILES, CAS numbers, papers, and patents.
  Here is the search query:
  {{query}}`,
});

const intelligentSearchFlow = ai.defineFlow(
  {
    name: 'intelligentSearchFlow',
    inputSchema: IntelligentSearchInputSchema,
    outputSchema: IntelligentSearchOutputSchema,
  },
  async input => {
    const {output} = await intelligentSearchPrompt(input);
    return output!;
  }
);
