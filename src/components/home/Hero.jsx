import Button from "../ui/Button"
import { useNavigate } from "react-router-dom"
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react"

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-zinc-950 pt-24 pb-20 px-6">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>New: AWS & Cloud Architecture Exams</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Get Certified. <br />
          <span className="bg-gradient-to-r from-indigo-400 via-white to-zinc-500 bg-clip-text text-transparent">
            Get Ahead.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Master the tools of tomorrow. Take industry-relevant exams, track your progress, and earn <span className="text-zinc-200">verified certificates</span> recognized by top companies.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => navigate("/category/tech")}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group"
          >
            Start Practice Exam
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <button 
            onClick={() => navigate("/categories")}
            className="w-full sm:w-auto px-8 py-4 text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            Browse All Paths
          </button>
        </div>

        {/* Trust Marks */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 grayscale opacity-40">
           <div className="flex items-center gap-2 font-semibold text-zinc-300 italic">
             <ShieldCheck className="w-5 h-5" /> Verified Certifications
           </div>
           <div className="text-zinc-400 font-medium">Trusted by 50k+ Students</div>
        </div>
      </div>
    </section>
  )
}