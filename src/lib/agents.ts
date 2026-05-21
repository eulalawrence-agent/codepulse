// 8 specialized code review agents

export const AGENTS = [
  {
    id: 'security',
    name: 'Security Scanner',
    icon: '🛡️',
    desc: 'Detects vulnerabilities, injection attacks, XSS, CSRF, hardcoded secrets',
    tokens: '20K/file',
    color: '#f85149',
  },
  {
    id: 'quality',
    name: 'Code Quality',
    icon: '✨',
    desc: 'Code smells, anti-patterns, complexity analysis, readability',
    tokens: '15K/file',
    color: '#58a6ff',
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: '⚡',
    desc: 'N+1 queries, memory leaks, unnecessary re-renders, bundle size',
    tokens: '18K/file',
    color: '#d29922',
  },
  {
    id: 'architecture',
    name: 'Architecture',
    icon: '🏗️',
    desc: 'Design patterns, separation of concerns, dependency direction',
    tokens: '25K/file',
    color: '#bc8cff',
  },
  {
    id: 'testing',
    name: 'Test Coverage',
    icon: '🧪',
    desc: 'Test quality, edge cases, mocking patterns, coverage gaps',
    tokens: '12K/file',
    color: '#3fb950',
  },
  {
    id: 'dependency',
    name: 'Dependency Audit',
    icon: '📦',
    desc: 'Outdated packages, known CVEs, license compliance, bundle impact',
    tokens: '8K/repo',
    color: '#db6d28',
  },
  {
    id: 'documentation',
    name: 'Documentation',
    icon: '📝',
    desc: 'README quality, JSDoc coverage, API docs, inline comments',
    tokens: '10K/file',
    color: '#58a6ff',
  },
  {
    id: 'refactor',
    name: 'Refactor Advisor',
    icon: '🔄',
    desc: 'Duplication detection, abstraction opportunities, naming improvements',
    tokens: '20K/file',
    color: '#3fb950',
  },
];

export interface AnalysisResult {
  agent: string;
  issues: { severity: 'critical' | 'warning' | 'info'; message: string; file?: string }[];
  score: number;
  summary: string;
}
