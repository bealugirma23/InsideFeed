

import React from 'react';
import { Article } from '../../../../types';
import { Newsletter } from '../../../components/NewsLetter';

interface ArticleBodyProps {
  article: Article;
}

export const ArticleBody: React.FC<ArticleBodyProps> = ({ article }) => {
  return (
    <div className="relative">
      <div className="prose prose-slate lg:prose-lg max-w-none font-serif text-slate-700">
        {article.content?.map((section, idx) => {
          switch (section.type) {
            case 'paragraph':
              return (
                <p
                  key={idx}
                  className={`text-xl leading-relaxed ${idx === 0 ? 'drop-cap' : ''}`}
                >
                  {section.text}
                </p>
              );
            case 'heading':
              return (
                <h2 key={idx} className="font-sans text-3xl font-extrabold text-slate-900 mt-12 mb-6 tracking-tight">
                  {section.text}
                </h2>
              );
            case 'subheading':
              return (
                <h3 key={idx} className="font-sans text-2xl font-bold text-slate-900 mt-10 mb-5 tracking-tight">
                  {section.text}
                </h3>
              );
            case 'blockquote':
              return (
                <blockquote key={idx} className="my-12 pl-8 border-l-4 border-primary italic text-2xl font-medium text-slate-900 leading-snug">
                  {section.text}
                </blockquote>
              );
            case 'cta':
              return <Newsletter key={idx} title={section.text} />;
            default:
              return null;
          }
        })}
      </div>

      {/* Tags section */}
      <div className="mt-16 pt-8 border-t border-slate-100">
        <div className="flex flex-wrap gap-2">
          {article.tags?.map(tag => (
            <a
              key={tag}
              href={`#${tag}`}
              className="px-4 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-full text-sm font-semibold text-slate-600 border border-slate-200 transition-colors"
            >
              #{tag}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
