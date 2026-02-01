

import React from 'react';
import { Article } from '../../types';
import { LuBookmark, LuHeart, LuSaveOff, LuShare, LuShare2 } from 'react-icons/lu';
import { Link } from '@tanstack/react-router';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  if (article.category === 'Editorial Pick') {
    return (
      <article className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-4">Editorial Pick</span>
        <h4 className="text-xl font-bold leading-tight mb-4 italic text-[#111418]">
          {article.title}
        </h4>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-300">
            {article.author?.avatar && <img src={article.author.avatar} alt={article.author.name} className="w-full h-full rounded-full object-cover" />}
          </div>
          <span className="text-xs text-gray-500 font-medium">By {article.author?.name} • {article.source}</span>
        </div>
      </article>
    );
  }

  if (article.isSponsored) {
    return (
      <article className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Sponsored</span>
          <span className="material-symbols-outlined text-[16px] text-gray-300">info</span>
        </div>
        {article.image && (
          <img className="w-full h-32 object-cover rounded-lg mb-4" src={article.image} alt={article.title} />
        )}
        <h4 className="text-md font-bold leading-tight mb-2 hover:text-primary cursor-pointer transition-colors">
          {article.title}
        </h4>
        <p className="text-xs text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
        <button className="w-full py-2 border border-gray-200 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors">
          Get the Guide
        </button>
      </article>
    );
  }

  return (
    <Link to={"/article/$articleId"} params={{ articleId: article.id }}>
    <article className="bg-white  border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
      {article.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={article.image}
            alt={article.title}
          />
          <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
            {article.category}
          </div>
        </div>
      )}
      <div className="p-5 flex-1">
        {!article.image && (
          <div className="mb-4">
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
              {article.category}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          {article.source === 'TechDaily' ? (
            <img className="w-5 h-5 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyAKGB1AsScPwD59HSLcZHqj4frsDKBqILcQRB0W1-0CuFWKYhg90mfKGmy1E-zWCQCZUJ3cvIe6G7cJnS5TnENIO-XaPZqjur7tisZ7Ff2GT748ZUz7loZI_A8-w6biJnY9s18GWlwga2pdlPH9D-8QRWJz1qkc_W47WEhwppNG9yIhyrLA3XICTvU2W3duuMQfXtbzro2E_VBJ5NPcJm42UbSsXBO5L4GQoad2Cn1GpyycwzGVqu4M-5PUEBSKpgknJly00NtYDR" alt="logo" />
          ) : (
            <div className={`w-2 h-2 rounded-full ${article.category === 'Finance' ? 'bg-amber-500' : 'bg-gray-400'}`}></div>
          )}
          <span className="text-xs text-gray-500 font-medium">
            {article.source} {article.timeAgo ? `• ${article.timeAgo}` : ''} {article.readTime ? `• ${article.readTime}` : ''}
          </span>
        </div>

        <h4 className="text-lg font-bold leading-tight mb-2 hover:text-primary cursor-pointer transition-colors">
          {article.title}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{article.excerpt}</p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center gap-4 text-gray-400">
            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <LuHeart />
              <span className="text-xs font-medium">{article.likes || '0'}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <LuShare2 />
              <span className="text-xs font-medium">{article.shares || ''}</span>
            </button>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
            <LuBookmark />
          </button>
        </div>
      </div>
    </article>
    </Link>
  )
};
