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
    <section className="min-h-screen overflow-hidden bg-gradient-to-br from-[#0B2A42] via-[#163A57] to-[#0A2235] text-white relative px-4 py-8 md:px-8">

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

          <h1 className="text-5xl md:text-7xl font-black leading-[1.05]">

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
                onClick={() =>
                  navigate("/login", {
                    state: { cert, answers },
                  })
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
                onClick={() => navigate(-1)}
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

            {/* Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12)_1px,_transparent_1px)] bg-[size:10px_10px]" />

            <div className="relative z-10 p-8 md:p-10">

              {/* Trophy */}
              <div className="flex justify-center mb-8">

                <div className={`
                  w-20
                  h-20
                  rounded-full
                  flex
                  items-center
                  justify-center
                  border
                  shadow-2xl
                  ${passed
                    ? "bg-[#8CC63F]/10 border-[#8CC63F]/20"
                    : "bg-red-500/10 border-red-500/20"
                  }
                `}>

                  {passed ? (
                    <Trophy className="w-10 h-10 text-[#E9D08A]" />
                  ) : (
                    <XCircle className="w-10 h-10 text-red-400" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="text-center">

                <p className="text-[#E9D08A] text-5xl font-serif italic">
                  {passed ? "Passed" : "Result"}
                </p>

                <p className="text-white/50 mt-5 text-sm">
                  Candidate
                </p>

                <h2 className="text-4xl font-semibold text-white mt-3">
                  {candidateName || "Your Name"}
                </h2>

                <p className="text-white/60 mt-5">
                  Assessment
                </p>

                <h3 className="text-[#E9D08A] text-2xl mt-2 font-medium">
                  {cert.title}
                </h3>
              </div>

              {/* Locked Result */}
              <div className="
                relative
                mt-10
                rounded-3xl
                border
                border-white/10
                bg-white/5
                overflow-hidden
              ">

                {/* Blur Layer */}
                {!user && (
                  <div className="
                    absolute
                    inset-0
                    z-20
                    bg-[#07131E]/80
                    backdrop-blur-sm
                    flex
                    flex-col
                    items-center
                    justify-center
                  ">
                    <div className="
                      w-16
                      h-16
                      rounded-full
                      bg-white/10
                      flex
                      items-center
                      justify-center
                      mb-4
                    ">
                      <Lock className="w-8 h-8 text-[#11B5FF]" />
                    </div>

                    <p className="font-semibold text-lg">
                      Result Locked
                    </p>

                    <p className="text-white/50 text-sm mt-2">
                      Sign in to continue
                    </p>
                  </div>
                )}

                <div className="p-6">

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-white/50">
                      Status
                    </span>

                    <span className={`
                      font-bold
                      ${passed
                        ? "text-[#8CC63F]"
                        : "text-red-400"
                      }
                    `}>
                      {passed ? "PASSED" : "FAILED"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-white/50">
                      Score
                    </span>

                    <span className="font-bold">
                      {correct}/{cert.questions.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <span className="text-white/50">
                      Pass Mark
                    </span>

                    <span className="font-bold">
                      {cert.passMark}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="
                mt-8
                rounded-2xl
                bg-white/5
                border
                border-white/10
                p-5
              ">
                <p className="text-white/80 italic text-sm leading-relaxed">
                  {passed
                    ? "“Your certification is ready to be unlocked and shared professionally.”"
                    : "“Keep learning and attempt the certification again to unlock your verified credential.”"}
                </p>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="
            hidden
            md:flex
            absolute
            -bottom-6
            -left-6
            rounded-3xl
            bg-[#0D3454]
            border
            border-white/10
            px-6
            py-4
            shadow-2xl
            items-center
            gap-4
          ">

            <div className={`
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
              ${passed
                ? "bg-[#8CC63F]/10"
                : "bg-red-500/10"
              }
            `}>

              {passed ? (
                <CheckCircle2 className="w-7 h-7 text-[#8CC63F]" />
              ) : (
                <XCircle className="w-7 h-7 text-red-400" />
              )}
            </div>

            <div>
              <h3 className="text-2xl font-bold">
                {passed ? "Certified" : "Attempted"}
              </h3>

              <p className="text-white/50 text-sm">
                AI Verified Assessment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}