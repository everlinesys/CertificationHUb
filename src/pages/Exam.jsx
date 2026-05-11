import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import api from "../api"

import {
  ChevronLeft,
  Volume2,
  VolumeX,
  Play,
  CheckCircle2,
  Timer,
  Trophy,
  ShieldCheck,
} from "lucide-react"

export default function Exam() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [cert, setCert] = useState(null)
  const [started, setStarted] = useState(false)

  const [candidateName, setCandidateName] = useState("")
  const [loading, setLoading] = useState(false)

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
    tickRef.current.volume = 0.2
    clickRef.current.volume = 0.5

    return () => {
      tickRef.current?.pause()
    }
  }, [])

  useEffect(() => {
    api
      .get(`/certifications/${id}`)
      .then((res) => setCert(res.data))
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

  const startExam = async () => {
    if (!candidateName.trim()) return

    setLoading(true)

    try {
      const res = await api.get(`/questions/${id}`)

      setCert((prev) => ({
        ...prev,
        questions: res.data,
      }))

      setStarted(true)

      if (!muted) {
        tickRef.current?.play().catch(() => { })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!cert) {
    return (
      <div className="min-h-screen bg-[#071D2E] flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  // BEFORE START
  if (!started) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-[#0B2A42] via-[#163A57] to-[#0A2235] text-white px-4 py-6">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>

            <div className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/5
              border
              border-white/10
              text-white/70
              text-sm
              mb-6
            ">
              <ShieldCheck className="w-4 h-4 text-[#11B5FF]" />
              AI Verified Certification
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Get Certified In{" "}
              <span className="text-[#11B5FF]">
                {cert.title}
              </span>
            </h1>

            <p className="mt-5 text-[#A8BED1] text-lg leading-relaxed">
              Complete the assessment and unlock a shareable certificate recognised by companies worldwide.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-8">

              <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold">
                  {cert.duration || 10}m
                </p>

                <p className="text-white/50 text-sm">
                  Duration
                </p>
              </div>

              <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold">
                  {cert.questions?.length
                    ? Math.round((cert.passMark / cert.questions.length) * 100)
                    : 60}%
                </p>

                <p className="text-white/50 text-sm">
                  Pass Mark
                </p>
              </div>

              <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold">
                  AI
                </p>

                <p className="text-white/50 text-sm">
                  Evaluated
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="mt-10">

              <label className="text-sm text-white/60 mb-2 block">
                Candidate Name
              </label>

              <input
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Enter your full name"
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-[#21466D]
                  border
                  border-[#3D6D9B]
                  px-5
                  text-white
                  placeholder:text-[#7E9AB2]
                  outline-none
                  focus:ring-2
                  focus:ring-[#11B5FF]/30
                "
              />

              <button
                onClick={startExam}
                disabled={loading}
                className="
                  mt-5
                  w-full
                  h-14
                  rounded-2xl
                  bg-[#8CC63F]
                  hover:bg-[#9FD94B]
                  text-black
                  font-bold
                  transition-all
                  duration-300
                  hover:scale-[1.01]
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                {loading ? (
                  "Preparing Exam..."
                ) : (
                  <>
                    Start Certification
                    <Play className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT CERTIFICATE */}
          <div className="relative">

            <div className="
              relative
              overflow-hidden
              rounded-[36px]
              border
              border-[#D6B86B]
              bg-[#07131E]
              shadow-2xl
            ">

              {/* Background */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12)_1px,_transparent_1px)] bg-[size:10px_10px]" />

              <div className="relative z-10 p-8 md:p-10">

                {/* Top */}
                <div className="flex justify-center mb-8">
                  <div className="
                    w-16
                    h-16
                    rounded-full
                    bg-[#D6B86B]/10
                    border
                    border-[#D6B86B]/20
                    flex
                    items-center
                    justify-center
                  ">
                    <Trophy className="w-8 h-8 text-[#E9D08A]" />
                  </div>
                </div>

                <div className="text-center">

                  <p className="text-[#E9D08A] text-5xl font-serif italic">
                    Certificate
                  </p>

                  <p className="text-white/50 mt-5 text-sm">
                    This certificate is presented to
                  </p>

                  <h2 className="text-4xl font-semibold text-white mt-3">
                    {candidateName || "Your Name"}
                  </h2>

                  <p className="text-white/60 mt-4">
                    for successfully completing
                  </p>

                  <h3 className="text-[#E9D08A] text-2xl mt-2 font-medium">
                    {cert.title}
                  </h3>
                </div>

                {/* Bottom */}
                <div className="grid grid-cols-2 gap-8 mt-16">

                  <div className="text-center">
                    <div className="h-[1px] bg-white/20 mb-3" />

                    <p className="text-white text-sm font-medium">
                      AI Evaluated
                    </p>

                    <p className="text-white/50 text-xs">
                      LearnBridge Certification
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="h-[1px] bg-white/20 mb-3" />

                    <p className="text-white text-sm font-medium">
                      Industry Ready
                    </p>

                    <p className="text-white/50 text-xs">
                      Certification
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="
                  mt-10
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  p-5
                ">
                  <p className="text-white/80 italic text-sm leading-relaxed">
                    “This certification validates practical skills and real-world understanding.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // EXAM MODE
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

    setTimeout(() => {
      next()
    }, 200)
  }

  const next = () => {
    if (index < cert.questions.length - 1) {
      setIndex(index + 1)
    } else {
      tickRef.current?.pause()

      navigate("/result", {
        state: {
          cert,
          answers,
          candidateName,
        },
      })
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0B2A42] via-[#163A57] to-[#0A2235] text-white">

      {/* Sound */}
      <button
        onClick={toggleMute}
        className="
          fixed
          bottom-6
          right-6
          z-50
          w-14
          h-14
          rounded-full
          bg-white/10
          backdrop-blur-md
          border
          border-white/10
          flex
          items-center
          justify-center
        "
      >
        {muted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>

      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* Top */}
        <div className="flex items-center justify-between mb-5">

          <button
            onClick={() => navigate(-1)}
            className="text-white/60 hover:text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="text-center">
            <p className="text-white/50 text-sm">
              {candidateName}
            </p>

            <h2 className="font-semibold">
              {cert.title}
            </h2>
          </div>

          <div className="
            flex
            items-center
            gap-2
            text-sm
            bg-white/5
            border
            border-white/10
            rounded-full
            px-4
            py-2
          ">
            <Timer className="w-4 h-4 text-[#11B5FF]" />
            {cert.questions.length * 2} mins
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">

          <div className="flex items-center justify-between text-sm mb-2 text-white/60">
            <span>
              Q{index + 1}/{cert.questions.length}
            </span>

            <span>
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#39D10A] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="
          relative
          overflow-hidden
          rounded-[32px]
          bg-[#082844]
          border
          border-white/10
          shadow-2xl
        ">

          {/* Top Image */}
          <div className="relative h-[220px]">

            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
              alt="exam"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#082844] to-transparent" />

            {/* Progress Top */}
            <div className="absolute top-5 left-5 right-5 flex items-center gap-3">

              <div className="
                bg-[#0A4E84]
                text-white
                px-4
                py-2
                rounded-xl
                text-sm
                font-bold
              ">
                Q{index + 1}/{cert.questions.length}
              </div>

              <div className="
                flex-1
                h-4
                rounded-full
                bg-white/20
                overflow-hidden
              ">
                <div
                  className="h-full bg-white"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 md:p-8">

            {/* Question */}
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
              {q.question}
            </h1>

            {/* Theory */}
            <button className="
              mb-6
              px-4
              py-2
              rounded-xl
              bg-[#0A4E84]
              text-[#8FCBFF]
              text-sm
            ">
              📘 Read Theory
            </button>

            {/* Options */}
            <div className="space-y-4">

              {q.options.map((opt, i) => {
                const isSelected = answers[index] === i

                return (
                  <button
                    key={i}
                    onClick={() => select(i)}
                    className={`
                      w-full
                      rounded-2xl
                      border
                      p-5
                      text-left
                      transition-all
                      duration-200
                      flex
                      items-center
                      justify-between
                      ${isSelected
                        ? "bg-[#0E3B63] border-[#11B5FF]"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                      }
                    `}
                  >
                    <span className="text-lg font-medium">
                      {opt}
                    </span>

                    <div className={`
                      w-6
                      h-6
                      rounded-full
                      border
                      flex
                      items-center
                      justify-center
                      ${isSelected
                        ? "border-[#11B5FF] bg-[#11B5FF]"
                        : "border-white/30"
                      }
                    `}>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-black" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}