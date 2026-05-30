import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  Home,
  Award,
  LogOut,
  Menu,
  Compass,
  ShieldCheck,
  Sparkles,
  X,
  User2,
} from "lucide-react"

export default function StudentLayout() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))

  // Redirect if not logged in
  if (!user) {
    navigate("/login")
    return null
  }

  const logout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const linkClass = ({ isActive }) => `
    group
    flex
    items-center
    gap-2.5
    px-3.5
    py-2.5
    rounded-xl
    transition-all
    duration-200
    text-xs
    font-medium
    ${
      isActive
        ? "bg-[#11B5FF] text-white shadow-md shadow-cyan-500/10"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }
  `

  const handleNavClick = () => setOpen(false)

  const navItems = (
    <>
      <NavLink to="/dashboard" end className={linkClass} onClick={handleNavClick}>
        <Home className="w-4 h-4" />
        Dashboard
      </NavLink>

      <NavLink to="/dashboard/certificates" className={linkClass} onClick={handleNavClick}>
        <Award className="w-4 h-4" />
        Certificates
      </NavLink>

      <NavLink to="/dashboard/explore" className={linkClass} onClick={handleNavClick}>
        <Compass className="w-4 h-4" />
        Explore
      </NavLink>
    </>
  )

  return (
    <section className="flex min-h-screen bg-gradient-to-br from-[#061524] via-[#0b2238] to-[#071929] text-slate-100 overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-[260px] border-r border-white/5 bg-white/[0.01] backdrop-blur-xl flex-col relative shrink-0">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full p-5">
          {/* Logo Card */}
          <div className="mb-6">
            <div className="flex items-center gap-2.5 rounded-2xl bg-white/[0.03] border border-white/5 p-3">
              <div className="w-10 h-10 rounded-xl bg-[#11B5FF]/10 border border-[#11B5FF]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#11B5FF]" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-semibold tracking-tight text-white truncate">
                  LearnBridge
                </h1>
                <p className="text-slate-400 text-[11px]">
                  Student Portal
                </p>
              </div>
            </div>
          </div>

          {/* Small Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5 text-slate-300 text-[11px] mb-6 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-[#11B5FF]" />
            Learning Dashboard
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1.5">
            {navItems}
          </nav>

          {/* Bottom User Area */}
          <div className="mt-auto pt-4 border-t border-white/5">
            {/* User Card */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-3.5 mb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#11B5FF]/10 border border-[#11B5FF]/10 flex items-center justify-center shrink-0">
                  <User2 className="w-5 h-5 text-[#11B5FF]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-medium text-white truncate">
                    {user.name || "Student"}
                  </h3>
                  <p className="text-slate-400 text-[11px] truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/10 bg-red-500/[0.06] py-2.5 text-xs font-medium text-red-400 hover:bg-red-500/15 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE TOPBAR */}
      <div className="fixed top-0 left-0 right-0 z-40 lg:hidden border-b border-white/5 bg-[#061524]/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#11B5FF]/10 border border-[#11B5FF]/10 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#11B5FF]" />
            </div>
            <div>
              <h1 className="font-semibold text-xs text-white">
                Student
              </h1>
              <p className="text-slate-400 text-[10px]">
                LearnBridge
              </p>
            </div>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Menu className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setOpen(false)} />

        {/* Drawer Content */}
        <div 
          className={`absolute top-0 left-0 w-[260px] h-full bg-[#061524] border-r border-white/5 p-5 flex flex-col justify-between transition-transform duration-300 ease-out transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header / Logo */}
            <div className="mb-6 mt-2">
              <div className="flex items-center gap-2.5 rounded-2xl bg-white/[0.03] border border-white/5 p-3">
                <div className="w-10 h-10 rounded-xl bg-[#11B5FF]/10 border border-[#11B5FF]/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#11B5FF]" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold tracking-tight text-white">
                    LearnBridge
                  </h1>
                  <p className="text-slate-400 text-[11px]">
                    Student Portal
                  </p>
                </div>
              </div>
            </div>

            {/* User Info inside drawer top */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-3.5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#11B5FF]/10 border border-[#11B5FF]/10 flex items-center justify-center shrink-0">
                  <User2 className="w-5 h-5 text-[#11B5FF]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-medium text-white truncate">
                    {user.name || "Student"}
                  </h3>
                  <p className="text-slate-400 text-[11px] truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-1.5">
              {navItems}
            </nav>
          </div>

          {/* Logout at bottom */}
          <div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/10 bg-red-500/[0.06] py-2.5 text-xs font-medium text-red-400 hover:bg-red-500/15 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 relative">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-cyan-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

        {/* Outer Content Shell */}
        <div className="relative z-10 pt-20 lg:pt-0 p-4 md:p-6 pb-24 lg:pb-6">
          
          {/* Dashboard Header Bar */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.02] pb-5">
            <div>
              <p className="text-slate-400 text-xs">
                Welcome back
              </p>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-0.5">
                {user.name || "Student"}
              </h1>
            </div>

            {/* Micro User Badge */}
            <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 w-fit">
              <div className="w-8 h-8 rounded-lg bg-[#11B5FF]/10 border border-[#11B5FF]/10 flex items-center justify-center">
                <User2 className="w-4 h-4 text-[#11B5FF]" />
              </div>
              <div>
                <p className="text-xs font-medium text-white max-w-[150px] truncate">
                  {user.email}
                </p>
                <p className="text-slate-400 text-[10px]">
                  Verified Student
                </p>
              </div>
            </div>
          </div>

          {/* Page Routing Target */}
          <Outlet />
        </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-white/5 bg-[#061524]/80 backdrop-blur-md">
        <div className="grid grid-cols-3 gap-1 p-2">
          <BottomLink to="/dashboard" icon={Home} label="Home" />
          <BottomLink to="/dashboard/certificates" icon={Award} label="Certificates" />
          <BottomLink to="/dashboard/explore" icon={Compass} label="Explore" />
        </div>
      </div>
    </section>
  )
}

/* Compact Bottom Nav Link for Mobile Viewports */
function BottomLink({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) => `
        flex
        flex-col
        items-center
        justify-center
        gap-0.5
        py-1.5
        rounded-xl
        transition-all
        duration-200
        ${
          isActive
            ? "bg-[#11B5FF] text-white font-medium"
            : "text-slate-400 hover:text-white"
        }
      `}
    >
      <Icon className="w-4 h-4" />
      <span className="text-[10px]">
        {label}
      </span>
    </NavLink>
  )
}