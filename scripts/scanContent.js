import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');
const dataDir = path.join(process.cwd(), 'src', 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const contentTree = {};
const allPosts = [];

function parseFile(absolutePath, relPath) {
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const lines = content.split('\n');
  let title = '';
  let summary = '';
  let h1Found = false;
  let h1LineIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('# ')) {
      title = line.substring(2).trim();
      h1Found = true;
      h1LineIndex = i;
      break;
    }
  }

  if (!h1Found) {
    console.warn(`Warning: No H1 found in ${absolutePath}`);
    const basename = path.basename(absolutePath, '.md');
    // Replace dashes and underscores with spaces
    title = basename.replace(/[-_]/g, ' ');
  }

  // Find summary: first non-empty paragraph of body text after H1
  // A non-empty paragraph is text not starting with '#' and not empty
  const startIdx = h1Found ? h1LineIndex + 1 : 0;
  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line !== '' && !line.startsWith('#')) {
      summary = line;
      break;
    }
  }

  // Derive fields
  // Handle cross-platform path separators
  const normalizedRelPath = relPath.split(path.sep).join('/');
  const pathParts = normalizedRelPath.split('/');
  const category = pathParts[0];
  const slug = normalizedRelPath.slice(0, -3); // remove .md
  const filePath = `content/${slug}.md`;
  
  const stats = fs.statSync(absolutePath);
  // Format date as YYYY-MM-DD
  const date = stats.mtime.toISOString().split('T')[0];

  const post = {
    type: 'post',
    slug,
    filePath,
    title,
    date,
    summary,
    category
  };
  return post;
}

function processDirectory(currentPath, currentRelativePath, treeNode) {
  const items = fs.readdirSync(currentPath);
  
  for (const item of items) {
    // Skip images subfolders entirely
    if (item === 'images') continue;

    const itemPath = path.join(currentPath, item);
    const itemRelativePath = currentRelativePath ? path.join(currentRelativePath, item) : item;
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      treeNode[item] = {};
      processDirectory(itemPath, itemRelativePath, treeNode[item]);
    } else if (stats.isFile() && item.endsWith('.md')) {
      const post = parseFile(itemPath, itemRelativePath);
      const nameWithoutExt = path.basename(item, '.md');
      treeNode[nameWithoutExt] = post;
      allPosts.push(post);
    }
  }
}

if (fs.existsSync(contentDir)) {
  processDirectory(contentDir, '', contentTree);
} else {
  console.error(`Content directory not found at ${contentDir}`);
  process.exit(1);
}

// Sort allPosts by date descending
allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(path.join(dataDir, 'contentTree.json'), JSON.stringify(contentTree, null, 2));
fs.writeFileSync(path.join(dataDir, 'allPosts.json'), JSON.stringify(allPosts, null, 2));

console.log('Successfully generated contentTree.json and allPosts.json!');

function copyImages(srcDir, destDir) {
  let copiedCount = 0;
  
  function walkDir(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const isDir = fs.statSync(itemPath).isDirectory();
      
      if (isDir) {
        if (item === 'images') {
          // Found an images directory, calculate relative path
          const relativePath = path.relative(contentDir, itemPath);
          const targetPath = path.join(destDir, relativePath);
          
          if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
          }
          fs.cpSync(itemPath, targetPath, { recursive: true });
          copiedCount++;
        } else {
          // Continue walking down
          walkDir(itemPath);
        }
      }
    }
  }

  walkDir(srcDir);
  return copiedCount;
}

const publicContentDir = path.join(process.cwd(), 'public', 'content');
console.log('[scan-content] Copying content images to public/content...');
const copiedFolders = copyImages(contentDir, publicContentDir);
console.log(`[scan-content] Copied ${copiedFolders} image folder(s).`);
