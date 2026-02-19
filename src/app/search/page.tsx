
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { search, SearchOutput } from '@/lib/actions';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Loader2, User, Users, FileText, Frown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<SearchOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setResults(null);
      search({ query })
        .then(res => {
          setResults(res);
        })
        .catch(err => {
          console.error("Search failed:", err);
          setResults({ results: [] }); // Set empty results on error
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [query]);

  const getIcon = (type: 'gamer' | 'group' | 'content') => {
    switch (type) {
      case 'gamer':
        return <User className="h-5 w-5 text-primary" />;
      case 'group':
        return <Users className="h-5 w-5 text-primary" />;
      case 'content':
        return <FileText className="h-5 w-5 text-primary" />;
    }
  };

  return (
      <div className="container p-4 sm:p-6">
        <div className="mx-auto max-w-2xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Search Results</h1>
                {query && <p className="text-muted-foreground">Showing results for: "{query}"</p>}
            </div>

            {loading && (
                <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            )}

            {!loading && results && results.results.length > 0 && (
                <div className="space-y-4">
                    {results.results.map(item => (
                        <Card key={`${item.type}-${item.id}`} className="transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                        {getIcon(item.type)}
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-base font-headline">{item.title}</CardTitle>
                                        <CardDescription className="text-xs capitalize">{item.type}</CardDescription>
                                    </div>
                                    {item.type === 'gamer' && <Button size="sm">Connect</Button>}
                                    {item.type === 'group' && <Button size="sm" variant="outline">Join</Button>}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {!loading && (!results || results.results.length === 0) && (
                 <Card className="flex flex-col items-center justify-center p-10 text-center">
                    <Frown className="h-12 w-12 text-muted-foreground mb-4" />
                    <CardTitle className="text-lg mb-2">No Results Found</CardTitle>
                    <CardDescription>We couldn't find anything matching your search. Try another keyword.</CardDescription>
                </Card>
            )}
        </div>
      </div>
  );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    )
}
