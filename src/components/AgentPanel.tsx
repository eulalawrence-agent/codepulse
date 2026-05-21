'use client'

import { AGENTS } from '@/lib/agents'

export default function AgentPanel() {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">🤖 Review Agents</h3>
      <div className="space-y-2">
        {AGENTS.map(agent => (
          <div key={agent.id} className="flex items-center gap-3 p-2 rounded bg-[#0d1117] border border-[#30363d]">
            <div className="text-lg">{agent.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white">{agent.name}</div>
              <div className="text-xs text-[#8b949e] truncate">{agent.desc}</div>
            </div>
            <div className="text-xs font-mono" style={{ color: agent.color }}>{agent.tokens}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
