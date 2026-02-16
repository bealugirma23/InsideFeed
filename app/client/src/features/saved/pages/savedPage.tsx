import { MOCK_BOOKMARKS } from '@/constants';
import BookmarkCard from '@/features/discover/components/bookmarkCard';
import React, { useState, useMemo, useCallback } from 'react';
import { IoCalendar, IoCalendarOutline, IoCarSportOutline, IoGridOutline, IoListOutline, IoReorderFour } from 'react-icons/io5';
import { Bookmark } from 'types';

type Tab = 'All Articles' | 'Unread' | 'Read' | 'Archived';


export function SavedPage() {
      const [bookmarks, setBookmarks] = useState<Bookmark[]>(MOCK_BOOKMARKS);
  const [activeCollection, setActiveCollection] = useState('all');
  const [activeTab, setActiveTab] = useState<Tab>('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter(b => {
      // Search filter
      const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            b.source.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Tab filter
      if (activeTab === 'Unread' && b.isRead) return false;
      if (activeTab === 'Read' && !b.isRead) return false;
      if (activeTab === 'Archived' && !b.isArchived) return false;
      if (activeTab !== 'Archived' && b.isArchived) return false;

      // Collection filter (Simplified mapping for demo)
      if (activeCollection === 'favorites' && !b.isFavorite) return false;
      if (activeCollection === 'tech' && b.category !== 'Tech News') return false;
      if (activeCollection === 'market' && b.category !== 'Market Trends') return false;
      if (activeCollection === 'climate' && b.category !== 'Climate Change') return false;
      if (activeCollection === 'research' && b.category !== 'Research') return false;
      if (activeCollection === 'toread' && b.isRead) return false;

      return true;
    });
  }, [bookmarks, searchQuery, activeTab, activeCollection]);

  const handleToggleRead = useCallback((id: string) => {
    setBookmarks(prev => prev.map(b => b.id === id ? { ...b, isRead: !b.isRead } : b));
  }, []);

  const handleRemove = useCallback((id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  }, []);

  const readCount = useMemo(() => bookmarks.filter(b => b.isRead).length, [bookmarks]);

  return (
      <div className="flex-1 overflow-y-auto bg-white p-8 scroll-smooth">
          <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-20">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-slate-900  text-4xl font-black leading-tight tracking-[-0.033em]">
                  Saved Bookmarks
                </p>
                <p className="text-slate-500  text-base font-normal">
                  Manage your curated reading list and folders across all categories.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200  rounded-lg bg-white  text-slate-700  text-sm font-semibold hover:bg-slate-100  transition-colors shadow-sm">
                <IoCalendarOutline/>
                  <span>Date Added</span>
                </button>
                <div className="flex p-1 bg-slate-200  rounded-lg shadow-inner">
                  <button 
                    // onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md shadow-sm transition-all ${viewMode === 'list' ? 'bg-white  text-primary' : 'text-slate-500  hover:text-slate-700'}`}
                  >
                 <IoListOutline/> 
                  </button>
                  <button 
                    // onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md shadow-sm transition-all ${viewMode === 'grid' ? 'bg-white  text-primary' : 'text-slate-500  hover:text-slate-700'}`}
                  >
                    <IoGridOutline/>
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            {/* <GoalCard current={readCount} goal={20} /> */}

            {/* Tabs & Content */}
            <div className="flex flex-col gap-6">
              <div className="border-b border-slate-200  sticky top-0  d z-10 py-1">
                <div className="flex gap-8">
                  {(['All Articles', 'Unread', 'Read', 'Archived'] as Tab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center justify-center border-b-[3px] pb-3 pt-2 px-1 transition-all ${
                        activeTab === tab 
                          ? 'border-primary text-slate-900 ' 
                          : 'border-transparent text-slate-500  hover:text-slate-700 '
                      }`}
                    >
                      <p className="text-sm font-bold tracking-[0.015em]">{tab}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookmarks Display */}
              <div className={viewMode === 'list' ? "flex flex-col gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                {filteredBookmarks.length > 0 ? (
                  filteredBookmarks.map((bookmark) => (
                    <BookmarkCard
                      key={bookmark.id} 
                      bookmark={bookmark} 
                      onToggleRead={handleToggleRead}
                      onRemove={handleRemove}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
                    <p className="text-lg font-medium">No bookmarks found</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setActiveTab('All Articles'); setActiveCollection('all'); }}
                      className="mt-4 text-primary font-bold hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>

              {/* Load More */}
              {filteredBookmarks.length > 0 && (
                <div className="flex justify-center py-6">
                  <button className="flex items-center gap-2 px-6 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm group">
                    <span>Load more bookmarks</span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-y-0.5 transition-transform">expand_more</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div> 
  );
}
