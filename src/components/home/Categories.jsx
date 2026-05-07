import { useEffect, useState } from "react"
import api from "../../api"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import {
  Search,
  ChevronLeft,
  Cpu,
  Shield,
  Radio,
  Network,
  Laptop,
  Wrench,
} from "lucide-react"

const iconMap = {
  Arduino: Cpu,
  "Cyber Security (English)": Shield,
  "Ethical Hacking": Shield,
  "5G Wireless Engineer": Radio,
  CCNA: Network,
  "Comptia A+": Laptop,
  "Comptia N+": Wrench,
}

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error)
  }, [])

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0B2A42] via-[#163A57] to-[#0A2235] text-white px-4 py-6 md:px-8 md:py-10">

      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            What <span className="text-[#11B5FF]">Skill</span> Do You Want To
            Get Certified In?
          </h1>

          <p className="mt-3 text-[#9EB3C7] text-sm md:text-xl">
            Select the category you are interested in or type the skill directly
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-8"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7E9AB2] w-5 h-5" />

          <input
            type="text"
            placeholder="Search any skill you're interested in"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              bg-[#21466D]
              border
              border-[#3D6D9B]
              rounded-2xl
              h-14
              pl-12
              pr-4
              text-white
              placeholder:text-[#7E9AB2]
              outline-none
              focus:ring-2
              focus:ring-[#11B5FF]/40
            "
          />
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-5"
        >

          <div className="flex items-center gap-2">
            <ChevronLeft className="w-5 h-5 text-white/80" />

            <h2 className="text-xl md:text-3xl font-bold">
              Select A Skill
            </h2>
          </div>

          {/* Step */}
          <div className="flex items-center gap-3">
            <div className="w-20 h-3 rounded-full bg-white/20 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "50%" }}
                transition={{ duration: 1 }}
                className="h-full bg-[#39D10A] rounded-full"
              />
            </div>

            <span className="text-white/70 font-semibold text-sm md:text-xl">
              Step 2/2
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {filtered.map((c, index) => {
            const Icon = iconMap[c.name] || Cpu

            return (
              <motion.button
                key={c.id}
                onClick={() => navigate(`/category/${c.id}`)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-[#21466D]
                  hover:bg-[#2A5584]
                  border
                  border-transparent
                  hover:border-[#4A86C5]
                  rounded-2xl
                  p-5
                  transition-all
                  duration-300
                  text-left
                  hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                "
              >

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-white/5 to-transparent" />

                <div className="relative flex items-center gap-4">

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0"
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div>
                    <h3 className="font-semibold text-lg md:text-2xl">
                      {c.name}
                    </h3>

                    <p className="text-[#A8BED1] text-sm mt-1">
                      {c._count.certifications} certifications available
                    </p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-white/50"
          >
            No skills found
          </motion.div>
        )}
      </div>
    </section>
  )
}