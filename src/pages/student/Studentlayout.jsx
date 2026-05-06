import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Home, Award, LogOut, Menu, Compass } from "lucide-react";
import { useState } from "react";

export default function StudentLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
    }`;

  // 🔥 Close drawer on click (important fix)
  const handleNavClick = () => setOpen(false);

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
  );

  return (
    <div className="flex min-h-screen bg-transparent text-white">

      {/* 📱 Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-transparent p-4 flex justify-between items-center md:hidden z-50 border-b border-zinc-800">
        <h1 className="font-bold">Student</h1>

        <button onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>

      {/* 💻 Sidebar */}
      <aside className="hidden md:flex w-64 bg-transparent border-r border-zinc-800 p-4 flex-col ">

        <h1 className="text-xl font-bold mb-6">My Account</h1>

        <nav className="flex flex-col gap-2">
          {navItems}
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-300"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* 📱 Mobile Drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden "
          onClick={() => setOpen(false)} // click outside closes
        >
          <div
            className="w-64 bg-zinc-900 h-full p-4 pt-16"
            onClick={(e) => e.stopPropagation()} // prevent close inside
          >
            {navItems}

            <button
              onClick={logout}
              className="mt-6 flex items-center gap-2 text-red-400"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* 🚀 Main Content */}
      <main className="flex-1 p-6 mt-16 md:mt-0">

        {/* Top User Bar */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-sm text-zinc-500">
            Welcome back
          </span>

          <div className="text-sm text-zinc-400">
            {user.email}
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}