import { MetadataRoute } from 'next';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://www.skillyards.in';

// Paths to exclude from sitemap (private, utility, dynamic placeholders)
const EXCLUDED_PATHS = new Set([
  '/api',
  '/admin',
  '/_next',
  '/_error',
  '/unsubscribe',
  '/feedback',
  '/campaigns',
  '/test',
  '/thank-you-contact',
  '/sitemap', // the HTML sitemap page is fine, but excluded from XML to avoid recursion
]);

// Dynamic route segments to skip (we'd need DB/filesystem lookups for slugs)
const DYNAMIC_SEGMENT = /^\[.+\]$/;

function walkAppDir(dir: string, basePath = ''): string[] {
  const routes: string[] = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch (e) {
    return routes;
  }

  // If this directory has a page.jsx/page.tsx/page.js, it's a route
  const hasPage = entries.some(
    (e) => e === 'page.jsx' || e === 'page.tsx' || e === 'page.js'
  );
  if (hasPage && basePath !== '/api' && !basePath.startsWith('/api/')) {
    const url = basePath || '/';
    if (!EXCLUDED_PATHS.has(url) && !shouldExclude(url)) {
      routes.push(url);
    }
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    let isDir = false;
    try {
      isDir = statSync(fullPath).isDirectory();
    } catch {
      continue;
    }
    if (!isDir) continue;
    if (entry.startsWith('_')) continue; // _components, _lib, etc.
    if (entry.startsWith('(') && entry.endsWith(')')) {
      // Route group — descend but don't add to path
      routes.push(...walkAppDir(fullPath, basePath));
      continue;
    }
    if (DYNAMIC_SEGMENT.test(entry)) continue; // skip [slug], [uuid] for now
    routes.push(...walkAppDir(fullPath, `${basePath}/${entry}`));
  }
  return routes;
}

function shouldExclude(path: string): boolean {
  for (const excluded of EXCLUDED_PATHS) {
    if (path === excluded || path.startsWith(`${excluded}/`)) return true;
  }
  return false;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = join(process.cwd(), 'src', 'app');
  const routes = walkAppDir(appDir);

  // TODO: When blog or careers content is finalized, add dynamic slugs here
  // by querying your DB or fetching the slugs list.

  const uniqueRoutes = Array.from(new Set(routes)).sort();

  return uniqueRoutes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1.0 : path.startsWith('/blog/') ? 0.6 : 0.8,
  }));
}
