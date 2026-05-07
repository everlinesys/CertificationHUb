import { Outlet, NavLink, useNavigate } from "react-router-dom"

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

import { useState } from "react"

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

  const linkClass = ({ isActive }) =>
    `
      group
      flex
      items-center
      gap-3
      px-4
      py-3
      rounded-2xl
      transition-all
      duration-300
      font-medium
      ${
        isActive
          ? "bg-[#11B5FF] text-white shadow-lg shadow-cyan-500/20"
          : "text-[#9CB4C9] hover:bg-white/5 hover:text-white"
      }
    `

  const handleNavClick = () => setOpen(false)

  const navItems = (
    <>
      <NavLink
        to="/dashboard"
        end
        className={linkClass}
        onClick={handleNavClick}
      >
        <Home className="w-5 h-5" />
        Dashboard
      </NavLink>

      <NavLink
        to="/dashboard/certificates"
        className={linkClass}
        onClick={handleNavClick}
      >
        <Award className="w-5 h-5" />
        Certificates
      </NavLink>

      <NavLink
        to="/dashboard/explore"
        className={linkClass}
        onClick={handleNavClick}
      >
        <Compass className="w-5 h-5" />
        Explore
      </NavLink>
    </>
  )

  return (
    <section className="flex min-h-screen bg-gradient-to-br from-[#071D2E] via-[#102E46] to-[#0A2235] text-white overflow-hidden">

      {/* DESKTOP SIDEBAR */}
      <aside className="
        hidden
        lg:flex
        w-[290px]
        border-r
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        flex-col
        relative
      ">

        {/* Glow */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-cyan-500/10 blur-[120px] rounded-full" />

        <div className="relative z-10 flex flex-col h-full p-6">

          {/* Logo */}
          <div className="mb-10">

            <div className="
              flex
              items-center
              gap-3
              rounded-3xl
              bg-white/5
              border
              border-white/10
              p-4
            ">

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-[#11B5FF]/10
                border
                border-[#11B5FF]/20
                flex
                items-center
                justify-center
              ">
                <ShieldCheck className="w-7 h-7 text-[#11B5FF]" />
              </div>

              <div>
                <h1 className="text-xl font-bold">
                  LearnBridge
                </h1>

                <p className="text-white/50 text-sm">
                  Student Portal
                </p>
              </div>
            </div>
          </div>

          {/* Small Badge */}
          <div className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-white/5
            border
            border-white/10
            text-white/70
            text-sm
            mb-8
            w-fit
          ">
            <Sparkles className="w-4 h-4 text-[#11B5FF]" />
            Learning Dashboard
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            {navItems}
          </nav>

          {/* Bottom User */}
          <div className="mt-auto">

            {/* User Card */}
            <div className="
              rounded-3xl
              bg-white/[0.04]
              border
              border-white/10
              p-5
              mb-5
            ">

              <div className="flex items-center gap-4">

                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-[#11B5FF]/10
                  border
                  border-[#11B5FF]/20
                  flex
                  items-center
                  justify-center
                  shrink-0
                ">
                  <User2 className="w-7 h-7 text-[#11B5FF]" />
                </div>

                <div className="min-w-0">

                  <h3 className="font-semibold truncate">
                    {user.name || "Student"}
                  </h3>

                  <p className="text-white/50 text-sm truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/10
                py-4
                text-red-300
                hover:bg-red-500/20
                transition-all
              "
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE TOPBAR */}
      <div className="
        fixed
        top-0
        left-0
        right-0
        z-50
        lg:hidden
        border-b
        border-white/10
        bg-[#071D2E]/90
        backdrop-blur-xl
      ">

        <div className="flex items-center justify-between px-4 py-4">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="
              w-12
              h-12
              rounded-2xl
              bg-[#11B5FF]/10
              border
              border-[#11B5FF]/20
              flex
              items-center
              justify-center
            ">
              <ShieldCheck className="w-6 h-6 text-[#11B5FF]" />
            </div>

            <div>
              <h1 className="font-bold text-lg">
                Student
              </h1>

              <p className="text-white/50 text-xs">
                LearnBridge
              </p>
            </div>
          </div>

          {/* Menu */}
          <button
            onClick={() => setOpen(true)}
            className="
              w-12
              h-12
              rounded-2xl
              bg-white/5
              border
              border-white/10
              flex
              items-center
              justify-center
            "
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/60
            backdrop-blur-sm
            lg:hidden
          "
          onClick={() => setOpen(false)}
        >

          <div
            className="
              w-[290px]
              h-full
              bg-[#071D2E]
              border-r
              border-white/10
              p-6
              relative
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="
                absolute
                top-5
                right-5
                w-10
                h-10
                rounded-xl
                bg-white/5
                border
                border-white/10
                flex
                items-center
                justify-center
              "
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-10">

              <div className="
                flex
                items-center
                gap-3
                rounded-3xl
                bg-white/5
                border
                border-white/10
                p-4
              ">

                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-[#11B5FF]/10
                  border
                  border-[#11B5FF]/20
                  flex
                  items-center
                  justify-center
                ">
                  <ShieldCheck className="w-7 h-7 text-[#11B5FF]" />
                </div>

                <div>
                  <h1 className="text-xl font-bold">
                    LearnBridge
                  </h1>

                  <p className="text-white/50 text-sm">
                    Student Portal
                  </p>
                </div>
              </div>
            </div>

            {/* User */}
            <div className="
              rounded-3xl
              bg-white/[0.04]
              border
              border-white/10
              p-5
              mb-6
            ">

              <div className="flex items-center gap-4">

                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-[#11B5FF]/10
                  border
                  border-[#11B5FF]/20
                  flex
                  items-center
                  justify-center
                ">
                  <User2 className="w-7 h-7 text-[#11B5FF]" />
                </div>

                <div className="min-w-0">

                  <h3 className="font-semibold truncate">
                    {user.name || "Student"}
                  </h3>

                  <p className="text-white/50 text-sm truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-3">
              {navItems}
            </nav>

            {/* Logout */}
            <button
              onClick={logout}
              className="
                mt-10
                w-full
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/10
                py-4
                text-red-300
                hover:bg-red-500/20
                transition-all
              "
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="
        flex-1
        min-w-0
        relative
      ">

        {/* Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

        {/* Content */}
        <div className="
          relative
          z-10
          pt-24
          lg:pt-0
          p-4
          md:p-8
          pb-28
        ">

          {/* Top Bar */}
          <div className="
            mb-8
            flex
            flex-col
            md:flex-row
            md:items-center
            justify-between
            gap-4
          ">

            <div>

              <p className="text-white/50 text-sm">
                Welcome back
              </p>

              <h1 className="text-3xl md:text-4xl font-bold mt-1">
                {user.name || "Student"}
              </h1>
            </div>

            {/* User Badge */}
            <div className="
              flex
              items-center
              gap-3
              px-5
              py-3
              rounded-2xl
              bg-white/5
              border
              border-white/10
              w-fit
            ">

              <div className="
                w-12
                h-12
                rounded-xl
                bg-[#11B5FF]/10
                border
                border-[#11B5FF]/20
                flex
                items-center
                justify-center
              ">
                <User2 className="w-6 h-6 text-[#11B5FF]" />
              </div>

              <div>

                <p className="font-medium">
                  {user.email}
                </p>

                <p className="text-white/50 text-sm">
                  Verified Student
                </p>
              </div>
            </div>
          </div>

          {/* Page */}
          <Outlet />
        </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        lg:hidden
        border-t
        border-white/10
        bg-[#071D2E]/90
        backdrop-blur-xl
      ">

        <div className="grid grid-cols-3 gap-2 p-3">

          <BottomLink
            to="/dashboard"
            icon={Home}
            label="Home"
          />

          <BottomLink
            to="/dashboard/certificates"
            icon={Award}
            label="Certificates"
          />

          <BottomLink
            to="/dashboard/explore"
            icon={Compass}
            label="Explore"
          />
        </div>
      </div>
    </section>
  )
}

/* Bottom Nav Item */
function BottomLink({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) =>
        `
          flex
          flex-col
          items-center
          justify-center
          gap-1
          py-2
          rounded-2xl
          transition-all
          ${
            isActive
              ? "bg-[#11B5FF] text-white"
              : "text-white/50"
          }
        `
      }
    >
      <Icon className="w-5 h-5" />

      <span className="text-[10px] font-medium">
        {label}
      </span>
    </NavLink>
  )
}