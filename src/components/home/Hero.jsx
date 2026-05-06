import Button from "../ui/Button"
import { useNavigate } from "react-router-dom"
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react"

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent pt-24 pb-20 px-6">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md text-zinc-400 text-xs font-medium mb-10 animate-bounce-subtle hover:border-zinc-700 transition-colors cursor-default">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          <span>New: AI-Powered Career Roadmaps</span>
        </div>

        {/* High-Impact Heading */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05]">
          Master Skills. <br />
          <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Build Your Future.
          </span>
        </h1>

        <p className="text-zinc-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          The world’s first <span className="text-indigo-400">AI-driven learning platform</span> that turns YouTube into a classroom. Join 500k+ learners today.
        </p>

        {/* Redesigned Button with Movement */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Button 
            onClick={() => navigate("/categories")}
            className="group relative w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold 
                       transition-all duration-300 ease-out
                       hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(79,70,229,0.3)]
                       active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
          >
            {/* Shimmer Effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            
            <span className="relative flex items-center gap-2">
              Get Started for Free
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Button>
          
          <button 
            className="text-zinc-400 hover:text-white font-medium transition-colors px-6 py-4"
            onClick={() => navigate("/about")}
          >
            How it works
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-20 pt-10 border-t border-zinc-900 flex flex-col items-center gap-6">
          <p className="text-zinc-600 text-sm font-semibold uppercase tracking-widest">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             <ShieldCheck className="text-white w-8 h-8" />
             <div className="h-6 w-[1px] bg-zinc-800 hidden md:block" />
             <span className="text-white font-bold text-xl hover:text-indigo-400 transition-colors cursor-default">Google</span>
             <span className="text-white font-bold text-xl hover:text-indigo-400 transition-colors cursor-default">Microsoft</span>
             <span className="text-white font-bold text-xl hover:text-indigo-400 transition-colors cursor-default">Amazon</span>
          </div>
        </div>
      </div>
    </section>
  )
}