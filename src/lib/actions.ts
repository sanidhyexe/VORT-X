
'use server';
import { search as searchFlow, SearchInput, SearchOutput } from '@/ai/flows/search-flow';

/**
 * Server Action to perform a platform-wide search using the AI search flow.
 * This function is intended to be called from client-side components.
 * @param {SearchInput} input - The search input containing the query.
 * @returns {Promise<SearchOutput>} A promise that resolves to the search results.
 */
export async function search(input: SearchInput): Promise<SearchOutput> {
    return await searchFlow(input);
}
