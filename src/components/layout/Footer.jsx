import { Link } from "react-router-dom"
import { ShieldCheck } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10  bg-[#062B45] overflow-hidden min-w-full">
      
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none  bg-[#062B45] ">
        <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#E9D08A]" />
            </div>

            <div>
              <h3 className="text-white font-semibold tracking-wide">
                Guru and Guruji
              </h3>

              <p className="text-sm text-white/50">
                AI-powered certification platform
              </p>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-8 text-sm">
            <Link
              to="/privacy"
              className="text-white/50 hover:text-white transition-colors"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="text-white/50 hover:text-white transition-colors"
            >
              Terms
            </Link>

            <Link
              to="/support"
              className="text-white/50 hover:text-white transition-colors"
            >
              Support
            </Link>
          </div>

          {/* Right */}
          <p className="text-sm text-white/40 text-center md:text-right">
            © {new Date().getFullYear()} CertifyPro. <br className="hidden md:block" />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}