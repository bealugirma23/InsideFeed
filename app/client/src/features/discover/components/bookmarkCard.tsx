
import React from 'react';
import { Category } from 'types';
export interface Bookmark {
  id: string;
  title: string;
  category: Category;
  readTime: string;
  source: string;
  savedDate: string;
  imageUrl: string;
  isRead: boolean;
  isArchived: boolean;
  isFavorite: boolean;
}
interface BookmarkCardProps {
  bookmark: Bookmark;
  onToggleRead: (id: string) => void;
  onRemove: (id: string) => void;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark, onToggleRead, onRemove }) => {
  return (
    <div className="flex items-center gap-5 p-4 bg-white  border border-slate-200  rounded-xl hover:shadow-md transition-shadow group animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="size-24 min-w-[96px] bg-slate-200  rounded-lg overflow-hidden relative shadow-inner">
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={bookmark.imageUrl} 
          alt={bookmark.title} 
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
      </div>
      <div className="flex-1 flex flex-col gap-1 overflow-hidden">
        <div className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-widest">
          <span>{bookmark.category}</span>
          <span className="size-1 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
          <span className="text-slate-500 dark:text-slate-400 font-medium">{bookmark.readTime}</span>
        </div>
        <h4 className="text-slate-900 text-lg font-bold truncate leading-tight group-hover:text-primary transition-colors">
          {bookmark.title}
        </h4>
        <p className="text-slate-500  text-sm font-normal truncate">
          {bookmark.source} • Saved {bookmark.savedDate}
        </p>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onToggleRead(bookmark.id)}
          className={`p-2 rounded-lg transition-all ${
            bookmark.isRead 
              ? 'text-green-500 bg-green-50 dark:bg-green-950/30' 
              : 'text-slate-400 hover:text-primary hover:bg-primary/10'
          }`}
          title={bookmark.isRead ? "Mark as Unread" : "Mark as Read"}
        >
          <span className="material-symbols-outlined">{bookmark.isRead ? 'check_circle' : 'circle'}</span>
        </button>
        <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Share Article">
          <span className="material-symbols-outlined">share</span>
        </button>
        <button 
          onClick={() => onRemove(bookmark.id)}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all" 
          title="Remove"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;
