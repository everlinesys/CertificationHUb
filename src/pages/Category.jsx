import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api"

import {
  Layout,
  PlayCircle,
  ChevronLeft,
  Trophy,
  Clock3,
  ShieldCheck,
} from "lucide-react"

export default function Category() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [certs, setCerts] = useState([])
  const [category, setCategory] = useState(null)

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      const res = await api.get(`/certifications?categoryId=${id}`)

      setCerts(res.data)

      if (res.data.length > 0) {
        setCategory(res.data[0].category)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0B2A42] via-[#163A57] to-[#0A2235] text-white px-4 py-6 md:px-8 md:py-10">

      <div className="max-w-7xl mx-auto">

        {/* Top */}
        <div className="mb-10">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="
              flex
              items-center
              gap-2
              text-white/70
              hover:text-white
              transition-colors
              mb-6
            "
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          {/* Hero */}
          <div className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-md
            p-6
            md:p-10
          ">

            {/* Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full" />

            <div className="relative z-10">

              {/* Tag */}
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
                mb-5
              ">
                <ShieldCheck className="w-4 h-4 text-[#11B5FF]" />
                Industry Recognised Certification
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {category?.name || "" } { " "}
                <span className="text-[#11B5FF]">
                  Certifications
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 text-[#A7BDD1] max-w-2xl text-sm md:text-lg leading-relaxed">
                Choose a certification path and validate your skills with real-world assessments trusted by recruiters and companies worldwide.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mt-8">

                <div className="
                  px-4
                  py-3
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                ">
                  <p className="text-2xl font-bold">
                    {certs.length}
                  </p>

                  <p className="text-white/50 text-sm">
                    Certifications
                  </p>
                </div>

                <div className="
                  px-4
                  py-3
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                ">
                  <p className="text-2xl font-bold">
                    10k+
                  </p>

                  <p className="text-white/50 text-sm">
                    Learners
                  </p>
                </div>

                <div className="
                  px-4
                  py-3
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                ">
                  <p className="text-2xl font-bold">
                    4.9★
                  </p>

                  <p className="text-white/50 text-sm">
                    Rated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty */}
        {certs.length === 0 && (
          <div className="
            text-center
            py-20
            rounded-3xl
            bg-white/5
            border
            border-white/10
          ">
            <Trophy className="w-12 h-12 mx-auto text-white/20 mb-4" />

            <h3 className="text-2xl font-semibold mb-2">
              No Certifications Found
            </h3>

            <p className="text-white/50">
              New certification programs will appear here soon.
            </p>
          </div>
        )}

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {certs.map((cert, index) => (
            <button
              key={cert.id}
              onClick={() => navigate(`/exam/${cert.id}`)}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                bg-[#21466D]
                border
                border-white/10
                hover:border-[#4A86C5]
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-[0_15px_50px_rgba(0,0,0,0.3)]
                text-left
              "
            >

              {/* Glow */}
              <div className="
                absolute
                inset-0
                opacity-0
                group-hover:opacity-100
                transition-opacity
                bg-gradient-to-br
                from-white/5
                to-transparent
              " />

              {/* Top Accent */}
              <div className="
                absolute
                top-0
                left-0
                right-0
                h-1
                bg-gradient-to-r
                from-[#11B5FF]
                to-[#8CC63F]
              " />

              <div className="relative z-10 p-6">

                {/* Top */}
                <div className="flex items-start justify-between mb-6">

                  <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                  ">
                    <Layout className="w-7 h-7 text-[#11B5FF]" />
                  </div>

                  <div className="
                    px-3
                    py-1
                    rounded-full
                    bg-[#8CC63F]/15
                    border
                    border-[#8CC63F]/20
                    text-[#8CC63F]
                    text-xs
                    font-semibold
                  ">
                    Popular
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold leading-snug mb-3">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-[#A8BED1] text-sm leading-relaxed line-clamp-3 min-h-[70px]">
                  {cert.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 mt-6 text-sm text-white/60">

                  <div className="flex items-center gap-2">
                    <Layout className="w-4 h-4" />

                    <span>
                      {cert._count?.questions ??
                        cert.questions?.length ??
                        0}{" "}
                      Questions
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="w-4 h-4" />

                    <span>15 Min</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="
                  mt-8
                  flex
                  items-center
                  justify-between
                ">

                  <div>
                    <p className="text-white/40 text-xs">
                      Certification Exam
                    </p>

                    <p className="font-semibold">
                      Beginner to Advanced
                    </p>
                  </div>

                  <div className="
                    flex
                    items-center
                    gap-2
                    text-[#11B5FF]
                    font-semibold
                    group-hover:translate-x-1
                    transition-transform
                  ">
                    Start

                    <PlayCircle className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}