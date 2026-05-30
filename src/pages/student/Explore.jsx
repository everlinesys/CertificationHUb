import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Compass, BookOpen, ChevronRight } from "lucide-react"
import api from "../../api"

export default function Explore() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Layout-consistent micro skeleton loader
  if (loading) {
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

  return (
    <div className="max-w-5xl space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex items-center gap-2 border-b border-white/[0.02] pb-4">
        <Compass className="text-[#11B5FF] w-4 h-4" />
        <h1 className="text-sm font-semibold tracking-tight text-white">
          Explore Learning Tracks
        </h1>
        <span className="text-[10px] bg-white/5 text-slate-400 px-1.5 py-0.5 rounded-md font-medium ml-1">
          {categories.length} Categories
        </span>
      </div>

      {/* CATEGORIES GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map((c) => (
          <div
            key={c.id}
            onClick={() => navigate(`/dashboard/category/${c.id}`)}
            className="group relative bg-white/[0.02] border border-white/5 p-3.5 rounded-xl cursor-pointer hover:bg-white/[0.04] hover:border-[#11B5FF]/30 transition-all duration-200 flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient hover glow inside card */}
            <div className="absolute -inset-px bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-7 h-7 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#11B5FF] group-hover:bg-[#11B5FF]/5 transition-colors duration-200 mb-3">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              
              <h2 className="font-medium text-xs text-white tracking-tight group-hover:text-[#11B5FF] transition-colors duration-200 line-clamp-1">
                {c.name}
              </h2>
            </div>

            <div className="relative z-10 mt-4 pt-2 border-t border-white/[0.02] flex items-center justify-between">
              <p className="text-[10px] text-slate-400">
                <span className="text-slate-200 font-medium">{c._count?.certifications || 0}</span> certifications
              </p>
              <ChevronRight className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-[#11B5FF] group-hover:translate-x-0.5 transition-all duration-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}