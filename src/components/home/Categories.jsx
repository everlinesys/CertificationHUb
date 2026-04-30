import { categories } from "../../data/certifications"
import { useNavigate } from "react-router-dom"
import Card from "../ui/Card"
// Import the icons we'll use
import { Code, Briefcase, Palette, Database, MessageSquare, TrendingUp, ChevronRight } from "lucide-react"

// A simple helper to map string names to components
const IconMap = {
  Code: <Code />,
  Briefcase: <Briefcase />,
  Palette: <Palette />,
  Database: <Database />,
  MessageSquare: <MessageSquare />,
  TrendingUp: <TrendingUp />,
}

export default function Categories() {
  const navigate = useNavigate()

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Browse Categories</h2>
          <p className="text-zinc-400 mt-1">Select your field of expertise to begin.</p>
        </div>
        <div className="hidden md:block h-px flex-grow mx-8 bg-zinc-800 mb-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => navigate(`/category/${cat.id}`)}
            className="group cursor-pointer"
          >
            <Card className="h-full border-zinc-800 bg-zinc-900/50 hover:border-indigo-500/50 transition-all duration-300">
              <div className="flex flex-col h-full">
                {/* Icon Header */}
                <div className="mb-4 flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-zinc-800 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    {IconMap[cat.icon] || <Code />}
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                  {cat.description || "Explore professional certifications and practice modules."}
                </p>
                
                {/* Bottom Footer Detail */}
                <div className="mt-auto pt-6 flex items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300">
                  View Path
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}