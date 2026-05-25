import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"

import {
    ShieldCheck,
    Search,
    CheckCircle2,
    AlertCircle,
    Award,
    User,
    Calendar,
    BadgeCheck,
    ArrowRight,
    Sparkles,
    Mail,
    Hash,
    ChevronLeft,
    ExternalLink,
} from "lucide-react"

export default function VerifyCertificate() {
    const navigate = useNavigate()

    const [certificateId, setCertificateId] =
        useState("")

    const [loading, setLoading] =
        useState(false)

    const [certificate, setCertificate] =
        useState(null)

    const [error, setError] =
        useState("")

    const verifyCertificate = async () => {
        try {
            setLoading(true)
            setError("")
            setCertificate(null)

            const res = await api.get(
                `/certificate/verify/${certificateId}`
            )

            setCertificate(res.data)
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Certificate not found"
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
    ">

            {/* Glow */}
            <div className="
        absolute
        top-1/3
        left-1/2
        -translate-x-1/2
        w-[600px]
        h-[600px]
        bg-cyan-500/10
        blur-[160px]
        rounded-full
      " />

            <div className="
        relative
        z-10
        max-w-5xl
        mx-auto
      ">

                {/* Back */}
                <button
                    onClick={() => {
                        if (window.history.length > 1) {
                            navigate(-1)
                        } else {
                            navigate("/")
                        }
                    }}
                    className="
            mb-8
            inline-flex
            items-center
            gap-2
            text-white/60
            hover:text-white
            transition-all
          "
                >
                    <ChevronLeft className="
            w-4
            h-4
          " />

                    Back
                </button>

                {/* HERO */}
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
            text-white/70
            text-sm
            mb-6
          ">
                        <Sparkles className="
              w-4
              h-4
              text-[#11B5FF]
            " />

                        Secure Certificate Validation
                    </div>

                    <h1 className="
            text-4xl
            md:text-6xl
            font-black
            leading-tight
          ">
                        Verify
                        <span className="text-[#11B5FF]">
                            {" "}Certificate
                        </span>
                    </h1>

                    <p className="
            mt-5
            text-white/50
            max-w-2xl
            mx-auto
            text-lg
            leading-relaxed
          ">
                        Validate the authenticity of a
                        certificate issued through the
                        Eduline Certification Platform.
                    </p>
                </div>

                {/* SEARCH */}
                <div className="
          mt-12
          max-w-2xl
          mx-auto
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.05]
          backdrop-blur-xl
          p-6
        ">

                    <div className="
            flex
            flex-col
            md:flex-row
            gap-4
          ">

                        <div className="
              relative
              flex-1
            ">

                            <Search className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                w-5
                h-5
                text-[#7E9AB2]
              " />

                            <input
                                placeholder="Enter Certificate Number"
                                value={certificateId}
                                onChange={(e) =>
                                    setCertificateId(
                                        e.target.value
                                    )
                                }
                                className="
                  w-full
                  h-16
                  rounded-2xl
                  bg-[#21466D]
                  border
                  border-[#3D6D9B]
                  pl-14
                  pr-4
                  text-white
                  placeholder:text-[#7E9AB2]
                  outline-none
                  focus:ring-2
                  focus:ring-[#11B5FF]/30
                "
                            />
                        </div>

                        <button
                            onClick={verifyCertificate}
                            disabled={
                                loading || !certificateId
                            }
                            className="
                group
                h-16
                px-8
                rounded-2xl
                bg-[#8CC63F]
                hover:bg-[#9EDB4B]
                text-black
                font-bold
                transition-all
                duration-300
                hover:scale-[1.02]
                flex
                items-center
                justify-center
                gap-2
                whitespace-nowrap
              "
                        >
                            {loading
                                ? "Verifying..."
                                : (
                                    <>
                                        Verify

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

                    {/* ERROR */}
                    {error && (
                        <div className="
              mt-5
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              px-5
              py-4
              flex
              items-center
              gap-3
            ">

                            <AlertCircle className="
                w-5
                h-5
                text-red-400
                shrink-0
              " />

                            <p className="
                text-red-200
                text-sm
              ">
                                {error}
                            </p>
                        </div>
                    )}
                </div>

                {/* RESULT */}
                {certificate && (
                    <div className="
            mt-10
            rounded-[36px]
            border
            border-emerald-500/20
            bg-emerald-500/[0.06]
            backdrop-blur-xl
            overflow-hidden
          ">

                        {/* TOP */}
                        <div className="
              p-8
              border-b
              border-white/10
            ">

                            <div className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-6
              ">

                                <div className="
                  flex
                  items-center
                  gap-5
                ">

                                    <div className="
                    w-20
                    h-20
                    rounded-3xl
                    bg-emerald-500/10
                    border
                    border-emerald-500/20
                    flex
                    items-center
                    justify-center
                  ">
                                        <ShieldCheck className="
                      w-10
                      h-10
                      text-emerald-400
                    " />
                                    </div>

                                    <div>

                                        <div className="
                      inline-flex
                      items-center
                      gap-2
                      px-3
                      py-1
                      rounded-full
                      bg-emerald-500/10
                      border
                      border-emerald-500/20
                      text-emerald-300
                      text-xs
                      font-semibold
                      mb-3
                    ">
                                            <CheckCircle2 className="
                        w-4
                        h-4
                      " />

                                            VERIFIED CERTIFICATE
                                        </div>

                                        <h2 className="
                      text-3xl
                      font-black
                    ">
                                            {
                                                certificate.certificationTitle
                                            }
                                        </h2>

                                        <p className="
                      text-white/50
                      mt-2
                    ">
                                            Certificate ID:
                                            {" "}
                                            {
                                                certificate.certificateNumber
                                            }
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={
                                        certificate.certificateUrl
                                    }
                                    target="_blank"
                                    className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-6
                    py-4
                    rounded-2xl
                    bg-[#8CC63F]
                    hover:bg-[#9EDB4B]
                    text-black
                    font-bold
                    transition-all
                  "
                                >
                                    View Certificate

                                    <ExternalLink className="
                    w-4
                    h-4
                  " />
                                </a>
                            </div>
                        </div>

                        {/* DETAILS */}
                        <div className="
              p-8
              grid
              md:grid-cols-2
              gap-6
            ">

                            {/* LEFT */}
                            <div className="
                rounded-3xl
                bg-white/[0.04]
                border
                border-white/10
                p-6
              ">

                                <div className="
                  flex
                  items-center
                  gap-3
                  mb-6
                ">

                                    <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-cyan-500/10
                    border
                    border-cyan-500/20
                    flex
                    items-center
                    justify-center
                  ">
                                        <User className="
                      w-7
                      h-7
                      text-cyan-400
                    " />
                                    </div>

                                    <div>
                                        <p className="
                      text-white/40
                      text-sm
                    ">
                                            Certified Candidate
                                        </p>

                                        <h3 className="
                      text-2xl
                      font-bold
                    ">
                                            {
                                                certificate.candidateName
                                            }
                                        </h3>
                                    </div>
                                </div>

                                <div className="
                  space-y-4
                  text-sm
                ">

                                    <div className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    pb-4
                  ">
                                        <div className="
                      flex
                      items-center
                      gap-2
                      text-white/50
                    ">
                                            <Mail className="
                        w-4
                        h-4
                      " />

                                            Email
                                        </div>

                                        <span className="
                      font-medium
                      text-right
                      break-all
                    ">
                                            {
                                                certificate.candidateEmail
                                            }
                                        </span>
                                    </div>

                                    <div className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    pb-4
                  ">
                                        <div className="
                      flex
                      items-center
                      gap-2
                      text-white/50
                    ">
                                            <Hash className="
                        w-4
                        h-4
                      " />

                                            Certificate No
                                        </div>

                                        <span className="
                      font-bold
                    ">
                                            {
                                                certificate.certificateNumber
                                            }
                                        </span>
                                    </div>

                                    <div className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    pb-4
                  ">
                                        <div className="
                      flex
                      items-center
                      gap-2
                      text-white/50
                    ">
                                            <Award className="
                        w-4
                        h-4
                      " />

                                            Grade
                                        </div>

                                        <span className="
                      font-bold
                    ">
                                            {certificate.grade}
                                        </span>
                                    </div>

                                    <div className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    pb-4
                  ">
                                        <div className="
                      flex
                      items-center
                      gap-2
                      text-white/50
                    ">
                                            <Calendar className="
                        w-4
                        h-4
                      " />

                                            Issued Date
                                        </div>

                                        <span className="
                      font-bold
                    ">
                                            {
                                                certificate.issuedDate
                                            }
                                        </span>
                                    </div>

                                    <div className="
                    flex
                    items-center
                    justify-between
                  ">
                                        <span className="
                      text-white/50
                    ">
                                            Status
                                        </span>

                                        <span className="
                      text-emerald-400
                      font-bold
                      flex
                      items-center
                      gap-2
                    ">
                                            <CheckCircle2 className="
                        w-4
                        h-4
                      " />

                                            Valid Certificate
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="
                rounded-3xl
                bg-white/[0.04]
                border
                border-white/10
                p-6
                flex
                flex-col
                justify-center
              ">

                                <div className="
                  flex
                  items-center
                  gap-3
                  mb-6
                ">

                                    <div className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-[#8CC63F]/10
                    border
                    border-[#8CC63F]/20
                    flex
                    items-center
                    justify-center
                  ">
                                        <Award className="
                      w-6
                      h-6
                      text-[#8CC63F]
                    " />
                                    </div>

                                    <div>
                                        <p className="
                      text-white/40
                      text-sm
                    ">
                                            Verified By
                                        </p>

                                        <h3 className="
                      text-2xl
                      font-bold
                    ">
                                            Eduline
                                        </h3>
                                    </div>
                                </div>

                                <p className="
                  text-white/60
                  leading-relaxed
                ">
                                    This certificate has been
                                    successfully verified in the
                                    Eduline Certification System
                                    and is confirmed authentic.
                                </p>

                                <div className="
                  mt-8
                  rounded-2xl
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                  px-5
                  py-4
                  flex
                  items-center
                  gap-3
                ">

                                    <BadgeCheck className="
                    w-6
                    h-6
                    text-emerald-400
                  " />

                                    <p className="
                    text-sm
                    text-emerald-200
                  ">
                                        Digitally Verified &
                                        Securely Validated
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}