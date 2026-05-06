import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api"
import { ChevronRight, Timer, CheckCircle2 } from "lucide-react"
import { useRef } from "react"


export default function Exam() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [cert, setCert] = useState(null)
  const [started, setStarted] = useState(false)

  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const tickRef = useRef(null)
  const clickRef = useRef(null)

  const [muted, setMuted] = useState(
    localStorage.getItem("examMuted") === "true"
  )

  useEffect(() => {
    tickRef.current = new Audio("/sounds/tick.mp3")
    clickRef.current = new Audio("/sounds/click.mp3")

    tickRef.current.loop = true
    tickRef.current.volume = 0.3
    clickRef.current.volume = 0.6

    if (!muted && started) {
      tickRef.current.play().catch(() => { })
    }

    return () => {
      tickRef.current?.pause()
    }
  }, [started])
  // 🔥 Load certification metadata
  useEffect(() => {
    api.get(`/certifications/${id}`)
      .then(res => setCert(res.data))
      .catch(console.error)
  }, [id])
  const toggleMute = () => {
    const newState = !muted
    setMuted(newState)
    localStorage.setItem("examMuted", newState)

    if (newState) {
      tickRef.current?.pause()
    } else {
      tickRef.current?.play().catch(() => { })
    }
  }
  // 🔥 Load questions when exam starts
  const startExam = async () => {
    const res = await api.get(`/questions/${id}`)
    setCert(prev => ({ ...prev, questions: res.data }))
    setStarted(true)
  }

  if (!cert) return <div className="text-white p-10">Loading...</div>

  // 🟡 BEFORE START
  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <div className="bg-zinc-900 p-8 rounded-xl max-w-md w-full text-center space-y-4">

          <h1 className="text-2xl font-bold">{cert.title}</h1>

          <p className="text-zinc-400">{cert.description}</p>

          <div className="text-sm text-zinc-500 space-y-1">
            <p>⏱ Duration: {cert.duration || 10} mins</p>
            <p>🎯 Pass Mark: {cert.passMark}</p>
            {/* <p>💰 Price: ₹{cert.price}</p> */}
          </div>

          <button
            onClick={startExam}
            className="w-full bg-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-500"
          >
            Start Exam
          </button>
        </div>
      </div>
    )
  }

  // 🔴 EXAM MODE
  const q = cert.questions[index]
  const progress = ((index + 1) / cert.questions.length) * 100

  const select = (i) => {
    const newAns = [...answers]
    newAns[index] = i
    setAnswers(newAns)

    if (!muted) {
      clickRef.current.currentTime = 0
      clickRef.current.play().catch(() => { })
    }
  }

  const next = () => {
    if (index < cert.questions.length - 1) {
      setIndex(index + 1)
    } else {
      tickRef.current?.pause() // 🔥 stop ticking
      navigate("/result", { state: { cert, answers } })
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 bg-zinc-800 p-2 rounded-full text-xs"
      >
        {muted ? "🔇" : "🔊"}
      </button>
      {/* Header */}
      <nav className="p-4 border-b border-zinc-800 bg-zinc-900 flex justify-between">
        <h1 className="text-sm text-zinc-400">{cert.title}</h1>

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Timer className="w-4 h-4" />
          {cert.questions.length * 2} mins
        </div>
      </nav>

      {/* Progress */}
      <div className="h-1 bg-zinc-800">
        <div
          className="h-full bg-indigo-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">

          <h2 className="text-2xl mb-6">
            {index + 1}. {q.question}
          </h2>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isSelected = answers[index] === i

              return (
                <button
                  key={i}
                  onClick={() => {
                    select(i)
                    setTimeout(() => {
                      next()
                    }, 100) // small delay
                  }}
                  className={`w-full p-4 rounded-lg border ${isSelected
                    ? "bg-indigo-600/20 border-indigo-500"
                    : "bg-zinc-900 border-zinc-800"
                    }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {/* Controls */}
          <div className="mt-10 flex justify-between">
            <button
              onClick={() => setIndex(Math.max(0, index - 1))}
              disabled={index === 0}
              className="text-zinc-500"
            >
              Previous
            </button>

            <button
              onClick={next}
              disabled={answers[index] === undefined}
              className="bg-white text-black px-6 py-3 rounded-lg"
            >
              {index === cert.questions.length - 1
                ? "Finish"
                : "Next"}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}