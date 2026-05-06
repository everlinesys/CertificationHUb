import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80">
          <span className="text-sm font-medium text-zinc-400 hover:text-white">
            Guru and Guruji
          </span>
          <img src="/logo.png" alt="Logo" className="h-8 md:h-10" />
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-6">

          {/* 🔐 NOT LOGGED IN */}
          {!token && (
            <Link
              to="/login"
              className="text-sm font-medium text-zinc-400 hover:text-white"
            >
              Sign In
            </Link>
          )}

          {/* ✅ LOGGED IN */}
          {token && (
            <>
              <Link
                to="/dashboard"
                className="text-sm text-zinc-400 hover:text-white"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </header>
  );
}