import { useParams, useNavigate } from "react-router-dom"
import { certifications } from "../data/certifications"
import { useState } from "react"
import { ChevronRight, Timer, AlertCircle, CheckCircle2 } from "lucide-react"

export default function Exam() {
  const { id } = useParams()
  const navigate = useNavigate()

  const cert = certifications.find(c => c.id === id)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])

  // Guard clause for safety
  if (!cert) return <div className="text-white p-10">Certification not found.</div>

  const q = cert.questions[index]
  const progress = ((index + 1) / cert.questions.length) * 100

  const select = (i) => {
    const newAns = [...answers]
    newAns[index] = i
    setAnswers(newAns)
  }

  const next = () => {
    if (index < cert.questions.length - 1) {
      setIndex(index + 1)
    } else {
      navigate("/result", { state: { cert, answers } })
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Top Navigation / Progress */}
      <nav className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-zinc-400 text-sm uppercase tracking-widest">{cert.title}</h1>
          <div className="h-4 w-[1px] bg-zinc-700 hidden sm:block" />
          <span className="text-zinc-500 text-sm font-medium">
            Question <span className="text-white">{index + 1}</span> of {cert.questions.length}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full text-xs">
          <Timer className="w-3.5 h-3.5" />
          <span>Estimated: {cert.questions.length * 2}m</span>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-zinc-800">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Exam Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          {/* Question Text */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase">Select the best answer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-snug">
              {q.q}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isSelected = answers[index] === i
              return (
                <button
                  key={i}
                  onClick={() => select(i)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 group flex justify-between items-center ${
                    isSelected 
                    ? "bg-indigo-600/10 border-indigo-500 ring-1 ring-indigo-500/50" 
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <span className={`text-lg ${isSelected ? "text-white font-medium" : "text-zinc-400 group-hover:text-zinc-200"}`}>
                    {opt}
                  </span>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                </button>
              )
            })}
          </div>

          {/* Controls */}
          <div className="mt-12 flex justify-between items-center">
             <button 
                onClick={() => setIndex(Math.max(0, index - 1))}
                disabled={index === 0}
                className="text-zinc-500 hover:text-white disabled:opacity-0 transition-all font-medium"
             >
               Previous
             </button>

             <button
              onClick={next}
              disabled={answers[index] === undefined}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${
                answers[index] === undefined 
                ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" 
                : "bg-white text-black hover:bg-indigo-50 active:scale-95"
              }`}
            >
              {index === cert.questions.length - 1 ? "Finish Exam" : "Next Question"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}