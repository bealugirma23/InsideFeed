import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;
  icon: string;
  parentId?: string;
  category: string;
}

const NODES: Node[] = [
  // Central Node
  { id: 'center', label: 'Discover', x: 500, y: 400, size: 100, color: '#137fec', icon: 'hub', category: 'all' },
  
  // Primary Nodes
  { id: 'tech', label: 'Technology', x: 250, y: 250, size: 80, color: '#6366f1', icon: 'memory', category: 'Technology', parentId: 'center' },
  { id: 'finance', label: 'Finance', x: 750, y: 250, size: 80, color: '#10b981', icon: 'payments', category: 'Finance', parentId: 'center' },
  { id: 'health', label: 'Health', x: 250, y: 550, size: 80, color: '#ef4444', icon: 'vital_signs', category: 'Health', parentId: 'center' },
  { id: 'science', label: 'Science', x: 750, y: 550, size: 80, color: '#f59e0b', icon: 'science', category: 'Science', parentId: 'center' },
  { id: 'politics', label: 'Politics', x: 500, y: 150, size: 80, color: '#64748b', icon: 'gavel', category: 'Politics', parentId: 'center' },
  { id: 'world', label: 'World', x: 500, y: 650, size: 80, color: '#0ea5e9', icon: 'public', category: 'World News', parentId: 'center' },

  // Secondary Nodes (Tech)
  { id: 'ai', label: 'AI', x: 100, y: 200, size: 60, color: '#818cf8', icon: 'psychology', category: 'Technology', parentId: 'tech' },
  { id: 'quantum', label: 'Quantum', x: 150, y: 100, size: 60, color: '#a5b4fc', icon: 'blur_on', category: 'Technology', parentId: 'tech' },
  
  // Secondary Nodes (Finance)
  { id: 'crypto', label: 'Crypto', x: 900, y: 200, size: 60, color: '#34d399', icon: 'currency_bitcoin', category: 'Finance', parentId: 'finance' },
  { id: 'stocks', label: 'Stocks', x: 850, y: 100, size: 60, color: '#6ee7b7', icon: 'show_chart', category: 'Finance', parentId: 'finance' },

  // Secondary Nodes (World)
  { id: 'europe', label: 'Europe', x: 400, y: 750, size: 60, color: '#38bdf8', icon: 'map', category: 'World News', parentId: 'world' },
  { id: 'asia', label: 'Asia', x: 600, y: 750, size: 60, color: '#7dd3fc', icon: 'map', category: 'World News', parentId: 'world' },
];

export const DiscoverPage = () => {
  const navigate = useNavigate();

  const handleNodeClick = (category: string) => {
    navigate({ to: '/category', search: { type: category } });
  };

  return (
    <div className="flex-1 w-full h-full bg-white  overflow-hidden relative">
      <div className="absolute  top-10 left-10 z-10">
        <h1 className="text-4xl font-black text-slate-900  tracking-tight mb-2">Discover Trends</h1>
        <p className="text-slate-500  font-medium">Interactive map of global topics and emerging stories.</p>
      </div>

      <svg className="w-full h-full mt-10" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid meet">
        {/* Connections */}
        {NODES.map((node) => {
          if (!node.parentId) return null;
          const parent = NODES.find((p) => p.id === node.parentId);
          if (!parent) return null;

          return (
            <motion.line
              key={`line-${node.id}`}
              x1={parent.x}
              y1={parent.y}
              x2={node.x}
              y2={node.y}
              stroke={node.color}
              strokeWidth="2"
              strokeDasharray="10,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              x: [0, Math.random() * 10 - 5, 0],
              y: [0, Math.random() * 10 - 5, 0]
            }}
            transition={{ 
              delay: Math.random() * 0.5,
              duration: 2 + Math.random() * 2,
              opacity: { duration: 0.5 },
              scale: { type: 'spring', damping: 12 },
              x: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "linear" },
              y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "linear" }
            }}
            style={{ cursor: 'pointer' }}
            onClick={() => handleNodeClick(node.category)}
          >
            {/* Glow Effect */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size / 1.8}
              fill={node.color}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.4, scale: 1.2 }}
              style={{ filter: 'blur(15px)' }}
            />
            
            {/* Main Circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size / 2}
              fill="white"
              className="dark:fill-slate-900 shadow-xl"
              stroke={node.color}
              strokeWidth="3"
            />
            
            {/* Icon & Label */}
            <foreignObject 
              x={node.x - node.size / 2} 
              y={node.y - node.size / 2} 
              width={node.size} 
              height={node.size}
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-800 dark:text-white" style={{ fontSize: node.size / 3, color: node.color }}>
                  {node.icon}
                </span>
                <p className="text-[10px] font-black text-slate-900 dark:text-white mt-1 leading-none uppercase tracking-tighter">
                  {node.label}
                </p>
              </div>
            </foreignObject>
          </motion.g>
        ))}
      </svg>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
};
