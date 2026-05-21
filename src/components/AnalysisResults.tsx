'use client'

export default function AnalysisResults({ analysis }: { analysis: any }) {
  if (!analysis) return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-8 text-center">
      <div className="text-4xl mb-3">🔍</div>
      <h3 className="text-lg font-semibold text-white">Ready to Analyze</h3>
      <p className="text-sm text-[#8b949e] mt-2">Paste a GitHub URL above and click Analyze</p>
    </div>
  )

  const { agents, totalIssues, scores } = analysis
  const overallScore = scores?.overall || 0

  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Overall Score</h3>
          <div className="text-3xl font-bold" style={{ color: overallScore >= 80 ? '#3fb950' : overallScore >= 60 ? '#d29922' : '#f85149' }}>
            {overallScore}/100
          </div>
        </div>
        <div className="mt-3 h-3 bg-[#0d1117] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${overallScore}%`, backgroundColor: overallScore >= 80 ? '#3fb950' : overallScore >= 60 ? '#d29922' : '#f85149' }} />
        </div>
        <div className="flex gap-4 mt-3 text-sm">
          <span className="text-[#f85149]">🔴 {totalIssues?.critical || 0} Critical</span>
          <span className="text-[#d29922]">🟡 {totalIssues?.warning || 0} Warnings</span>
          <span className="text-[#58a6ff]">🔵 {totalIssues?.info || 0} Info</span>
        </div>
      </div>

      {/* Agent Results */}
      {agents?.map((agent: any, i: number) => (
        <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{agent.icon}</span>
              <h4 className="font-semibold text-white">{agent.name}</h4>
            </div>
            <div className="text-sm font-mono" style={{ color: agent.score >= 80 ? '#3fb950' : agent.score >= 60 ? '#d29922' : '#f85149' }}>
              {agent.score}/100
            </div>
          </div>
          <p className="text-sm text-[#8b949e] mb-3">{agent.summary}</p>
          {agent.issues?.length > 0 && (
            <div className="space-y-2">
              {agent.issues.map((issue: any, j: number) => (
                <div key={j} className="flex items-start gap-2 text-sm p-2 bg-[#0d1117] rounded">
                  <span>{issue.severity === 'critical' ? '🔴' : issue.severity === 'warning' ? '🟡' : '🔵'}</span>
                  <div>
                    <span className="text-[#c9d1d9]">{issue.message}</span>
                    {issue.file && <span className="text-[#58a6ff] ml-2">({issue.file})</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
