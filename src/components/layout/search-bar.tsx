
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim() !== '') {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search for players, games, or tournaments..."
                className="w-full rounded-full bg-secondary/50 pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
            />
        </div>
    );
}
