import { useState } from "react";

export const SearchHeader: React.FC<{
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
}> = ({ query, setQuery, onSearch }) => {
  const [recentSearches, setRecentSearches] = useState(['Climate Change', 'Electric Vehicles']);
  const popularTags = ['#GlobalEconomy', '#MarsMission', '#QuantumComputing'];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch(query);
  };

  const removeRecent = (tag: string) => {
    setRecentSearches(prev => prev.filter(t => t !== tag));
  };

  return (
    <div className="max-w-3xl mx-auto mb-12 w-full">
      <div className="relative group">
        <span className="material-icons absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
        <input 
          className="w-full pl-14 pr-14 py-4 bg-white border-none rounded-xl shadow-xl shadow-slate-200/50 focus:ring-2 focus:ring-primary text-lg transition-all"
          placeholder="Search topics, sources, or keywords..." 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <span className="material-icons">cancel</span>
          </button>
        )}
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Recent:</span>
          {recentSearches.map(tag => (
            <button key={tag} onClick={() => onSearch(tag)} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm flex items-center gap-1 hover:border-primary hover:text-primary transition-colors">
              {tag} <span onClick={(e) => { e.stopPropagation(); removeRecent(tag); }} className="material-icons text-xs hover:text-red-500">close</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Popular Now:</span>
          {popularTags.map(tag => (
            <a key={tag} onClick={() => onSearch(tag.replace('#',''))} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-pointer">
              {tag}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
