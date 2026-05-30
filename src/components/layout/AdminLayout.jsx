import { useState, useEffect } from "react"
import { Outlet, NavLink, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  LogOut,
  CassetteTape,
  Users,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  ArrowUp,
} from "lucide-react"

export default function AdminLayout() {
  const navigate = useNavigate()
  const [showTop, setShowTop] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const linkClass = ({ isActive }) => `
    group
    flex
    items-center
    gap-2.5
    px-3
    py-2
    rounded-lg
    text-xs
    font-medium
    transition-all
    ${isActive
      ? "bg-white/5 text-[#11B5FF] border border-white/5 shadow-sm"
      : "text-slate-400 hover:bg-white/[0.02] hover:text-white"
    }
  `

  const navItems = (
    <>
      <NavLink to="/admin" end className={linkClass} onClick={() => setOpen(false)}>
        <LayoutDashboard className="w-4 h-4" />
        Dashboard
      </NavLink>
      <NavLink to="/admin/categories" className={linkClass} onClick={() => setOpen(false)}>
        <CassetteTape className="w-4 h-4" />
        Categories
      </NavLink>
      <NavLink to="/admin/create" className={linkClass} onClick={() => setOpen(false)}>
        <PlusCircle className="w-4 h-4" />
        Certifications
      </NavLink>
      <NavLink to="/admin/questions" className={linkClass} onClick={() => setOpen(false)}>
        <FileText className="w-4 h-4" />
        Questions
      </NavLink>
      <NavLink to="/admin/users" className={linkClass} onClick={() => setOpen(false)}>
        <Users className="w-4 h-4" />
        Users
      </NavLink>
    </>
  )

  return (
    <div className="flex min-h-screen bg-zinc-950 text-slate-200 antialiased selection:bg-[#11B5FF]/30 selection:text-white">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-60 border-r border-white/5 bg-zinc-900/40 flex-col shrink-0 sticky top-0 h-screen">
        <div className="flex flex-col h-full p-4 justify-between">
          
          <div className="space-y-6">
            {/* Minimal Brand Identity Block */}
            <div className="flex items-center gap-2.5 px-1 py-1.5">
              <div className="w-8 h-8 rounded-lg bg-[#11B5FF]/5 border border-[#11B5FF]/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#11B5FF]" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xs font-semibold text-white tracking-tight truncate">
                  LearnBridge
                </h1>
                <p className="text-slate-500 text-[10px] font-medium tracking-wide">
                  Internal Core Platform
                </p>
              </div>
            </div>

            {/* Navigation Block */}
            <nav className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase px-3 mb-1">
                Navigation Matrix
              </span>
              {navItems}
            </nav>
          </div>

          {/* Sidebar Footer Elements */}
          <div className="space-y-3 pt-4 border-t border-white/[0.02]">
            <div className="rounded-lg bg-white/[0.01] border border-white/5 p-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <p className="text-[10px] font-medium text-emerald-400 font-mono tracking-tight">
                  Node Engine Active
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-rose-500/10 bg-rose-500/5 py-2 text-xs text-rose-400 font-medium hover:bg-rose-500/10 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              Terminate Session
            </button>
          </div>

        </div>
      </aside>

      {/* MOBILE HEADER STRIP */}
      <div className="fixed top-0 left-0 right-0 z-40 lg:hidden border-b border-white/5 bg-zinc-950/80 backdrop-blur-md h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#11B5FF]/5 border border-[#11B5FF]/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-[#11B5FF]" />
          </div>
          <span className="font-semibold text-xs text-white">LearnBridge Admin</span>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* MOBILE SEAMLESS OVERLAY DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden">
          <div className="w-60 h-full bg-zinc-950 border-r border-white/5 p-4 flex flex-col justify-between relative">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase text-slate-500 tracking-wider">Menu Hub</span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {navItems}
              </nav>
            </div>

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-rose-500/10 bg-rose-500/5 py-2 text-xs text-rose-400 font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              Terminate Session
            </button>

          </div>
        </div>
      )}

      {/* CORE VIEWPORT CANVAS */}
      <main className="flex-1 min-w-0 relative">
        <div className="relative z-10 pt-18 lg:pt-6 p-4 md:p-6 pb-24 lg:pb-8">
          <Outlet />
        </div>
      </main>

      {/* SCROLL RECOVERY RIG */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-9 h-9 rounded-lg bg-[#11B5FF] text-white shadow-lg shadow-cyan-500/20 flex items-center justify-center hover:scale-105 transition"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  )
}