import { useState } from "react"
import api from "../api"
import { useNavigate, useLocation } from "react-router-dom"

import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
} from "lucide-react"
import Header from "../components/layout/Header"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)

  const submit = async () => {
    try {
      setLoading(true)

      const res = await api.post("/auth/login", form)

      const token = res.data.token
      const user = res.data.user

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      // ADMIN
      if (user.role === "ADMIN") {
        return navigate("/admin")
      }

      // Restore guest attempt
      const pending = localStorage.getItem("pending_attempt")

      if (pending) {
        const data = JSON.parse(pending)

        try {
          await api.post(
            "/attempt/submit",
            {
              certificationId: data.cert.id,
              answers: data.answers,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )

          localStorage.removeItem("pending_attempt")

          return navigate("/result", { state: data })
        } catch (err) {
          console.error("Failed to sync attempt:", err)
        }
      }

      // Redirect result
      if (location.state) {
        return navigate("/result", {
          state: location.state,
        })
      }

      navigate("/dashboard")
    } catch (err) {
      alert(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-br from-[#0B2A42] via-[#163A57] to-[#0A2235] text-white relative px-4 py-8 md:px-8">

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

      {/* Top Branding */}
      <Header />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="hidden lg:block">

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
            AI Powered Certification Platform
          </div>

          <h1 className="text-6xl font-black leading-[1.05]">
            Continue Your
            <br />

            <span className="text-[#11B5FF]">
              Certification
            </span>

            <br />

            Journey
          </h1>

          <p className="mt-6 text-[#A8BED1] text-lg leading-relaxed max-w-xl">
            Sign in to access your certifications, unlock results, and showcase verified skills trusted by recruiters worldwide.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-2xl">

            <div className="
              rounded-2xl
              bg-white/5
              border
              border-white/10
              p-5
            ">
              <p className="text-3xl font-bold">
                12K+
              </p>

              <p className="text-white/50 text-sm mt-1">
                Learners
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
                1100+
              </p>

              <p className="text-white/50 text-sm mt-1">
                Companies
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
                4.9★
              </p>

              <p className="text-white/50 text-sm mt-1">
                Rated
              </p>
            </div>
          </div>

          {/* Floating Card */}
          <div className="
            mt-10
            rounded-3xl
            bg-white/[0.04]
            border
            border-white/10
            p-6
            max-w-xl
          ">

            <div className="flex items-start gap-4">

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-[#8CC63F]/10
                border
                border-[#8CC63F]/20
                flex
                items-center
                justify-center
                shrink-0
              ">
                <ShieldCheck className="w-7 h-7 text-[#8CC63F]" />
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Verified Skill Credentials
                </h3>

                <p className="text-[#A8BED1] leading-relaxed">
                  Every certification is AI-evaluated and designed to demonstrate practical real-world understanding.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex justify-center">

          <div className="
            relative
            overflow-hidden
            w-full
            max-w-md
            rounded-[36px]
            border
            border-white/10
            bg-white/[0.05]
            backdrop-blur-xl
            shadow-2xl
          ">

            {/* Glow */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-cyan-500/10 blur-[100px] rounded-full" />

            <div className="relative z-10 p-8 md:p-10">

              {/* Top */}
              <div className="text-center mb-8">

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
                  mb-5
                ">
                  <Lock className="w-9 h-9 text-[#11B5FF]" />
                </div>

                <h1 className="text-4xl font-bold">
                  Welcome Back
                </h1>

                <p className="text-white/50 mt-3">
                  Sign in to continue your certification journey
                </p>
              </div>

              {/* Form */}
              <div className="space-y-5">

                {/* Email */}
                <div>

                  <label className="text-sm text-white/60 mb-2 block">
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7E9AB2]" />

                    <input
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
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

                {/* Password */}
                <div>

                  <label className="text-sm text-white/60 mb-2 block">
                    Password
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7E9AB2]" />

                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password: e.target.value,
                        })
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

                {/* Button */}
                <button
                  onClick={submit}
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
                    mt-2
                  "
                >
                  {loading ? (
                    "Signing In..."
                  ) : (
                    <>
                      Sign In

                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
              <div className="text-right">
                <span
                  onClick={() =>
                    navigate("/forgot-password")
                  }
                  className="
      text-sm
      text-[#11B5FF]
      cursor-pointer
      hover:text-[#45C6FF]
    "
                >
                  Forgot Password?
                </span>
              </div>
              {/* Bottom */}
              <div className="
                mt-8
                pt-6
                border-t
                border-white/10
                text-center
              ">

                <p className="text-white/50">
                  Don't have an account?{" "}

                  <span
                    onClick={() => navigate("/register")}
                    className="
                      text-[#11B5FF]
                      font-semibold
                      cursor-pointer
                      hover:text-[#45C6FF]
                    "
                  >
                    Create Account
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}