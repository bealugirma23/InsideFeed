

import React from 'react';

interface NewsletterProps {
  title: string;
}

export const Newsletter: React.FC<NewsletterProps> = ({ title }) => {
  return (
    <div className="my-12 p-8 bg-primary/5 rounded-3xl border border-primary/10 relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 size-48 bg-primary/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
      
      <div className="relative z-10">
        <h4 className="font-sans font-extrabold text-2xl text-slate-900 mb-2">{title}</h4>
        <p className="font-sans text-base text-slate-600 mb-6">
          Join 50k+ readers getting weekly insights on the future of technology, policy, and urban design.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="flex-1 rounded-2xl border-slate-200 bg-white px-5 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          />
          <button className="bg-primary text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};
