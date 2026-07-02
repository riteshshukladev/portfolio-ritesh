import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import contentTree from '../data/contentTree.json';
import '../styles/markdown.css';

// Use query: '?raw', import: 'default' for Vite >= 5 instead of as: 'raw' to prevent build errors
const modules = import.meta.glob('/content/**/*.md', { query: '?raw', import: 'default', eager: false });

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function formatDate(dateStr) {
  if (!dateStr) return '';
  const dateObj = new Date(dateStr);
  const day = dateObj.getUTCDate().toString().padStart(2, '0');
  const month = monthNames[dateObj.getUTCMonth()];
  const year = dateObj.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

const PostPage = ({ onOpenDrawer }) => {
  const { '*': slug } = useParams();
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Find post in contentTree
  let post = null;
  if (slug) {
    const parts = slug.split('/');
    let current = contentTree;
    for (const part of parts) {
      if (current && current[part]) {
        current = current[part];
      } else {
        current = null;
        break;
      }
    }
    if (current && current.type === 'post') {
      post = current;
    }
  }

  // Load markdown content dynamically
  useEffect(() => {
    let isMounted = true;

    if (!post) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setMarkdownContent('');

    const filePath = `/${post.filePath}`;
    const loader = modules[filePath];

    if (loader) {
      loader().then(raw => {
        if (!isMounted) return;

        let contentToSet = raw;
        // The Vite 5 `?raw` loader often returns string directly but just in case it's an object with default
        if (typeof raw === 'object' && raw.default) {
          contentToSet = raw.default;
        }

        // Strip frontmatter (--- delimited block) if present
        const lines = contentToSet.split('\n');
        let bodyStart = 0;
        if (lines[0] && lines[0].trim() === '---') {
          for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
              bodyStart = i + 1;
              break;
            }
          }
        }
        // Strip the first H1 line if it exists in the body
        if (lines[bodyStart] && lines[bodyStart].trim().startsWith('# ')) {
          bodyStart++;
        }

        const rawBody = lines.slice(bodyStart).join('\n');

        // Rewrite image paths to public URLs
        const slugDir = slug.split('/').slice(0, -1).join('/');
        function rewriteImagePaths(markdown, dir) {
          return markdown.replace(
            /!\[([^\]]*)\]\(\.\/images\/([^)]+)\)/g,
            (_, alt, filename) => `![${alt}](/content/${dir}/images/${filename})`
          );
        }

        const rewritten = rewriteImagePaths(rawBody, slugDir);

        setMarkdownContent(rewritten);
        setIsLoading(false);
      }).catch(err => {
        console.error('Failed to load markdown file:', err);
        if (isMounted) setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [post]);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6 mt-16 md:mt-24">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <p className="mb-6 opacity-70">We couldn't track down the entry you were looking for.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          &larr; Head back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="w-full max-w-4xl mx-auto pt-0 pb-6 px-6 md:px-12 lg:px-16">
      {/* Post Header */}
      <header>
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 md:gap-2 text-[12px] font-semibold text-gray-500 mb-2 lowercase tracking-wider text-[#9A937F]">
          <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">Home</Link>
          {slug && slug.split('/').map((crumb, idx, arr) => {
            const pathSoFar = arr.slice(0, idx + 1).join('/');
            return (
              <React.Fragment key={idx}>
                <span className="opacity-50">›</span>
                {idx === arr.length - 1 ? (
                  <span className="opacity-100 text-[#C16B4A]">
                    {crumb.replace(/-/g, ' ')}
                  </span>
                ) : (
                  <button onClick={onOpenDrawer} className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none p-0 font-semibold text-[#9A937F]">
                    {crumb.replace(/-/g, ' ')}
                  </button>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        <h1 className="text-3xl md:text-[36px] font-medium tracking-tight mb-0 zilla-text text-[#2B3B2D]">
          {post.title}
        </h1>

        <time className="block text-[13px] font-medium text-[#9A937F] mt-1 mb-5 select-none tracking-wide">
          {formatDate(post.date)}
        </time>
        <hr className="border-t border-[#DFDBCB] mb-4" />
      </header>

      {/* Markdown Body */}
      <div className="markdown-body">
        {isLoading ? (
          <div className="py-10 text-gray-400 animate-pulse font-medium">
            Loading post...
          </div>
        ) : (
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        )}
      </div>
    </article>
  );
};

export default PostPage;
