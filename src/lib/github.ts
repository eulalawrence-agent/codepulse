// GitHub API — free, no key for public repos

export async function fetchRepo(owner: string, repo: string) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: { 'Accept': 'application/vnd.github.v3+json' },
    next: { revalidate: 300 }
  });
  if (!res.ok) throw new Error('Repo not found');
  return res.json();
}

export async function fetchRepoTree(owner: string, repo: string, branch = 'main') {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`, {
    headers: { 'Accept': 'application/vnd.github.v3+json' },
    next: { revalidate: 300 }
  });
  if (!res.ok) {
    // Try master branch
    const res2 = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
    });
    if (!res2.ok) throw new Error('Cannot fetch repo tree');
    return res2.json();
  }
  return res.json();
}

export async function fetchFileContent(owner: string, repo: string, path: string) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (data.encoding === 'base64') {
    return Buffer.from(data.content, 'base64').toString('utf-8');
  }
  return null;
}

export async function fetchReadme(owner: string, repo: string) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  });
  if (!res.ok) return null;
  const data = await res.json();
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

export const LANG_EXTENSIONS: Record<string, string> = {
  '.ts': 'TypeScript', '.tsx': 'React TS', '.js': 'JavaScript', '.jsx': 'React JS',
  '.py': 'Python', '.go': 'Go', '.rs': 'Rust', '.java': 'Java', '.cpp': 'C++',
  '.c': 'C', '.rb': 'Ruby', '.php': 'PHP', '.swift': 'Swift', '.kt': 'Kotlin',
  '.sol': 'Solidity', '.sql': 'SQL', '.sh': 'Shell', '.yaml': 'YAML', '.yml': 'YAML',
  '.json': 'JSON', '.md': 'Markdown', '.html': 'HTML', '.css': 'CSS', '.toml': 'TOML',
};

export function categorizeFiles(tree: any[]) {
  const categories: Record<string, { count: number; size: number; files: string[] }> = {};
  for (const item of tree.tree || []) {
    if (item.type !== 'blob') continue;
    const ext = item.path.match(/\.[^.]+$/)?.[0] || '.other';
    const lang = LANG_EXTENSIONS[ext] || ext;
    if (!categories[lang]) categories[lang] = { count: 0, size: 0, files: [] };
    categories[lang].count++;
    categories[lang].size += item.size || 0;
    if (categories[lang].files.length < 5) categories[lang].files.push(item.path);
  }
  return Object.entries(categories).sort((a, b) => b[1].count - a[1].count);
}
