import { certifications } from "../../data/certifications"
import { useNavigate } from "react-router-dom"
import Card from "../ui/Card"
import { Zap, Star, Layout, PlayCircle } from "lucide-react"

export default function Featured() {
  const navigate = useNavigate()

  // We'll just show the first 3 or any marked as "popular"
  const featuredCerts = certifications.slice(0, 3)

  return (
    <div className="px-6 py-16 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Popular Certifications
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCerts.map((cert) => (
          <div 
            key={cert.id} 
            onClick={() => navigate(`/exam/${cert.id}`)}
            className="group cursor-pointer"
          >
            <Card className="relative overflow-hidden border-zinc-800 bg-zinc-900 transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] group-hover:-translate-y-1">
              {/* Category Badge */}
              <div className="flex justify-between items-start mb-6">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {cert.category}
                </span>
                <div className="flex items-center gap-1 text-zinc-500 text-xs">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>{cert.difficulty || "Intro"}</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Layout className="w-4 h-4" />
                    <span>{cert.questions.length} Questions</span>
                  </div>
                </div>
              </div>

              {/* Start Exam Footer */}
              <div className="mt-8 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300">
                  <PlayCircle className="w-5 h-5" />
                  Start Exam
                </span>
                <div className="h-1 w-12 bg-zinc-800 rounded-full group-hover:w-20 group-hover:bg-indigo-500 transition-all duration-500" />
              </div>

              {/* Subtle Gradient Overlay */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-indigo-500/5 blur-3xl rounded-full" />
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}