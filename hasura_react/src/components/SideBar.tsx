import { LuCompass } from "react-icons/lu";
import { HiOutlineHome } from "react-icons/hi2";
import { FaRegBookmark } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import React from 'react';
import { Link } from "@tanstack/react-router";

interface TrendingTopic {
  tag: string;
  count: string;
}

interface SidebarProps {
  topics: TrendingTopic[];
}

export const Sidebar: React.FC<SidebarProps> = ({ topics }) => {
  return (
    <aside className="hidden xl:flex flex-col gap-8 w-64 shrink-0 sticky top-24 h-fit">
      <section>
        <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-3">Personalized Feed</h3>
        <nav className="flex flex-col gap-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-bold cursor-pointer">
            <HiOutlineHome />
            Home Feed
          </Link>
          <Link href="/discover" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 font-medium cursor-pointer">
            <LuCompass />
            Discover
          </Link>

          <Link href="/saved" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 font-medium cursor-pointer">
            <FaRegBookmark />
            Saved Articles
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 font-medium cursor-pointer">
            <FiSettings />
            Profile
          </Link>
        </nav>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 px-3">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Trending Topics</h3>
          <span className="material-symbols-outlined text-sm text-gray-400">trending_up</span>
        </div>
        <div className="flex flex-col gap-4 px-3">
          {topics.map(topic => (
            <div key={topic.tag} className="flex flex-col cursor-pointer group">
              <span className="text-sm font-semibold group-hover:text-primary transition-colors">{topic.tag}</span>
              <span className="text-[11px] text-gray-500">{topic.count}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-4">
        <p className="text-[11px] font-bold text-primary uppercase mb-2">Upgrade to Pro</p>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">Get ad-free reading and deep-dive analytics.</p>
        <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all shadow-sm">
          Learn More
        </button>
      </div>
    </aside>
  );
};
