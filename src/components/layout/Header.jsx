import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="bg-zinc-900 text-white border-b border-zinc-800 min-w-[full]">
      <div className=" mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          🎓 CertifyPro
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex gap-6 text-sm">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/" className="hover:text-blue-400">Certifications</Link>
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        </nav>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-1 border border-zinc-700 rounded hover:bg-zinc-800"
          >
            Login
          </Link>

          <button className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-500">
            Subscribe
          </button>
        </div>

      </div>
    </header>
  )
}