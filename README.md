# CodePulse — AI Code Review Agent

Paste a GitHub URL → Get instant AI-powered code review with 8 specialized agents.

## Features

- **8 AI Agents**: Security, Quality, Performance, Architecture, Testing, Dependencies, Docs, Refactoring
- **Real GitHub Data**: Fetches repo structure, files, metadata via free GitHub API
- **No API Key**: Uses public GitHub API (no token needed for public repos)
- **Dark Theme**: Professional dashboard with scores and issue breakdown
- **Instant Analysis**: Paste URL → get results in seconds

## Agents

| Agent | Focus | Tokens/File |
|-------|-------|-------------|
| 🛡️ Security Scanner | Vulns, injection, XSS, CSRF | 20K |
| ✨ Code Quality | Code smells, complexity | 15K |
| ⚡ Performance | N+1 queries, memory leaks | 18K |
| 🏗️ Architecture | Design patterns, dependencies | 25K |
| 🧪 Test Coverage | Tests, edge cases, mocking | 12K |
| 📦 Dependency Audit | CVEs, licenses, bundle | 8K |
| 📝 Documentation | README, JSDoc, API docs | 10K |
| 🔄 Refactor Advisor | Duplication, abstractions | 20K |

## Tech Stack

- Next.js 14 (React)
- Tailwind CSS
- TypeScript
- GitHub REST API (free)
- MiMo V2.5 (FREE)

## Getting Started

```bash
npm install
npm run dev
```

## License

MIT
