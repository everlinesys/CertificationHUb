import { useNavigate } from "react-router-dom"
import {
    ShieldCheck,
    GraduationCap,
    Globe,
    BrainCircuit,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Trophy,
} from "lucide-react"
import Header from "../components/layout/Header"

export default function About() {
    const navigate = useNavigate()

    const stats = [
        {
            value: "12K+",
            label: "Certified Learners",
        },
        {
            value: "1100+",
            label: "Hiring Companies",
        },
        {
            value: "4.9★",
            label: "Student Rating",
        },
        {
            value: "25+",
            label: "Certification Tracks",
        },
    ]

    const features = [
        {
            icon: BrainCircuit,
            title: "AI-Powered Assessments",
            desc: "Smart evaluations designed to test real-world practical understanding instead of memorisation.",
        },
        {
            icon: ShieldCheck,
            title: "Industry Recognised",
            desc: "Certificates crafted to showcase verified skills trusted by recruiters and hiring teams.",
        },
        {
            icon: GraduationCap,
            title: "Skill Based Learning",
            desc: "Focused certifications that help learners become job-ready faster with targeted assessments.",
        },
        {
            icon: Globe,
            title: "Accessible Worldwide",
            desc: "Take certification exams from anywhere and share verified credentials globally.",
        },
    ]

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#0B2A42] via-[#163A57] to-[#0A2235] text-white overflow-hidden">
            <Header />
            {/* HERO */}
            <div className="relative px-4 md:px-8 pt-24 pb-20">

                {/* Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT */}
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
              mb-6
              backdrop-blur-md
            ">
                            <Sparkles className="w-4 h-4 text-[#11B5FF]" />
                            The Future Of Skill Verification
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black leading-[1.05]">
                            Build Skills.
                            <br />

                            <span className="text-[#11B5FF]">
                                Earn Trust.
                            </span>

                            <br />

                            Get Certified.
                        </h1>

                        <p className="mt-6 text-[#A8BED1] text-lg md:text-xl leading-relaxed max-w-2xl">
                            LearnBridge is an AI-powered certification platform helping learners validate real-world skills through modern, industry-focused assessments.
                        </p>

                        {/* CTA */}
                        <div className="flex flex-wrap gap-4 mt-10">

                            <button
                                onClick={() => navigate("/categories")}
                                className="
                  group
                  px-7
                  py-4
                  rounded-2xl
                  bg-[#8CC63F]
                  hover:bg-[#9EDB4B]
                  text-black
                  font-bold
                  transition-all
                  duration-300
                  hover:scale-[1.03]
                  flex
                  items-center
                  gap-2
                "
                            >
                                Explore Certifications

                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="
                  px-7
                  py-4
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  hover:bg-white/10
                  transition-all
                "
                            >
                                Back Home
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">

                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    p-5
                    backdrop-blur-md
                  "
                                >
                                    <h3 className="text-3xl font-bold">
                                        {s.value}
                                    </h3>

                                    <p className="text-white/50 text-sm mt-1">
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT VISUAL */}
                    <div className="relative">

                        <div className="
              relative
              overflow-hidden
              rounded-[36px]
              border
              border-[#D6B86B]
              bg-[#07131E]
              shadow-2xl
            ">

                            {/* Pattern */}
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12)_1px,_transparent_1px)] bg-[size:10px_10px]" />

                            <div className="relative z-10 p-8 md:p-10">

                                {/* Top */}
                                <div className="flex justify-center mb-8">
                                    <div className="
                    w-16
                    h-16
                    rounded-full
                    bg-[#D6B86B]/10
                    border
                    border-[#D6B86B]/20
                    flex
                    items-center
                    justify-center
                  ">
                                        <Trophy className="w-8 h-8 text-[#E9D08A]" />
                                    </div>
                                </div>

                                {/* Certificate */}
                                <div className="text-center">

                                    <p className="text-[#E9D08A] text-5xl font-serif italic">
                                        Certificate
                                    </p>

                                    <p className="text-white/50 mt-5 text-sm">
                                        This certificate is proudly awarded to
                                    </p>

                                    <h2 className="text-4xl font-semibold text-white mt-3">
                                        Future Professionals
                                    </h2>

                                    <p className="text-white/60 mt-4">
                                        for demonstrating practical expertise in
                                    </p>

                                    <h3 className="text-[#E9D08A] text-2xl mt-2 font-medium">
                                        Industry Ready Skills
                                    </h3>
                                </div>

                                {/* Bottom */}
                                <div className="grid grid-cols-2 gap-8 mt-16">

                                    <div className="text-center">
                                        <div className="h-[1px] bg-white/20 mb-3" />

                                        <p className="text-white text-sm font-medium">
                                            AI Verified
                                        </p>

                                        <p className="text-white/50 text-xs">
                                            LearnBridge
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <div className="h-[1px] bg-white/20 mb-3" />

                                        <p className="text-white text-sm font-medium">
                                            Trusted Globally
                                        </p>

                                        <p className="text-white/50 text-xs">
                                            Certification
                                        </p>
                                    </div>
                                </div>

                                {/* Quote */}
                                <div className="
                  mt-10
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  p-5
                ">
                                    <p className="text-white/80 italic text-sm leading-relaxed">
                                        “Our mission is to make skill verification accessible, trusted, and globally recognised.”
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card */}
                        <div className="
              hidden md:block
              absolute
              -bottom-8
              -left-8
              rounded-3xl
              bg-[#0D3454]
              border
              border-white/10
              p-5
              shadow-2xl
              backdrop-blur-md
            ">
                            <div className="flex items-center gap-4">

                                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-[#8CC63F]/15
                  border
                  border-[#8CC63F]/20
                  flex
                  items-center
                  justify-center
                ">
                                    <CheckCircle2 className="w-7 h-7 text-[#8CC63F]" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold">
                                        96%
                                    </h3>

                                    <p className="text-white/50 text-sm">
                                        Completion Rate
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FEATURES */}
            <div className="px-4 md:px-8 pb-24">
                <div className="max-w-7xl mx-auto">

                    {/* Heading */}
                    <div className="text-center mb-16">

                        <div
                            className="
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          bg-emerald-400/10
          border
          border-emerald-300/20
          text-emerald-100
          text-sm
          mb-5
          backdrop-blur-xl
        "
                        >
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            Why LearnBridge
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-white">
                            Built For The
                            <span className="text-emerald-400">
                                {" "}Modern Workforce
                            </span>
                        </h2>

                        <p className="text-emerald-50/70 text-lg mt-5 max-w-3xl mx-auto">
                            We combine AI, practical assessments, and modern certification design to create a better way to validate skills.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        {features.map((f) => {
                            const Icon = f.icon

                            return (
                                <div
                                    key={f.title}
                                    className="
              group
              rounded-3xl
              bg-emerald-400/[0.07]
              border
              border-emerald-300/10
              p-7
              backdrop-blur-xl
              hover:bg-emerald-400/[0.11]
              hover:border-emerald-300/30
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]
            "
                                >

                                    <div
                                        className="
                w-16
                h-16
                rounded-2xl
                bg-emerald-400/15
                border
                border-emerald-300/20
                flex
                items-center
                justify-center
                mb-6
              "
                                    >
                                        <Icon className="w-8 h-8 text-emerald-400" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 text-white">
                                        {f.title}
                                    </h3>

                                    <p className="text-emerald-50/70 leading-relaxed">
                                        {f.desc}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}