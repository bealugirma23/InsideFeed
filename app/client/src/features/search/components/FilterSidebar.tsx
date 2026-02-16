import { DateRange, SearchFilters } from "types";

export const FilterSidebar: React.FC<{
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
}> = ({ filters, setFilters }) => {
  const dateRanges: DateRange[] = ['Anytime', 'Past 24 hours', 'Past week', 'Past month'];
  const sources = ['Tech Journal', 'Global News', 'Health Daily'];

  const toggleSource = (source: string) => {
    setFilters(prev => ({
      ...prev,
      sources: prev.sources.includes(source)
        ? prev.sources.filter(s => s !== source)
        : [...prev.sources, source]
    }));
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Filters</h3>
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold">Date Range</label>
            <div className="space-y-2">
              {dateRanges.map(range => (
                <label key={range} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="date"
                    checked={filters.dateRange === range}
                    onChange={() => setFilters(prev => ({ ...prev, dateRange: range }))}
                    className="text-primary focus:ring-primary border-slate-300"
                  />
                  <span className={`text-sm ${filters.dateRange === range ? 'text-primary font-medium' : 'text-slate-600'} group-hover:text-primary transition-colors`}>{range}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold">Sources</label>
            <div className="space-y-2">
              {sources.map(source => (
                <label key={source} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.sources.includes(source)}
                    onChange={() => toggleSource(source)}
                    className="rounded text-primary focus:ring-primary border-slate-300"
                  />
                  <span className={`text-sm ${filters.sources.includes(source) ? 'text-primary font-medium' : 'text-slate-600'} group-hover:text-primary transition-colors`}>{source}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="w-full bg-white border border-slate-200 rounded-lg text-sm py-2 px-3 focus:ring-primary focus:border-primary outline-none"
            >
              <option>Relevance</option>
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Most Read</option>
            </select>
          </div>
        </div>
      </div>
      <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
        <p className="text-xs text-primary font-bold uppercase mb-2">Discovery Tip</p>
        <p className="text-xs text-slate-600 leading-relaxed">Try using quotes for exact phrases like "Medical AI Research" to find specific publications.</p>
      </div>
    </aside>
  );
};
