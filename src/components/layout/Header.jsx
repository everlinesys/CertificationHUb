import { Link, useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <header className=" top-0 left-0 w-full z-50 ">
      <div className=" max-w-7xl mx-auto px-6 py-6 flex items-center justify-center  bg-transparent">
        
        {/* Center Container */}
        <div className="flex items-center gap-10 rounded-full border border-white/10 bg-white/[0.03]  px-6 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-9 w-auto object-contain"
            />

            <span className="text-sm md:text-base font-semibold tracking-wide text-white">
              LearnBridge
            </span>
          </Link>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-white/10" />

          {/* Actions */}
          <div className="flex items-center gap-6">
            
            {!token ? (
              <>
                <Link
                  to="/about"
                  className="hidden md:flex text-sm text-white/60 hover:text-white transition-colors"
                >
                  About
                </Link>

                <Link
                  to="/login"
                  className="
                    text-sm
                    font-medium
                    text-black
                    bg-[#E9D08A]
                    hover:bg-[#f4dea0]
                    px-5
                    py-2
                    rounded-full
                    transition-all
                    duration-300
                    hover:scale-105
                  "
                >
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>

                <button
                  onClick={logout}
                  className="text-sm text-red-300 hover:text-red-200 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}