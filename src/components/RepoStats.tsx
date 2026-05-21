'use client'

export default function RepoStats({ repo }: { repo: any }) {
  const fmt = (n: number) => {
    if (n >= 1000) return `${(n/1000).toFixed(1)}k`
    return String(n)
  }
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
      <div className="flex items-center gap-4">
        <img src={repo.owner?.avatar_url} alt="" className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <h2 className="text-lg font-bold text-white">{repo.full_name}</h2>
          <p className="text-sm text-[#8b949e]">{repo.description || 'No description'}</p>
        </div>
        <div className="flex gap-6 text-center">
          <div><div className="text-lg font-bold text-[#d29922]">⭐ {fmt(repo.stargazers_count)}</div><div className="text-xs text-[#8b949e]">Stars</div></div>
          <div><div className="text-lg font-bold text-[#3fb950]">🍴 {fmt(repo.forks_count)}</div><div className="text-xs text-[#8b949e]">Forks</div></div>
          <div><div className="text-lg font-bold text-[#58a6ff]">🐛 {repo.open_issues_count}</div><div className="text-xs text-[#8b949e]">Issues</div></div>
          <div><div className="text-lg font-bold text-[#bc8cff]">📝 {repo.language || 'N/A'}</div><div className="text-xs text-[#8b949e]">Language</div></div>
        </div>
      </div>
    </div>
  )
}
