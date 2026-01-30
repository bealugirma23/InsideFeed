import { useState } from "react";
import { Article, NewsArticle } from "types";

interface ResultProps {
  article: NewsArticle;
}
export const ResultCard = (props: ResultProps) => {
  const { article } = props;
  const [isSaved, setIsSaved] = useState(article.isSaved);

  return (
    <article className="bg-white p-5 rounded-xl border border-slate-200 hover:border-primary/50 transition-all flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300">
      {article.thumbnail && (
        <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
          <img alt={article.title} className="w-full h-full object-cover" src={article.thumbnail} />
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold uppercase rounded text-slate-600">
            {article.category}
          </span>
          <span className="text-xs text-slate-500">• {article.timestamp}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 leading-snug hover:text-primary cursor-pointer transition-colors">
          {article.title}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">
          {article.summary}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden ring-1 ring-slate-100">
              <img alt={article.author.name} src={article.author.avatar} />
            </div>
            <span className="text-sm font-medium">{article.author.name}</span>
            <span className="text-xs text-slate-400">{article.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 transition-colors rounded-full hover:bg-slate-50 ${isSaved ? 'text-primary bg-primary/10' : 'text-slate-400 hover:text-primary'}`}
            >
              <span className="material-icons text-xl">{isSaved ? 'bookmark' : 'bookmark_border'}</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-primary transition-colors rounded-full hover:bg-slate-50">
              <span className="material-icons text-xl">share</span>
            </button>
          </div>
        </div>
      </div>
    </article>)
}
