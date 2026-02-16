import { useState } from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import { useQuery, useMutation } from "@tanstack/react-query";
import { graphqlRequest } from "@/lib/graphql-client";
import { GET_CATEGORIES } from "@/graphql/categories";
import { CREATE_USER_INTERESTS } from "@/graphql/userInterests";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";

export interface Interest {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category_type?: 'Recommended' | 'Trending' | 'Latest';
  color?: string;
}

export function InterestsPage() {
  const navigate = useNavigate();
  const session = authClient.useSession();
  const userId = session.data?.user?.id || 'mock-user-id'; // Fallback for testing

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'Recommended' | 'Trending' | 'Latest'>('Recommended');

  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => graphqlRequest<{ categories: Interest[] }>(GET_CATEGORIES),
  });

  const categories = categoriesData?.categories || [];

  const { mutate: saveInterests, isPending: isSaving } = useMutation({
    mutationFn: (ids: string[]) => {
      const objects = ids.map(categoryId => ({
        userId,
        categoryId
      }));
      return graphqlRequest(CREATE_USER_INTERESTS, { objects });
    },
    onSuccess: () => {
      navigate({ to: '/' });
    },
  });

  const toggleInterest = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const filteredInterests = categories.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase());
    // Mapping backend categories to UI categories if needed, for now just show all if search is active
    // Since real categories might not have 'category_type', we show them all or handle mapping
    return matchesSearch;
  });

  const selectedList = categories.filter(i => selectedIds.has(i.id));
  const canFinish = selectedIds.size >= 3;

  const handleFinish = () => {
    if (canFinish) {
      saveInterests(Array.from(selectedIds));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <span className="material-symbols-outlined text-3xl font-black">hub</span>
            </div>
            <h2 className="text-xl font-black tracking-tighter">InsideFeed</h2>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step 1 of 2</span>
            <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-1/2 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-5xl font-black tracking-tight leading-tight mb-4">What are you interested in?</h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            Select topics that matter to you. We'll use these to build your personalized feed. Choose at least 3.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <div className="flex items-center rounded-2xl h-14 bg-white border border-slate-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-sm">
            <span className="material-symbols-outlined ml-5 text-slate-400">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-lg font-medium placeholder:text-slate-400"
              placeholder="Search for topics (e.g. AI, Crypto, Fashion)"
            />
          </div>
        </div>

        {/* Categories (Simplified as backend might not have these groups) */}
        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Popular Topics</p>
          <div className="flex gap-4 flex-wrap">
            {(['Recommended', 'Trending', 'Latest'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex h-11 items-center gap-2 rounded-full px-6 transition-all font-bold text-sm ${activeCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                  }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {cat === 'Recommended' ? 'star' : cat === 'Trending' ? 'trending_up' : 'schedule'}
                </span>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredInterests.map(item => {
            const isSelected = selectedIds.has(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleInterest(item.id)}
                className={`relative group cursor-pointer  rounded-2xl border-2 p-6 flex flex-col justify-between transition-all hover:shadow-xl ${isSelected ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-slate-100 bg-white hover:border-primary'
                  }`}
              >
                <div className="flex justify-between items-start">
                  {isSelected && (
                 <IoShieldCheckmark size={24} className="text-primary" /> 
                  )}
                </div>
                <div>
                  <h3 className="font-black text-xl mb-1">{item.name}</h3>
                  <p className="text-xs font-bold text-slate-400">{item.description || "Explore news in " + item.name}</p>
                </div>
              </div>
            );
          })}

          <div className="group cursor-pointer aspect-4/3 rounded-2xl border-2 border-dashed border-slate-200 bg-transparent p-6 flex flex-col items-center justify-center gap-4 transition-all hover:border-primary hover:bg-white">
            <div className="text-slate-300 group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-5xl">add_circle</span>
            </div>
            <p className="font-black text-slate-400 group-hover:text-primary">Add Custom</p>
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 p-6 z-50">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {selectedList.slice(0, 3).map((item, idx) => (
                <div
                  key={item.id}
                  className={`w-10 h-10 rounded-full border-4 border-white flex items-center justify-center text-white font-bold shadow-sm`}
                  style={{ backgroundColor: '#137fec' }}
                >
                  <span className="material-symbols-outlined text-sm">{item.icon || 'topic'}</span>
                </div>
              ))}
              {selectedList.length > 3 && (
                <div className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-black shadow-sm">
                  +{selectedList.length - 3}
                </div>
              )}
            </div>
            <p className="text-sm font-bold text-slate-700">
              {selectedIds.size} {selectedIds.size === 1 ? 'interest' : 'interests'} selected
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              className="px-8 py-3 text-sm font-black text-slate-400 hover:text-slate-900 transition-colors"
            >
              Back
            </button>
            <button
              disabled={!canFinish || isSaving}
              onClick={handleFinish}
              className={`flex-1 md:flex-none min-w-[220px] px-10 py-4 rounded-xl font-black shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 ${canFinish
                  ? 'bg-primary text-white shadow-primary/30 hover:bg-primary/90'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
            >
              {isSaving ? (
                 <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Finish Setup</span>
                  <span className="material-symbols-outlined font-black">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>);
}
