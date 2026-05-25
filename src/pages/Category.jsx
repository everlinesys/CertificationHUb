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
import Header from "../components/layout/Header"

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
    <section className="min-h-screen bg-[#001F3F] -bg-gradient-to-br from-[#0B2A42] via-[#163A57] to-[#0A2235] text-white px-4 md:px-16 py-6 md:px-8 md:py-10">
      <div className="hidden"><Header /></div>
      <div className="max-w-7xl mx-auto">

        {/* Top */}
        <div
          className="mb-10"
          data-aos="fade-up"
        >

          {/* Back */}
          <button
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1)
              } else {
                navigate("/")
              }
            }}
            data-aos="fade-right"
            data-aos-delay="100"
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
          <div
            data-aos="zoom-in"
            data-aos-delay="150"
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-md
              p-5
              md:p-8
              hidden
            "
          >

            {/* Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full" />

            <div className="relative z-10">

              {/* Tag */}
              <div
                data-aos="fade-up"
                data-aos-delay="250"
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
                Industry Recognised Certification
              </div>

              {/* Title */}
              <h1
                data-aos="fade-up"
                data-aos-delay="350"
                className="text-3xl md:text-5xl font-bold leading-tight"
              >
                {category?.name || ""}{" "}
                <span className="text-[#11B5FF]">
                  Certifications
                </span>
              </h1>

              {/* Description */}
              <p
                data-aos="fade-up"
                data-aos-delay="450"
                className="mt-4 text-[#A7BDD1] max-w-2xl text-sm md:text-base leading-relaxed"
              >
                Choose a certification path and validate your skills with real-world assessments trusted by recruiters and companies worldwide.
              </p>

              {/* Stats */}
              <div
                data-aos="fade-up"
                data-aos-delay="550"
                className="flex flex-wrap gap-4 mt-8"
              >

                {[
                  {
                    value: certs.length,
                    label: "Certifications",
                  },
                  {
                    value: "10k+",
                    label: "Learners",
                  },
                  {
                    value: "4.9★",
                    label: "Rated",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    data-aos="zoom-in"
                    data-aos-delay={650 + i * 100}
                    className="
                      px-4
                      py-3
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                    "
                  >
                    <p className="text-xl font-bold">
                      {item.value}
                    </p>

                    <p className="text-white/50 text-xs">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Empty */}
        {certs.length === 0 && (
          <div
            data-aos="fade-up"
            className="
              text-center
              py-20
              rounded-3xl
              bg-white/5
              border
              border-white/10
            "
          >
            <Trophy className="w-12 h-12 mx-auto text-white/20 mb-4" />

            <h3 className="text-xl font-semibold mb-2">
              No Certifications Found
            </h3>

            <p className="text-white/50 text-sm">
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
              data-aos="fade-up"
              data-aos-delay={index * 100}
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
                hover:-translate-y-1
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

              <div className="relative z-10 p-5">

                {/* Top */}
                <div className="flex items-start justify-between mb-5">

                  <div
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Layout className="w-6 h-6 text-[#11B5FF]" />
                  </div>

                  <div className="
                    px-3
                    py-1
                    rounded-full
                    bg-[#8CC63F]/15
                    border
                    border-[#8CC63F]/20
                    text-[#8CC63F]
                    text-[10px]
                    font-semibold
                  ">
                    Popular
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold leading-snug mb-3">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-[#A8BED1] text-sm leading-relaxed line-clamp-3 min-h-[70px]">
                  {cert.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 mt-6 text-xs text-white/60">

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
                    <p className="text-white/40 text-[10px]">
                      Certification Exam
                    </p>

                    <p className="font-semibold text-sm">
                      Beginner to Advanced
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-[#11B5FF]
                      font-semibold
                      text-sm
                    "
                  >
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