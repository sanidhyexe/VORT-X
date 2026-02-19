'use server';

/**
 * @fileOverview An AI agent that performs a search across the platform for gamers, groups, and content.
 *
 * - search - A function that performs the search.
 * - SearchInput - The input type for the search function.
 * - SearchOutput - The return type for the search function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Mock data - in a real app, this would come from a database.
const MOCK_DATA = {
    gamers: [
        { id: '1', name: 'PixelPioneer', description: 'Loves Sci-Fi RPGs and exploring vast galaxies.' },
        { id: '2', name: 'GlitchHunter', description: 'Enjoys finding bugs in arcade racing games.' },
        { id: '3', name: 'ValorantViper', description: 'Top-ranked Valorant player, streams on weekends.' },
        { id: '4', name: 'CyberSamurai', description: 'Cyberpunk 2077 enthusiast and modder.' },
    ],
    groups: [
        { id: '1', name: 'Apex Legends Pros', description: 'A community for competitive Apex Legends players.' },
        { id: '2', name: 'Indie Game Cult', description: 'Discover and discuss hidden indie gems.' },
        { id: '3', name: 'Valorant Champions', description: 'Group for Valorant players aiming for the top.' },
    ],
    content: [
        { id: '1', title: 'Cosmic Odyssey Platinum Guide', description: 'A detailed guide to getting the platinum trophy.' },
        { id: '2', title: 'Funny Moments in Neon Racer', description: 'A compilation of hilarious bugs and glitches.' },
        { id: '3', title: 'My Valorant Agent Tier List', description: 'Ranking all agents for the current patch.' },
    ]
}


const SearchInputSchema = z.object({
  query: z.string().describe("The user's search query."),
});
export type SearchInput = z.infer<typeof SearchInputSchema>;

const SearchResultItemSchema = z.object({
    id: z.string().describe('A unique identifier for the result item.'),
    title: z.string().describe('The main title or name of the result (e.g., username, group name, content title).'),
    description: z.string().describe('A brief description of the result.'),
    type: z.enum(['gamer', 'group', 'content']).describe('The type of the result.'),
});

const SearchOutputSchema = z.object({
  results: z
    .array(SearchResultItemSchema)
    .describe('A list of search results matching the query.'),
});
export type SearchOutput = z.infer<typeof SearchOutputSchema>;

export async function search(input: SearchInput): Promise<SearchOutput> {
  return searchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchPrompt',
  input: {schema: SearchInputSchema},
  output: {schema: SearchOutputSchema},
  prompt: `You are a search engine for a gaming social media platform called VORT-X.
  Your task is to find relevant results for the user's search query from the available data.
  The data includes gamers, groups, and content.
  Analyze the user's query and return a list of items that are most relevant.
  For each result, provide the id, title (which is the name for gamers and groups), a short description, and the type ('gamer', 'group', or 'content').

  User Query: {{{query}}}

  Available Data (JSON format):
  ${JSON.stringify(MOCK_DATA)}
  `,
});

const searchFlow = ai.defineFlow(
  {
    name: 'searchFlow',
    inputSchema: SearchInputSchema,
    outputSchema: SearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
