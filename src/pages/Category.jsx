import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api"

import {
  Layout as LayoutIcon,
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
    <section className="relative min-h-screen bg-[#001845] text-white px-4 md:px-16 py-6 md:py-10 overflow-hidden">
      
      {/* --- UK FLAG BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 opacity-25">
        {/* Blue Base */}
        <div className="absolute inset-0 bg-[#00247D]" />
        
        {/* White Diagonal Cross (St Andrew / St Patrick) */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent w-full h-full transform scale-y-150 rotate-12" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/20 to-transparent w-full h-full transform scale-y-150 -rotate-12" />
        
        {/* Red Diagonal Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-4 bg-[#C8102E]/40 blur-[2px] transform rotate-[32deg]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-4 bg-[#C8102E]/40 blur-[2px] transform -rotate-[32deg]" />

        {/* White Main Cross (St George) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-24 bg-white/30 blur-[1px]" />
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-24 bg-white/30 blur-[1px]" />

        {/* Red Main Cross */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 bg-[#C8102E]/70 shadow-[0_0_20px_rgba(200,16,46,0.4)]" />
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-12 bg-[#C8102E]/70 shadow-[0_0_20px_rgba(200,16,46,0.4)]" />

        {/* Vignette Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001233] via-transparent to-[#001233]/80" />
      </div>
      {/* ---------------------------------- */}

      <div className="hidden"><Header /></div>
      
      <div className="relative max-w-7xl mx-auto z-10">

        {/* Top Navigation */}
        <div className=" mb-10" data-aos="fade-up">
          <button
            onClick={() => navigate(-1)}
            data-aos="fade-right"
            data-aos-delay="100"
            className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 transition-all mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          {/* Hero Banner */}
          <div
            data-aos="zoom-in"
            data-aos-delay="150"
            className="hidden relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-10 shadow-2xl"
          >
            {/* Subtle Union Ambient Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#C8102E]/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[#00247D]/40 blur-[100px] rounded-full" />

            <div className="relative z-10">
              {/* Badge */}
              <div
                data-aos="fade-up"
                data-aos-delay="250"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 text-xs font-medium mb-5 backdrop-blur-sm"
              >
                <ShieldCheck className="w-4 h-4 text-[#C8102E]" />
                UK Standardised & Accredited Certification
              </div>

              {/* Title */}
              <h1
                data-aos="fade-up"
                data-aos-delay="350"
                className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight"
              >
                {category?.name || "Global"}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-white/60">
                  Certifications
                </span>
              </h1>

              {/* Description */}
              <p
                data-aos="fade-up"
                data-aos-delay="450"
                className="mt-4 text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed"
              >
                Choose a prestigious qualification pathway. Validate your skills with real-world assessments recognized by elite enterprise firms across the United Kingdom and globally.
              </p>

              {/* Stats */}
              <div
                data-aos="fade-up"
                data-aos-delay="550"
                className="flex flex-wrap gap-4 mt-8"
              >
                {[
                  { value: certs.length, label: "Programs Available" },
                  { value: "10k+", label: "UK & International Learners" },
                  { value: "4.9★", label: "Average Rating" },
                ].map((item, i) => (
                  <div
                    key={i}
                    data-aos="zoom-in"
                    data-aos-delay={650 + i * 100}
                    className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm min-w-[120px]"
                  >
                    <p className="text-2xl font-black text-white">{item.value}</p>
                    <p className="text-white/60 text-[11px] uppercase tracking-wider mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {certs.length === 0 && (
          <div
            data-aos="fade-up"
            className="text-center py-20 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md"
          >
            <Trophy className="w-12 h-12 mx-auto text-white/20 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Certifications Found</h3>
            <p className="text-white/50 text-sm">New certification programs will appear here soon.</p>
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
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0a2342] to-[#05162e] border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] text-left flex flex-col justify-between"
            >
              {/* Dynamic Glow Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-[#00247D]/20 via-transparent to-[#C8102E]/10" />

              {/* British-Themed Split Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] flex">
                <div className="w-1/2 bg-[#00247D]" />
                <div className="w-1/2 bg-[#C8102E]" />
              </div>

              <div className="relative z-10 p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Card Header Info */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <LayoutIcon className="w-6 h-6 text-white" />
                    </div>

                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-wider">
                      Popular
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold leading-snug mb-3 group-hover:text-slate-200 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 min-h-[60px]">
                    {cert.description}
                  </p>
                </div>

                <div>
                  {/* Meta Details */}
                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5 text-xs text-white/60">
                    <div className="flex items-center gap-2">
                      <LayoutIcon className="w-4 h-4 text-[#00247D]" />
                      <span>
                        {cert._count?.questions ?? cert.questions?.length ?? 0} Questions
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 className="w-4 h-4 text-[#C8102E]" />
                      <span>15 Min</span>
                    </div>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="mt-6 flex items-center justify-between bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                    <div>
                      <p className="text-white/40 text-[9px] uppercase tracking-wider">Level</p>
                      <p className="font-medium text-xs text-white/90">Beginner to Advanced</p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white text-black font-bold text-xs px-4 py-2 rounded-xl transition-all group-hover:bg-[#C8102E] group-hover:text-white shadow-md">
                      Start
                      <PlayCircle className="w-4 h-4" />
                    </div>
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