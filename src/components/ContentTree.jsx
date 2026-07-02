import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import contentTree from '../data/contentTree.json';

const TreeNode = ({ node, name, depth, closeDrawer }) => {
  const isPost = node.type === 'post';
  const location = useLocation();

  // Folders start closed by default
  const [isOpen, setIsOpen] = useState(false);

  if (isPost) {
    const postPath = `/post/${node.slug}`;
    const isActive = location.pathname === postPath;

    return (
      <div style={{ paddingLeft: `${depth * 1}rem` }}>
        <Link
          to={postPath}
          onClick={closeDrawer}
          className={`flex items-center gap-2 px-3 py-1.5 -ml-3 rounded-md transition-colors font-medium ${
            isActive ? 'bg-[#E3DFCA] text-[#2B3B2D] font-semibold' : 'text-black opacity-70 hover:opacity-100 hover:bg-[#E5E1CA]/50'
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
    <div>
      <div
        style={{ paddingLeft: `${depth * 1}rem` }}
        className={`flex items-center gap-2 py-0.5 cursor-pointer font-medium transition-colors select-none text-black ${depth === 0 ? 'mb-1' : ''
          }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[10px] w-3 text-center">{isOpen ? 'v' : '>'}</span>
        <span className="capitalize truncate">{name}</span>
      </div>

      {isOpen && (
        <div className="flex flex-col mt-[2px] relative gap-[4px]">
          {/* Structural Sideline Guide */}
          <div
            className="absolute top-0 bottom-0 w-[0.5px] bg-black/20"
            style={{ left: `${(depth * 1) + 0.375}rem` }}
          />
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

const ContentTree = ({ isOpen, setIsOpen }) => {
  const closeDrawer = () => setIsOpen(false);

  return (
    <>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 transition-opacity"
          onClick={closeDrawer}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 md:w-72 bg-[#F1EEDB] z-50 pt-16 pb-10 px-5 md:px-8 border-r border-[#E0DCCA]/60 overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] 
          ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}
      >


        {/* Content Designator */}
        <div className="mb-3 pl-1">
          <span className="text-[11px] uppercase tracking-widest font-semibold text-[#A09C8B]">content</span>
        </div>

        <nav className="flex flex-col gap-0.5 text-[14px] tracking-[-0.05em] leading-relaxed">
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
