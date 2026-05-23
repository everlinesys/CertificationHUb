import { useEffect, useState } from "react"
import api from "../../api"
import { useNavigate } from "react-router-dom"

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
import Header from "../layout/Header"

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
    /* Changed gradient to a premium Deep British Racing Green palette */
    <section className="min-h-screen bg-gradient-to-br from-[#061E16] via-[#0D382B] to-[#051A13] text-white px-4 md:px-16 py-6 md:px-8 md:py-10">
      <div className="hidden"><Header /></div>
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div
          data-aos="fade-up"
          className="mb-8 text-center md:text-left"
        >

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
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

          {/* Swapped bright cyan for a refined, classic gold accent (#D4AF37) */}
          <h1
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-3xl md:text-5xl font-bold leading-tight"
          >
            Select <span className="text-[#D4AF37]">Your Skill</span> & Start Your
            Certification Journey
          </h1>

          {/* Updated description text color to match the muted sage/cream tone */}
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-3 text-[#A9BDB6] text-sm md:text-lg"
          >
            Select the category you are interested in or type the skill directly
          </p>
        </div>

        {/* Search */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="relative mb-8"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7E9990] w-5 h-5" />

          {/* Updated input background, borders, and focus states to align with the green theme */}
          <input
            type="text"
            placeholder="Search any skill you're interested in"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              bg-[#133F32]
              border
              border-[#245D4B]
              rounded-2xl
              h-14
              pl-12
              pr-4
              text-white
              text-sm
              placeholder:text-[#7E9990]
              outline-none
              focus:ring-2
              focus:ring-[#D4AF37]/40
            "
          />
        </div>

        {/* Section Header */}
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="flex items-center justify-between mb-5"
        >

          <div className="flex items-center gap-2">
            <ChevronLeft className="w-5 h-5 text-white/80"  onClick={() => navigate(-1)} />

            <h2 className="text-lg md:text-2xl font-bold">
              Select A Skill
            </h2>
          </div>

          {/* Step */}
          <div className="flex items-center gap-3">
            <div className="w-20 h-3 rounded-full bg-white/20 overflow-hidden">
              {/* Gold status bar to match UK accenting */}
              <div
                className="h-full bg-[#D4AF37] rounded-full w-[50%]"
              />
            </div>

            <span className="text-white/70 font-semibold text-xs md:text-lg">
              Step 2/2
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {filtered.map((c, index) => {
            const Icon = iconMap[c.name] || Cpu

            return (
              /* Adjusted card backgrounds, hover overlays, and highlight borders to match the rich green theme */
              <button
                key={c.id}
                onClick={() => navigate(`/category/${c.id}`)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-[#133F32]
                  hover:bg-[#1A4E3E]
                  border
                  border-transparent
                  hover:border-[#337E67]
                  rounded-2xl
                  p-4
                  transition-all
                  duration-300
                  text-left
                  hover:-translate-y-1
                  hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                "
              >

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-white/5 to-transparent" />

                <div className="relative flex items-center gap-4">

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-semibold text-base md:text-xl">
                      {c.name}
                    </h3>

                    {/* Muted count text color adjusted for green backdrop */}
                    <p className="text-[#B3C7C0] text-xs md:text-sm mt-1">
                      {c._count.certifications} certifications available
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div
            data-aos="fade-up"
            className="text-center py-16 text-white/50 text-sm"
          >
            No skills found
          </div>
        )}
      </div>
    </section>
  )
}