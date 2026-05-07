import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >

          {/* Back */}
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.96 }}
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
          </motion.button>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-md
              p-6
              md:p-10
            "
          >

            {/* Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full" />

            <div className="relative z-10">

              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
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
                  text-sm
                  mb-5
                "
              >
                <ShieldCheck className="w-4 h-4 text-[#11B5FF]" />
                Industry Recognised Certification
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold leading-tight"
              >
                {category?.name || ""}{" "}
                <span className="text-[#11B5FF]">
                  Certifications
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-[#A7BDD1] max-w-2xl text-sm md:text-lg leading-relaxed"
              >
                Choose a certification path and validate your skills with real-world assessments trusted by recruiters and companies worldwide.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
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
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="
                      px-4
                      py-3
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                    "
                  >
                    <p className="text-2xl font-bold">
                      {item.value}
                    </p>

                    <p className="text-white/50 text-sm">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Empty */}
        {certs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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

            <h3 className="text-2xl font-semibold mb-2">
              No Certifications Found
            </h3>

            <p className="text-white/50">
              New certification programs will appear here soon.
            </p>
          </motion.div>
        )}

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {certs.map((cert, index) => (
            <motion.button
              key={cert.id}
              onClick={() => navigate(`/exam/${cert.id}`)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
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

                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Layout className="w-7 h-7 text-[#11B5FF]" />
                  </motion.div>

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

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="
                      flex
                      items-center
                      gap-2
                      text-[#11B5FF]
                      font-semibold
                    "
                  >
                    Start

                    <PlayCircle className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}