import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import contentTree from '../data/contentTree.json';

const TreeNode = ({ node, name, depth, closeDrawer }) => {
  const isPost = node.type === 'post';
  const location = useLocation();

  // Top-level categories (depth === 0) start expanded by default
  const [isOpen, setIsOpen] = useState(depth === 0);

  if (isPost) {
    const postPath = `/post/${node.slug}`;
    const isActive = location.pathname === postPath;
    
    return (
      <div style={{ paddingLeft: `${depth * 1}rem` }} className="my-[4px]">
        <Link 
          to={postPath} 
          onClick={closeDrawer}
          className={`flex items-center gap-2 transition-colors ${
            isActive ? 'font-bold text-black' : 'text-black/60 hover:text-black'
          }`}
        >
          <span className="text-[12px] opacity-70 mt-[2px]">·</span>
          <span className="truncate">{node.title || name}</span>
        </Link>
      </div>
    );
  }

  // It's a folder
  return (
    <div className="my-1">
      <div 
        style={{ paddingLeft: `${depth * 1}rem` }}
        className={`flex items-center gap-2 py-1 cursor-pointer font-medium transition-colors select-none ${
          depth === 0 ? 'text-black mb-1' : 'text-black/80 hover:text-black'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[9px] w-3 text-center">{isOpen ? '▼' : '▶'}</span>
        <span className="capitalize tracking-tight truncate">{name}</span>
      </div>
      
      {isOpen && (
        <div className="flex flex-col mt-0.5">
          {Object.entries(node).map(([childKey, childNode]) => (
            <TreeNode 
              key={childKey} 
              name={childKey} 
              node={childNode} 
              depth={depth + 1}
              closeDrawer={closeDrawer}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ContentTree = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      {/* Mobile Hamburger Button - strictly hidden on desktop (md:hidden) */}
      <button 
        onClick={toggleDrawer}
        className="md:hidden fixed top-5 left-5 z-[60] text-2xl text-black/70 hover:text-black transition-colors"
        aria-label="Toggle navigation drawer"
      >
        ☰
      </button>

      {/* Backdrop for mobile */}
      {isDrawerOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside 
        className={`fixed top-0 left-0 h-screen w-64 md:w-72 bg-white/95 backdrop-blur z-50 pt-20 md:pt-16 pb-10 px-5 md:px-8 border-r border-gray-100 overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] 
          ${isDrawerOpen ? 'translate-x-0 shadow-2xl md:shadow-none' : '-translate-x-full md:translate-x-0'}`}
      >
        <nav className="flex flex-col gap-1 text-[14.5px] leading-relaxed">
          {Object.entries(contentTree).map(([categoryName, categoryNode]) => (
            <TreeNode 
              key={categoryName} 
              name={categoryName} 
              node={categoryNode} 
              depth={0} 
              closeDrawer={closeDrawer}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default ContentTree;
