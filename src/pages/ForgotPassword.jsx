import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"

import {
  ArrowLeft,
  ArrowRight,
  Mail,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react"

export default function ForgotPassword() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [message, setMessage] =
    useState("")

  const [error, setError] =
    useState("")

  const clearMessages = () => {
    setMessage("")
    setError("")
  }

  const sendOtp = async () => {
    try {
      clearMessages()

      setLoading(true)

      const res = await api.post(
        "/auth/forgot-password/send-otp",
        { email }
      )

      setMessage(
        res.data.message ||
          "OTP sent successfully"
      )

      setStep(2)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send OTP"
      )
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    try {
      clearMessages()

      setLoading(true)

      const res = await api.post(
        "/auth/forgot-password/verify-otp",
        {
          email,
          otp,
        }
      )

      setMessage(
        res.data.message ||
          "OTP verified"
      )

      setStep(3)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid OTP"
      )
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async () => {
    try {
      clearMessages()

      setLoading(true)

      const res = await api.post(
        "/auth/forgot-password/reset",
        {
          email,
          password,
        }
      )

      setMessage(
        res.data.message ||
          "Password updated"
      )

      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="
      min-h-screen
      overflow-hidden
      bg-gradient-to-br
      from-[#07111F]
      via-[#0B1D33]
      to-[#091728]
      text-white
      relative
      px-4
      py-10
      flex
      items-center
      justify-center
    ">

      {/* Glow */}
      <div className="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[500px]
        h-[500px]
        bg-cyan-500/10
        blur-[140px]
        rounded-full
      " />

      <div className="
        relative
        z-10
        w-full
        max-w-md
      ">

        {/* Back */}
        <button
          onClick={() => {
            if (step > 1) {
              setStep(step - 1)
              clearMessages()
            } else {
              navigate("/login")
            }
          }}
          className="
            mb-6
            flex
            items-center
            gap-2
            text-white/60
            hover:text-white
            transition
          "
        >
          <ArrowLeft className="w-4 h-4" />

          {step > 1
            ? "Back"
            : "Back to Login"}
        </button>

        {/* Card */}
        <div className="
          relative
          overflow-hidden
          rounded-[34px]
          border
          border-white/10
          bg-white/[0.05]
          backdrop-blur-xl
          shadow-2xl
        ">

          {/* Top Glow */}
          <div className="
            absolute
            top-0
            right-0
            w-[180px]
            h-[180px]
            bg-cyan-500/10
            blur-[100px]
            rounded-full
          " />

          <div className="
            relative
            z-10
            p-8
            md:p-10
          ">

            {/* Icon */}
            <div className="
              mx-auto
              w-20
              h-20
              rounded-full
              bg-[#11B5FF]/10
              border
              border-[#11B5FF]/20
              flex
              items-center
              justify-center
              mb-6
            ">
              {step === 1 && (
                <Mail className="
                  w-9
                  h-9
                  text-[#11B5FF]
                " />
              )}

              {step === 2 && (
                <ShieldCheck className="
                  w-9
                  h-9
                  text-[#11B5FF]
                " />
              )}

              {step === 3 && (
                <Lock className="
                  w-9
                  h-9
                  text-[#11B5FF]
                " />
              )}
            </div>

            {/* Heading */}
            <div className="text-center">

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
                text-white/60
                text-sm
                mb-5
              ">
                <Sparkles className="
                  w-4
                  h-4
                  text-[#11B5FF]
                " />

                Secure Recovery
              </div>

              <h1 className="
                text-4xl
                font-black
                leading-tight
              ">
                {step === 1 &&
                  "Forgot Password"}

                {step === 2 &&
                  "Verify OTP"}

                {step === 3 &&
                  "Create Password"}
              </h1>

              <p className="
                mt-3
                text-white/50
                leading-relaxed
              ">
                {step === 1 &&
                  "Enter your registered email address to receive an OTP."}

                {step === 2 &&
                  "Enter the OTP sent to your email address."}

                {step === 3 &&
                  "Create a strong new password for your account."}
              </p>
            </div>

            {/* Progress */}
            <div className="
              flex
              items-center
              gap-2
              mt-8
              mb-8
            ">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`
                    h-2
                    rounded-full
                    flex-1
                    transition-all
                    ${
                      step >= item
                        ? "bg-[#8CC63F]"
                        : "bg-white/10"
                    }
                  `}
                />
              ))}
            </div>

            {/* Messages */}
            {message && (
              <div className="
                mb-5
                rounded-2xl
                border
                border-emerald-500/20
                bg-emerald-500/10
                px-4
                py-4
                flex
                items-start
                gap-3
              ">
                <CheckCircle2 className="
                  w-5
                  h-5
                  text-emerald-400
                  shrink-0
                  mt-0.5
                " />

                <p className="
                  text-sm
                  text-emerald-200
                ">
                  {message}
                </p>
              </div>
            )}

            {error && (
              <div className="
                mb-5
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-4
                flex
                items-start
                gap-3
              ">
                <AlertCircle className="
                  w-5
                  h-5
                  text-red-400
                  shrink-0
                  mt-0.5
                " />

                <p className="
                  text-sm
                  text-red-200
                ">
                  {error}
                </p>
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-5">

                <div>
                  <label className="
                    text-sm
                    text-white/60
                    mb-2
                    block
                  ">
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      w-5
                      h-5
                      text-[#7E9AB2]
                    " />

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        h-14
                        rounded-2xl
                        bg-[#21466D]
                        border
                        border-[#3D6D9B]
                        pl-12
                        pr-4
                        text-white
                        placeholder:text-[#7E9AB2]
                        outline-none
                        focus:ring-2
                        focus:ring-[#11B5FF]/30
                      "
                    />
                  </div>
                </div>

                <button
                  onClick={sendOtp}
                  disabled={loading}
                  className="
                    group
                    w-full
                    h-14
                    rounded-2xl
                    bg-[#8CC63F]
                    hover:bg-[#9EDB4B]
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
                  {loading
                    ? "Sending OTP..."
                    : (
                      <>
                        Send OTP

                        <ArrowRight className="
                          w-5
                          h-5
                          group-hover:translate-x-1
                          transition-transform
                        " />
                      </>
                    )}
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-5">

                <div>
                  <label className="
                    text-sm
                    text-white/60
                    mb-2
                    block
                  ">
                    Verification OTP
                  </label>

                  <input
                    placeholder="Enter 6 digit OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      bg-[#21466D]
                      border
                      border-[#3D6D9B]
                      px-4
                      text-center
                      tracking-[10px]
                      text-xl
                      font-bold
                      text-white
                      placeholder:text-[#7E9AB2]
                      outline-none
                      focus:ring-2
                      focus:ring-[#11B5FF]/30
                    "
                  />
                </div>

                <button
                  onClick={verifyOtp}
                  disabled={loading}
                  className="
                    group
                    w-full
                    h-14
                    rounded-2xl
                    bg-[#8CC63F]
                    hover:bg-[#9EDB4B]
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
                  {loading
                    ? "Verifying..."
                    : (
                      <>
                        Verify OTP

                        <ArrowRight className="
                          w-5
                          h-5
                          group-hover:translate-x-1
                          transition-transform
                        " />
                      </>
                    )}
                </button>

                <button
                  onClick={sendOtp}
                  disabled={loading}
                  className="
                    w-full
                    text-sm
                    text-[#11B5FF]
                    hover:text-[#45C6FF]
                    transition
                  "
                >
                  Resend OTP
                </button>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-5">

                <div>
                  <label className="
                    text-sm
                    text-white/60
                    mb-2
                    block
                  ">
                    New Password
                  </label>

                  <div className="relative">

                    <Lock className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      w-5
                      h-5
                      text-[#7E9AB2]
                    " />

                    <input
                      type="password"
                      placeholder="Create new password"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        h-14
                        rounded-2xl
                        bg-[#21466D]
                        border
                        border-[#3D6D9B]
                        pl-12
                        pr-4
                        text-white
                        placeholder:text-[#7E9AB2]
                        outline-none
                        focus:ring-2
                        focus:ring-[#11B5FF]/30
                      "
                    />
                  </div>
                </div>

                <button
                  onClick={resetPassword}
                  disabled={loading}
                  className="
                    group
                    w-full
                    h-14
                    rounded-2xl
                    bg-[#8CC63F]
                    hover:bg-[#9EDB4B]
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
                  {loading
                    ? "Updating Password..."
                    : (
                      <>
                        Update Password

                        <ArrowRight className="
                          w-5
                          h-5
                          group-hover:translate-x-1
                          transition-transform
                        " />
                      </>
                    )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}