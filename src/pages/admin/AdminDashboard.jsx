import { useEffect, useState } from "react"
import {
  Users,
  Trophy,
  FileCheck2,
  IndianRupee,
  Search,
  X,
  CheckCircle2,
  Layers3,
  BookOpen,
} from "lucide-react"
import api from "../../api"

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [certs, setCerts] = useState([])
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchStats()
    fetchCerts()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats")
      setStats(res.data)
    } catch (err) {
      console.error("Failed to load platform stats:", err)
    }
  }

  const fetchCerts = async () => {
    try {
      const res = await api.get("/certifications")
      setCerts(res.data)
    } catch (err) {
      console.error("Failed to load certifications:", err)
    }
  }

  if (!stats) {
    return (
      <div className="space-y-4 animate-pulse max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-white/[0.02] border border-white/5 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  const filtered = certs.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-5xl space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.02] pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400 text-[10px] font-medium mb-1.5">
            <Layers3 className="w-3 h-3 text-[#11B5FF]" />
            Control Center
          </div>
          <h1 className="text-sm font-semibold tracking-tight text-white">
            Platform Operations
          </h1>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Filter program collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-8.5 rounded-lg bg-white/[0.02] border border-white/5 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#11B5FF]/30 transition"
          />
        </div>
      </div>

      {/* METRICS OVERVIEW GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Total Registry Users" value={stats.totalUsers} icon={Users} color="text-[#11B5FF]" />
        <StatCard title="Active Programs" value={stats.totalCertifications} icon={Trophy} color="text-emerald-400" />
        <StatCard title="Exam Submissions" value={stats.totalAttempts} icon={FileCheck2} color="text-amber-400" />
        <StatCard title="Gross Earnings" value={`₹${stats.totalRevenue}`} icon={IndianRupee} color="text-rose-400" />
      </div>

      {/* CERTIFICATION CATALOG BLOCK */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Assigned Track Programs
            </h2>
          </div>
          <span className="text-[10px] bg-white/5 text-slate-400 px-1.5 py-0.5 rounded-md font-medium">
            {filtered.length} Items Listed
          </span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-white/10 transition-all duration-200"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] text-[#11B5FF] font-medium px-2 py-0.5 bg-[#11B5FF]/5 border border-[#11B5FF]/10 rounded-md">
                    {c.category?.name || "Unassigned"}
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                </div>

                <h3 className="font-semibold text-xs text-white tracking-tight line-clamp-1 mb-1.5 group-hover:text-[#11B5FF] transition-colors">
                  {c.title}
                </h3>
                
                <p className="text-slate-400 text-[11px] leading-normal line-clamp-2 min-h-[32px]">
                  {c.description}
                </p>
              </div>

              <div className="px-4 pb-4 pt-2 bg-white/[0.01] border-t border-white/[0.02] flex items-center justify-between text-[10px]">
                <div>
                  <p className="text-slate-500 font-medium">Syllabus Matrix</p>
                  <p className="text-slate-300 font-mono mt-0.5">{c.questions?.length || 0} Questions</p>
                </div>
                <button
                  onClick={() => setSelected(c)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-2.5 py-1 rounded-md transition font-medium"
                >
                  Inspect Matrix
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INSPECTION SHEET (MODAL OVERLAY) */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl max-h-[80vh] overflow-hidden rounded-xl bg-zinc-900 border border-white/5 shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-white/[0.05] flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#11B5FF] uppercase font-semibold tracking-wider">
                  {selected.category?.name || "General Track"}
                </span>
                <h2 className="text-sm font-semibold text-white tracking-tight mt-0.5">
                  {selected.title}
                </h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="p-4 overflow-y-auto space-y-4 flex-1 bg-white/[0.01]">
              <div className="text-[11px] text-slate-400 leading-relaxed bg-white/[0.02] border border-white/5 rounded-lg p-3">
                {selected.description}
              </div>

              <div className="space-y-3">
                <h4 className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  Curriculum Questionnaire ({selected.questions?.length || 0})
                </h4>

                {selected.questions?.map((q, i) => (
                  <div key={q.id} className="bg-white/[0.02] border border-white/5 p-3 rounded-lg space-y-2">
                    <p className="text-xs font-medium text-white leading-tight">
                      {i + 1}. {q.question}
                    </p>

                    <div className="grid grid-cols-1 gap-1.5 pt-1">
                      {q.options.map((opt, idx) => {
                        const isCorrect = idx === q.correctAnswer
                        return (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 border text-[11px] font-medium transition ${
                              isCorrect
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                : "bg-white/[0.01] border-white/5 text-slate-400"
                            }`}
                          >
                            {isCorrect ? (
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-700 mx-1 shrink-0" />
                            )}
                            <span className="line-clamp-1">{opt}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* Localized Shared Metric Card component */
function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/5 p-4 flex items-center justify-between">
      <div className="min-w-0">
        <p className="text-slate-500 text-[11px] font-medium truncate">
          {title}
        </p>
        <h2 className="text-lg font-bold tracking-tight text-white font-mono mt-1">
          {value}
        </h2>
      </div>
      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
    </div>
  )
}