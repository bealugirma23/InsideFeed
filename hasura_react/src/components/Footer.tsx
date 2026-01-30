

import React from 'react';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 bg-white border-t border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Zap size={16} fill="currentColor" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">NewsPulse</h2>
            </div>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
              Delivering high-quality journalism on the technologies that shape our future. Join our community of over 1.2M monthly readers.
            </p>
            <div className="flex gap-4">
               {[Twitter, Github, Linkedin].map((Icon, i) => (
                 <a key={i} href="#" className="p-2.5 bg-slate-50 rounded-full text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                   <Icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Platform</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Writers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Support</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400 font-medium">
          <p>© 2023 NewsPulse Media Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <span>v2.4.0</span>
             <div className="flex items-center gap-1.5 text-slate-300">
                <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>System Status: Healthy</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
