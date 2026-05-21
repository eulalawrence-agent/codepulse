'use client'

import { useState } from 'react'
import RepoStats from '@/components/RepoStats'
import AgentPanel from '@/components/AgentPanel'
import AnalysisResults from '@/components/AnalysisResults'

export default function Home() {
  const [url, setUrl] = useState('')
  const [repo, setRepo] = useState<any>(null)
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!url) return
    setLoading(true)
    setError('')
    setAnalysis(null)
    try {
      const res = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setRepo(data.repo)
      setAnalysis(data.analysis)
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Header */}
      <header className="border-b border-[#30363d] px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3fb950] to-[#58a6ff] flex items-center justify-center text-xl">⚡</div>
          <div>
            <h1 className="text-xl font-bold text-white">CodePulse</h1>
            <p className="text-xs text-[#8b949e]">AI Code Review • 8 Agents • Paste GitHub URL</p>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Analyze a Repository</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
              placeholder="https://github.com/vercel/next.js"
              className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 text-white placeholder-[#484f58] focus:border-[#58a6ff] focus:outline-none"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-6 py-3 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold rounded-lg disabled:opacity-50 transition-colors"
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
          {error && <div className="mt-3 text-sm text-[#f85149]">{error}</div>}
          <div className="mt-3 text-xs text-[#8b949e]">
            Free • No API key needed • Uses GitHub public API
          </div>
        </div>
      </div>

      {/* Results */}
      {repo && (
        <div className="max-w-[1400px] mx-auto px-6 pb-8 space-y-6">
          <RepoStats repo={repo} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AnalysisResults analysis={analysis} />
            </div>
            <div>
              <AgentPanel />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
