'use server';

/**
 * @fileOverview Generates a concise summary of search results using AI.
 *
 * - generateSearchResultsSummary - A function that generates a summary of search results.
 * - GenerateSearchResultsSummaryInput - The input type for the generateSearchResultsSummary function.
 * - GenerateSearchResultsSummaryOutput - The return type for the generateSearchResultsSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSearchResultsSummaryInputSchema = z.object({
  query: z.string().describe('The search query.'),
  results: z.string().describe('The search results to summarize.'),
});

export type GenerateSearchResultsSummaryInput = z.infer<
  typeof GenerateSearchResultsSummaryInputSchema
>;

const GenerateSearchResultsSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the search results.'),
});

export type GenerateSearchResultsSummaryOutput = z.infer<
  typeof GenerateSearchResultsSummaryOutputSchema
>;

export async function generateSearchResultsSummary(
  input: GenerateSearchResultsSummaryInput
): Promise<GenerateSearchResultsSummaryOutput> {
  return generateSearchResultsSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchResultsSummaryPrompt',
  input: {schema: GenerateSearchResultsSummaryInputSchema},
  output: {schema: GenerateSearchResultsSummaryOutputSchema},
  prompt: `You are an expert researcher summarizing search results for a user.

  Based on the user's query and the search results provided, generate a concise summary of the search results. Focus on the key findings and relevant information.

  Query: {{{query}}}
  Search Results: {{{results}}}

  Summary:`,
});

const generateSearchResultsSummaryFlow = ai.defineFlow(
  {
    name: 'generateSearchResultsSummaryFlow',
    inputSchema: GenerateSearchResultsSummaryInputSchema,
    outputSchema: GenerateSearchResultsSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
