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
  ShieldCheck,
} from "lucide-react"

export default function Exam() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showTheory, setShowTheory] = useState(false)
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
      .then((res) => {
        setCert(res.data)
        console.log("hguy,res", res)
      })
      .catch(console.error)

  }, [id])
  console.log("bbbb", cert)
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
      <section className="min-h-screen bg-gradient-to-br from-[#0B2A42] via-[#163A57] to-[#0A2235] text-white px-4 md:px-16 py-6">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          data-aos="fade-right"
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div
            data-aos="fade-right"
            data-aos-delay="100"
          >

            {/* Badge */}
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="
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
                text-xs
                mb-5
              "
            >
              <ShieldCheck className="w-4 h-4 text-[#11B5FF]" />
              AI Verified Certification
            </div>

            {/* Heading */}
            <h1
              data-aos="fade-up"
              data-aos-delay="250"
              className="text-3xl md:text-5xl font-bold leading-tight"
            >
              Get Certified In{" "}
              <span className="text-[#11B5FF]">
                {cert.title}
              </span>
            </h1>

            {/* Subtext */}
            <p
              data-aos="fade-up"
              data-aos-delay="350"
              className="mt-5 text-[#A8BED1] text-sm md:text-lg leading-relaxed"
            >
              Complete the assessment and unlock a shareable certificate recognised by companies worldwide.
            </p>

            {/* Stats */}
            <div
              data-aos="fade-up"
              data-aos-delay="450"
              className="flex flex-wrap gap-4 mt-8"
            >

              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xl font-bold">
                  {cert.duration || 10}m
                </p>

                <p className="text-white/50 text-xs">
                  Duration
                </p>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xl font-bold">
                  {cert._count?.questions
                    ? Math.round((cert.passMark / cert._count?.questions) * 100)
                    : 40}%
                </p>

                <p className="text-white/50 text-xs">
                  Pass Mark
                </p>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xl font-bold">
                  AI
                </p>

                <p className="text-white/50 text-xs">
                  Evaluated
                </p>
              </div>
            </div>

            {/* Form */}
            <div
              data-aos="fade-up"
              data-aos-delay="550"
              className="mt-8"
            >

              <label className="text-xs text-white/60 mb-2 block">
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
                  text-sm
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
                  text-sm
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
          <div
            className="relative flex justify-center md:w-[30vw]"
            data-aos="zoom-in"
            data-aos-delay="300"
          >

            {/* Floating Badge */}
            <div
              data-aos="fade-left"
              data-aos-delay="700"
              className="
                absolute
                top-4
                right-4
                md:top-[-20px]
                md:right-[-20px]
                z-20
                bg-[#E7D38D]
                text-black
                font-bold
                rounded-2xl
                px-4
                py-4
                shadow-2xl
              "
            >
              <p className="text-[10px] leading-tight">
                AI <br /> Verified
              </p>

              <p className="text-2xl font-black mt-1">
                Cert
              </p>
            </div>

            {/* Real Certificate */}
            {/* <img
              src="/template.png"
              alt="certificate"
              data-aos="flip-left"
              data-aos-delay="500"
              className="
                w-full
                max-w-[520px]
                rounded-[32px]
                border
                border-white/10
                shadow-[0_25px_80px_rgba(0,0,0,0.45)]
                object-contain
              "
            /> */}
            <div
              className="relative w-full max-w-[520px]"
              data-aos="flip-left"
              data-aos-delay="500"
            >

              {/* Certificate Image */}
              <img
                src="/template.png"
                alt="certificate"
                className="
      w-full
      rounded-[32px]
      border
      border-white/10
      shadow-[0_25px_80px_rgba(0,0,0,0.45)]
      object-contain
    "
              />

              {/* Candidate Name */}
              <div
                className="
      absolute
      left-1/2
      top-[39%]
      md:top-[37%]
      -translate-x-1/2
      text-center
      w-[80%]
    "
              >
                <h2
                  className="
        text-[#2B1B0E]
        text-2xl
        md:text-3xl
        font-bold
        tracking-wide
        italic
      "
                  style={{
                    fontFamily: "'Times New Roman', serif",
                  }}
                >
                  {candidateName || "Your Name"}
                </h2>
              </div>

              {/* Course Title */}
              <div
                className="
      absolute
      left-1/2
      top-[47%]
      -translate-x-1/2
      text-center
      w-[75%]
    "
              >
                <p
                  className="
        text-[#5A3A14]
        text-sm
        md:text-base
        font-semibold
      "
                >
                  {cert.title}
                </p>
              </div>

              {/* Date */}

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
      next(newAns)
    }, 200)
  }

  const next = (finalAnswers = answers) => {
    if (index < cert.questions.length - 1) {
      setIndex(index + 1)
    } else {
      tickRef.current?.pause()

      navigate("/result", {
        state: {
          cert,
          answers: finalAnswers,
          candidateName,
        },
      })
    }
  }

  // const next = () => {
  //   if (index < cert.questions.length - 1) {
  //     setIndex(index + 1)
  //   } else {
  //     tickRef.current?.pause()

  //     navigate("/result", {
  //       state: {
  //         cert,
  //         answers,
  //         candidateName,
  //       },
  //     })
  //   }
  // }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0B2A42] via-[#163A57] to-[#0A2235] text-white ">

      {/* Sound */}
      <button
        onClick={toggleMute}
        className="
          fixed
          bottom-6
          right-6
          z-50
          w-12
          h-12
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
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <p className="text-white/50 text-xs">
              {candidateName}
            </p>

            <h2 className="font-semibold text-sm">
              {cert.title}
            </h2>
          </div>

          <div className="
            flex
            items-center
            gap-2
            text-xs
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

          <div className="flex items-center justify-between text-xs mb-2 text-white/60">
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
                text-xs
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
            <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-8">
              {q.question}
            </h1>

            {/* Theory */}
            {q.explanation && (
              <button
                onClick={() => setShowTheory(true)}
                className="
      mb-6
      px-4
      py-2
      rounded-xl
      bg-[#0A4E84]
      hover:bg-[#1162A3]
      text-[#8FCBFF]
      text-xs
      transition-all
    "
              >
                📘 Read Theory
              </button>
            )}

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
                      p-4
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
                    <span className="text-sm md:text-lg font-medium">
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
      {/* THEORY POPUP */}
      {showTheory && (
        <div
          className="
      fixed
      inset-0
      z-[100]
      bg-black/70
      backdrop-blur-sm
      flex
      items-center
      justify-center
      p-4
    "
          onClick={() => setShowTheory(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
        w-full
        max-w-2xl
        rounded-3xl
        bg-[#082844]
        border
        border-white/10
        shadow-2xl
        overflow-hidden
      "
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                📘 Theory Explanation
              </h2>

              <button
                onClick={() => setShowTheory(false)}
                className="
            w-10
            h-10
            rounded-full
            bg-white/10
            hover:bg-white/20
            text-white
            text-lg
          "
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="
          whitespace-pre-wrap
          leading-relaxed
          text-[#D6E6F5]
          text-sm
          md:text-base
        ">
                {q.explanation}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}