import { useLocation, useNavigate } from "react-router-dom"
import {
  Lock,
  Sparkles,
  Trophy,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react"

import { useEffect, useRef } from "react"
import confetti from "canvas-confetti"
import Header from "../components/layout/Header"

export default function ResultGate() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const victoryRef = useRef(null)
  const popperRef = useRef(null)

  const muted = localStorage.getItem("examMuted") === "true"

  if (!state) {
    return (
      <div className="min-h-screen bg-[#071D2E] flex items-center justify-center text-white/50">
        No exam data found
      </div>
    )
  }

  const { cert, answers, candidateName } = state

  let correct = 0

  cert.questions?.forEach((q, i) => {
    if (q.correctAnswer === answers[i]) correct++
  })

  const passed = correct >= cert.passMark

  useEffect(() => {
    victoryRef.current = new Audio("/sounds/victory.mp3")
    popperRef.current = new Audio("/sounds/popper.mp3")

    victoryRef.current.volume = 0.5
    popperRef.current.volume = 0.7

    if (!muted && passed) {
      popperRef.current.play().catch(() => { })

      setTimeout(() => {
        victoryRef.current.play().catch(() => { })
      }, 300)
    }

    if (passed) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      })

      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
        })

        confetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
        })
      }, 200)
    }
  }, [])

  const user = JSON.parse(localStorage.getItem("user"))

  // Save attempt
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) return

    const saveAttempt = async () => {
      try {
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/attempt/submit`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              certificationId: cert.id,
              score: correct,
              totalQuestions: cert.questions.length,
              passed,
              answers,
            }),
          }
        )
      } catch (err) {
        console.error(err)
      }
    }

    saveAttempt()
  }, [])

  // Payment
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            certificationId: cert.id,
          }),
        }
      )

      const data = await res.json()

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,

        handler: async (response) => {
          await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/payment/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                ...response,
                certificationId: cert.id,
              }),
            }
          )

          navigate(`/certificate/${cert.id}`)
        },
      }

      const rzp = new window.Razorpay(options)

      rzp.open()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-br from-[#0B2A42] via-[#163A57] to-[#0A2235] text-white relative px-4 py-8 md:px-16">

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

      {/* Top Branding */}
      <Header />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

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
            <Sparkles className="w-4 h-4 text-[#11B5FF]" />
            Certification Assessment Complete
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-[1.05]">

            {passed ? (
              <>
                Congratulations,
                <br />

                <span className="text-[#8CC63F]">
                  {candidateName || "Candidate"}
                </span>
              </>
            ) : (
              <>
                Nice Try,
                <br />

                <span className="text-[#11B5FF]">
                  {candidateName || "Candidate"}
                </span>
              </>
            )}
          </h1>

          <p className="mt-6 text-[#A8BED1] text-lg leading-relaxed max-w-2xl">
            {passed
              ? "You successfully passed the assessment. Unlock your verified certificate and showcase your skills."
              : "You completed the assessment. Review your understanding and try again to unlock your certificate."}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10">

            <div className="
              rounded-2xl
              bg-white/5
              border
              border-white/10
              p-5
            ">
              <p className="text-3xl font-bold">
                {correct}
              </p>

              <p className="text-white/50 text-sm mt-1">
                Correct
              </p>
            </div>

            <div className="
              rounded-2xl
              bg-white/5
              border
              border-white/10
              p-5
            ">
              <p className="text-3xl font-bold">
                {cert.questions.length}
              </p>

              <p className="text-white/50 text-sm mt-1">
                Questions
              </p>
            </div>

            <div className="
              rounded-2xl
              bg-white/5
              border
              border-white/10
              p-5
            ">
              <p className={`
                text-3xl
                font-bold
                ${passed
                  ? "text-[#8CC63F]"
                  : "text-red-400"
                }
              `}>
                {Math.round(
                  (correct / cert.questions.length) * 100
                )}
                %
              </p>

              <p className="text-white/50 text-sm mt-1">
                Score
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 space-y-4">

            {!user && (
              <button
                onClick={() => {

                  localStorage.setItem(
                    "pending_attempt",
                    JSON.stringify({
                      cert,
                      answers,
                      candidateName,
                      correct,
                      passed,
                      totalQuestions: cert.questions.length,
                    })
                  )

                  navigate("/login")
                }
                }
                className="
                  w-full
                  md:w-auto
                  px-8
                  py-4
                  rounded-2xl
                  bg-white
                  text-black
                  font-bold
                  hover:bg-zinc-200
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                Sign In To Reveal Result

                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            {user && passed && (
              <button
                onClick={handlePayment}
                className="
                  group
                  w-full
                  md:w-auto
                  px-8
                  py-4
                  rounded-2xl
                  bg-[#8CC63F]
                  hover:bg-[#9FD94B]
                  text-black
                  font-bold
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                Unlock Certificate

                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {user && !passed && (
              <button
                onClick={() => {
                  if (window.history.length > 1) {
                    navigate(-1)
                  } else {
                    navigate("/")
                  }
                }}
                className="
                  w-full
                  md:w-auto
                  px-8
                  py-4
                  rounded-2xl
                  bg-[#21466D]
                  hover:bg-[#2A5584]
                  border
                  border-white/10
                  font-semibold
                  transition-all
                "
              >
                Try Again
              </button>
            )}

            <div className="
              flex
              items-center
              gap-3
              text-sm
              text-white/50
              pt-3
            ">
              <ShieldCheck className="w-5 h-5 text-[#11B5FF]" />

              Verified certificate available after passing
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        {/* RIGHT CERTIFICATE */}
        <div className="relative flex justify-center">

          <div className="
    relative
    w-full
    max-w-[700px]
    rounded-[30px]
    overflow-hidden
    shadow-[0_30px_100px_rgba(0,0,0,0.45)]
    border
    border-[#D4AF37]/40
    bg-white
  ">

            {/* Certificate Image */}
            <img
              src="/template.png"
              alt="certificate"
              className="w-full object-contain"
            />

            {/* Overlay */}
            <div className="absolute inset-0 ">

              {/* Candidate Name */}
              <div className="
        absolute
        top-[38%]
        left-1/2
        -translate-x-1/2
        w-[70%]
        text-center
      ">
                <h2
                  className="
            text-[#1B1B1B]
            text-2xl
            md:text-4xl
            font-semibold
            italic
            tracking-wide
          "
                  style={{
                    fontFamily: "'Times New Roman', serif",
                  }}
                >
                  {candidateName || "Candidate Name"}
                </h2>
              </div>

              {/* Course */}
              <div className="
        absolute
        top-[48%]
        left-1/2
        -translate-x-1/2
        w-[75%]
        text-center
      ">
                <p className="
          text-[#3A2A14]
          text-sm
          md:text-xl
          font-medium
        ">
                  {cert.title}
                </p>
              </div>

              {/* Grade */}
              <div className="
        absolute
        top-[59.5%]
        left-1/2
        -translate-x-1/2
        text-center
      ">
                <div className={`
          px-6
          py-2
          rounded-full
          border-2
          text-lg
          md:text-2xl
          font-black
          tracking-[0.15em]
          shadow-lg
          ${passed
                    ? "bg-green-100 border-green-700 text-green-800"
                    : "bg-red-100 border-red-700 text-red-700"
                  }
        `}>
                  {passed ? "PASS" : "FAIL"}
                </div>
              </div>

              {/* Student ID */}
              <div className="
        absolute
        left-[18%]
        top-[71%]
        text-[#2B2B2B]
        text-[10px]
        md:text-sm
      ">
                ID-{cert.id?.slice(0, 8)}
              </div>

              {/* Certificate Number */}
              <div className="
        absolute
        left-[18%]
        top-[74%]
        text-[#2B2B2B]
        text-[10px]
        md:text-sm
      ">
                CERT-{Date.now().toString().slice(-6)}
              </div>

              {/* Date */}
              <div className="
        absolute
        left-[23%]
        top-[77%]
        text-[#2B2B2B]
        text-[10px]
        md:text-sm
      ">
                {new Date().toLocaleDateString()}
              </div>

              {/* Score Badge */}
              <div className="
        absolute
        right-[10%]
        top-[60%]
        w-24
        h-24
        md:w-32
        md:h-32
        rounded-full
        border-[6px]
        border-[#B7791F]
        bg-gradient-to-br
        from-[#F8E7B5]
        to-[#D39B3D]
        flex
        flex-col
        items-center
        justify-center
        shadow-2xl
      ">
                <p className="text-[10px] md:text-xs font-bold text-[#5C2D00]">
                  SCORE
                </p>

                <h3 className="text-xl md:text-3xl font-black text-[#5C2D00] leading-none">
                  {Math.round(
                    (correct / cert.questions.length) * 100
                  )}%
                </h3>
              </div>

              {/* Watermark Result */}
              <div className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        pointer-events-none
      ">
                <div className={`
          rotate-[-20deg]
          text-[80px]
          md:text-[140px]
          font-black
          opacity-[0.06]
          tracking-[0.2em]
          ${passed
                    ? "text-green-700"
                    : "text-red-700"
                  }
        `}>
                  {passed ? "CERTIFIED" : "FAILED"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}