

import React from 'react';
import { RelatedNews } from '../../../../types';

interface RelatedSidebarProps {
  related: RelatedNews[];
}

export const RelatedSidebar: React.FC<RelatedSidebarProps> = ({ related }) => {
  return (
    <aside className="space-y-12">
      <div className="sticky top-28">
        <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-3">
          Related News
          <span className="flex-1 h-px bg-slate-100"></span>
        </h3>
        
        <div className="space-y-10">
          {related.map((news) => (
            <a key={news.id} href="#" className="group block">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-slate-100 ring-1 ring-slate-200">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h4 className="font-bold text-base leading-snug text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                {news.title}
              </h4>
              <div className="flex items-center gap-2 mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span>{news.readTime}</span>
                <span className="size-1 bg-slate-200 rounded-full"></span>
                <span className="text-primary/70">{news.category}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Discovery Section */}
        <div className="mt-16 pt-8 border-t border-slate-100">
           <div className="bg-slate-50 p-6 rounded-2xl">
              <h5 className="font-bold text-sm text-slate-900 mb-3">Trending in Tech</h5>
              <div className="space-y-4">
                 {[
                   'The Rise of Liquid Neural Networks',
                   'Quantum Supremacy: A 2024 Update',
                   'Ethical Frameworks for AGI'
                 ].map(t => (
                   <p key={t} className="text-sm font-medium text-slate-600 hover:text-primary cursor-pointer transition-colors flex items-start gap-2">
                      <span className="text-slate-300 font-bold">•</span>
                      {t}
                   </p>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </aside>
  );
};
