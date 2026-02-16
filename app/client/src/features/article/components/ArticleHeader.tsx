
import React from 'react';
import { Article } from '../../../../types';

interface ArticleHeaderProps {
  article: Article;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  return (
    <header className="mb-8">
      <div className="mb-6">
        <span className="inline-flex items-center px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-widest rounded-full ring-1 ring-inset ring-primary/20">
          {article.category}
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] text-slate-900 tracking-tight mb-8">
        {article.title}
      </h1>

      {/* <div className="flex items-center justify-between py-8 border-y border-slate-100">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-full bg-slate-100 ring-4 ring-slate-50 overflow-hidden">
            <img
              src={article.author?.avatar}
              alt={article.author?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900 hover:text-primary transition-colors cursor-pointer">
              {article.author?.name}
            </span>
            <span className="text-sm text-slate-500 font-medium">
              Published {article.publishedDate} • {article.readTime}
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-bold text-primary bg-primary/5 hover:bg-primary hover:text-white rounded-lg transition-all duration-200">
            Follow
          </button>
        </div>
      </div> */}
    </header>
  );
};
