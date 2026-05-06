import { useEffect, useState } from "react"
import api from "../../api"

import {
  Users,
  Trophy,
  FileCheck2,
  IndianRupee,
  Search,
  X,
  CheckCircle2,
  Layers3,
} from "lucide-react"

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [certs, setCerts] = useState([])
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchStats()
    fetchCerts()
  }, [])

  const fetchStats = async () => {
    const res = await api.get("/admin/stats")
    setStats(res.data)
  }

  const fetchCerts = async () => {
    const res = await api.get("/certifications")
    setCerts(res.data)
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#071D2E] flex items-center justify-center text-white">
        Loading Dashboard...
      </div>
    )
  }

  const filtered = certs.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0B2A42] via-[#163A57] to-[#0A2235] text-white p-4 md:p-8">

      {/* Top */}
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">

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
              mb-4
            ">
              <Layers3 className="w-4 h-4 text-[#11B5FF]" />
              Admin Control Center
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Certification
              <span className="text-[#11B5FF]">
                {" "}Dashboard
              </span>
            </h1>

            <p className="text-[#A8BED1] mt-4 text-lg">
              Manage certifications, monitor revenue, and track platform growth.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-[350px]">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7E9AB2]" />

            <input
              type="text"
              placeholder="Search certifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-12">

          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            color="text-[#11B5FF]"
          />

          <StatCard
            title="Certifications"
            value={stats.totalCertifications}
            icon={Trophy}
            color="text-[#8CC63F]"
          />

          <StatCard
            title="Attempts"
            value={stats.totalAttempts}
            icon={FileCheck2}
            color="text-[#F5B942]"
          />

          <StatCard
            title="Revenue"
            value={`₹${stats.totalRevenue}`}
            icon={IndianRupee}
            color="text-[#FF7A7A]"
          />
        </div>

        {/* Section */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-3xl font-bold">
              Certifications
            </h2>

            <p className="text-white/50 mt-1">
              Manage and preview certification programs
            </p>
          </div>

          <div className="
            hidden
            md:flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-white/5
            border
            border-white/10
            text-sm
            text-white/60
          ">
            {filtered.length} Certifications
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
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

              {/* Accent */}
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
                    <Trophy className="w-7 h-7 text-[#11B5FF]" />
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
                    Active
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold leading-snug mb-3">
                  {c.title}
                </h3>

                {/* Category */}
                <p className="text-[#11B5FF] text-sm font-medium mb-4">
                  {c.category?.name || "No Category"}
                </p>

                {/* Desc */}
                <p className="text-[#A8BED1] text-sm leading-relaxed line-clamp-3 min-h-[72px]">
                  {c.description}
                </p>

                {/* Footer */}
                <div className="
                  mt-8
                  flex
                  items-center
                  justify-between
                ">

                  <div>
                    <p className="text-white/40 text-xs">
                      Total Questions
                    </p>

                    <p className="font-semibold">
                      {c.questions?.length || 0}
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
                    View
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="
          fixed
          inset-0
          bg-black/70
          backdrop-blur-sm
          z-50
          flex
          items-center
          justify-center
          p-4
        ">

          <div className="
            relative
            w-full
            max-w-4xl
            max-h-[90vh]
            overflow-y-auto
            rounded-[36px]
            bg-[#071D2E]
            border
            border-white/10
            shadow-2xl
          ">

            {/* Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full" />

            <div className="relative z-10 p-6 md:p-8">

              {/* Top */}
              <div className="flex items-start justify-between gap-6 mb-8">

                <div>

                  <p className="text-[#11B5FF] font-medium mb-2">
                    {selected.category?.name}
                  </p>

                  <h2 className="text-4xl font-bold">
                    {selected.title}
                  </h2>

                  <p className="text-[#A8BED1] mt-4 max-w-2xl leading-relaxed">
                    {selected.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelected(null)}
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
                    hover:bg-white/10
                    transition-all
                  "
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Questions */}
              <div>

                <h3 className="text-2xl font-bold mb-6">
                  Questions
                </h3>

                <div className="space-y-5">

                  {selected.questions.map((q, i) => (
                    <div
                      key={q.id}
                      className="
                        rounded-3xl
                        bg-white/[0.04]
                        border
                        border-white/10
                        p-6
                      "
                    >

                      {/* Question */}
                      <h4 className="text-xl font-semibold leading-relaxed">
                        {i + 1}. {q.question}
                      </h4>

                      {/* Options */}
                      <div className="mt-5 space-y-3">

                        {q.options.map((opt, idx) => {
                          const correct =
                            idx === q.correctAnswer

                          return (
                            <div
                              key={idx}
                              className={`
                                flex
                                items-center
                                gap-3
                                rounded-2xl
                                border
                                px-4
                                py-3
                                ${correct
                                  ? "bg-[#8CC63F]/10 border-[#8CC63F]/20"
                                  : "bg-white/5 border-white/10"
                                }
                              `}
                            >

                              {correct ? (
                                <CheckCircle2 className="w-5 h-5 text-[#8CC63F]" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-white/30" />
                              )}

                              <span className={`
                                ${correct
                                  ? "text-[#8CC63F]"
                                  : "text-white/70"
                                }
                              `}>
                                {opt}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/* Stats Card */
function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="
      relative
      overflow-hidden
      rounded-3xl
      bg-white/[0.05]
      border
      border-white/10
      p-6
      backdrop-blur-md
    ">

      <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-white/5 blur-[80px] rounded-full" />

      <div className="relative z-10 flex items-start justify-between">

        <div>
          <p className="text-white/50 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>
        </div>

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
          <Icon className={`w-7 h-7 ${color}`} />
        </div>
      </div>
    </div>
  )
}