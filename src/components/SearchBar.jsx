import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function SearchBar({ onSearch, isLoading }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <div className="w-full max-w-md relative mb-8 flex gap-2">
            <form onSubmit={handleSubmit} className="flex-1 relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a city..."
                    className="w-full pl-12 pr-4 py-4 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-blue-500 transition-all font-medium"
                    disabled={isLoading}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
                    {isLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <Search size={20} />
                    )}
                </div>
            </form>
        </div>
    );
}
