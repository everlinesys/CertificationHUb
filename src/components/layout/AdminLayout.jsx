import { Outlet, NavLink, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  LogOut,
  CassetteTape,
  Users,
  Menu
} from "lucide-react"
import { useState } from "react"

export default function AdminLayout() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
    }`

  const navItems = (
    <>
      <NavLink to="/admin" className={linkClass}>
        <LayoutDashboard className="w-4 h-4" />
        Dashboard
      </NavLink>

      <NavLink to="/admin/categories" className={linkClass}>
        <CassetteTape className="w-4 h-4" />
        Categories
      </NavLink>

      <NavLink to="/admin/create" className={linkClass}>
        <PlusCircle className="w-4 h-4" />
        Certifications
      </NavLink>

      <NavLink to="/admin/questions" className={linkClass}>
        <FileText className="w-4 h-4" />
        Questions
      </NavLink>

      <NavLink to="/admin/users" className={linkClass}>
        <Users className="w-4 h-4" />
        Users
      </NavLink>
    </>
  )

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      {/* 📱 Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-zinc-900 p-4 flex justify-between items-center md:hidden z-50 border-b border-zinc-800">
        <h1 className="font-bold">Admin</h1>

        <button onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>

      {/* 🔥 Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-zinc-900 border-r border-zinc-800 p-4 flex-col">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

        <nav className="flex flex-col gap-2">{navItems}</nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* 📱 Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden">
          <div className="w-64 bg-zinc-900 h-full p-4">
            <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

            <nav className="flex flex-col gap-2">{navItems}</nav>

            <button
              onClick={logout}
              className="mt-6 text-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* 🚀 Main */}
      <main className="flex-1 p-6 mt-16 md:mt-0 pb-20">
        <Outlet />
      </main>

      {/* 📱 Bottom Tabs */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-2 md:hidden">
        <NavLink to="/admin">
          <LayoutDashboard />
        </NavLink>

        <NavLink to="/admin/create">
          <PlusCircle />
        </NavLink>

        <NavLink to="/admin/questions">
          <FileText />
        </NavLink>

        <NavLink to="/admin/users">
          <Users />
        </NavLink>
      </div>
    </div>
  )
}