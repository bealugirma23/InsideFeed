

import React, { useState } from 'react';
import { ArrowLeft, Heart, Bookmark, Share2 } from 'lucide-react';

export const ArticleSidebar: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <aside className="hidden lg:block relative">
      <div className="sticky top-28 flex flex-col items-center gap-8">
        <button className="flex flex-col items-center gap-1 group">
          <div className="size-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
            <ArrowLeft size={20} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">Feed</span>
        </button>

        <div className="w-8 h-px bg-slate-100"></div>

        <button 
          onClick={() => setLiked(!liked)}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={`size-12 rounded-full border flex items-center justify-center transition-all duration-300 ${liked ? 'bg-red-50 border-red-500 text-red-500' : 'border-slate-200 text-slate-500 group-hover:bg-red-50 group-hover:border-red-500 group-hover:text-red-500'}`}>
            <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${liked ? 'text-red-500' : 'text-slate-400'}`}>1.2k</span>
        </button>

        <button 
          onClick={() => setSaved(!saved)}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={`size-12 rounded-full border flex items-center justify-center transition-all duration-300 ${saved ? 'bg-primary border-primary text-white' : 'border-slate-200 text-slate-500 group-hover:bg-primary/10 group-hover:border-primary group-hover:text-primary'}`}>
            <Bookmark size={20} fill={saved ? 'currentColor' : 'none'} />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${saved ? 'text-primary' : 'text-slate-400'}`}>Save</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="size-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-green-500 group-hover:border-green-500 group-hover:text-white transition-all duration-300">
            <Share2 size={20} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-green-600 transition-colors">Share</span>
        </button>
      </div>
    </aside>
  );
};

