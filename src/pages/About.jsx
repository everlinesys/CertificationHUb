import { useNavigate } from "react-router-dom"
import {
    ShieldCheck,
    GraduationCap,
    Globe,
    BrainCircuit,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    ChevronLeft,
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
            title: "AI Assessments",
            desc: "Smart evaluations designed to test practical understanding instead of memorisation.",
        },
        {
            icon: ShieldCheck,
            title: "Industry Trusted",
            desc: "Certificates showcasing verified skills trusted by recruiters.",
        },
        {
            icon: GraduationCap,
            title: "Skill Focused",
            desc: "Job-ready certifications with practical assessments.",
        },
        {
            icon: Globe,
            title: "Global Access",
            desc: "Take assessments anywhere and share credentials globally.",
        },
    ]

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#0B2A42] via-[#163A57] to-[#0A2235] text-white overflow-hidden md:px-16">
            <Header />

            {/* HERO */}
            <div className="relative px-4 md:px-8  pb-20">

                {/* Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

                {/* Back Nav */}
              
                    
              
                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT */}
                    <div
                        data-aos="fade-right"
                        data-aos-delay="100"
                    >

                        {/* Badge */}
                        <div
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
                backdrop-blur-md
              "
                            data-aos="fade-up"
                            data-aos-delay="150"
                        >
                            <Sparkles className="w-4 h-4 text-[#11B5FF]" />
                            The Future Of Skill Verification
                        </div>

                        {/* Heading */}
                        <h1
                            className="text-3xl md:text-5xl font-black leading-[1.05]"
                            data-aos="fade-up"
                            data-aos-delay="250"
                        >
                            Build Skills.
                            <br />

                            <span className="text-[#11B5FF]">
                                Earn Trust.
                            </span>

                            <br />

                            Get Certified.
                        </h1>

                        {/* Subtext */}
                        <p
                            className="mt-5 text-[#A8BED1] text-sm md:text-lg leading-relaxed max-w-2xl"
                            data-aos="fade-up"
                            data-aos-delay="350"
                        >
                            LearnBridge helps learners validate real-world skills through AI-powered, industry-focused assessments.
                        </p>

                        {/* CTA */}
                        <div
                            className="flex flex-wrap gap-4 mt-8"
                            data-aos="fade-up"
                            data-aos-delay="450"
                        >

                            <button
                                onClick={() => navigate("/categories")}
                                className="
                  group
                  px-6
                  py-3
                  rounded-2xl
                  bg-[#8CC63F]
                  hover:bg-[#9EDB4B]
                  text-black
                  text-sm
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

                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="
                  px-6
                  py-3
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  hover:bg-white/10
                  transition-all
                  text-sm
                "
                            >
                                Back Home
                            </button>
                        </div>

                        {/* Stats */}
                        <div
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
                            data-aos="fade-up"
                            data-aos-delay="550"
                        >

                            {stats.map((s, idx) => (
                                <div
                                    key={s.label}
                                    data-aos="zoom-in"
                                    data-aos-delay={600 + idx * 100}
                                    className="
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    p-4
                    backdrop-blur-md
                  "
                                >
                                    <h3 className="text-2xl font-bold">
                                        {s.value}
                                    </h3>

                                    <p className="text-white/50 text-xs mt-1">
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT VISUAL */}
                    <div
                        className="relative flex justify-center"
                        data-aos="zoom-in"
                        data-aos-delay="300"
                    >

                        {/* Floating Badge */}
                        <div
                            className="
                absolute
                top-2
                right-2
                md:top-[-20px]
                md:right-[-20px]
                z-20
                bg-[#E7D38D]
                text-black
                font-bold
                rounded-2xl
                px-4
                py-4
                shadow-2xl
              "
                            data-aos="fade-left"
                            data-aos-delay="700"
                        >
                            <p className="text-[10px] leading-tight">
                                AI <br /> Verified
                            </p>

                            <p className="text-2xl font-black mt-1">
                                Cert
                            </p>
                        </div>

                        {/* Real Certificate */}
                        <img
                            src="/template.png"
                            alt="certificate"
                            data-aos="flip-left"
                            data-aos-delay="500"
                            className="
                w-full
                max-w-[420px]
                rounded-[32px]
                border
                border-white/10
                shadow-[0_25px_80px_rgba(0,0,0,0.45)]
                object-contain
              "
                        />

                        {/* Floating Card */}
                        <div
                            className="
                hidden md:block
                absolute
                -bottom-8
                -left-8
                rounded-3xl
                bg-[#0D3454]
                border
                border-white/10
                p-4
                shadow-2xl
                backdrop-blur-md
              "
                            data-aos="fade-up"
                            data-aos-delay="900"
                        >
                            <div className="flex items-center gap-4">

                                <div
                                    className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-[#8CC63F]/15
                    border
                    border-[#8CC63F]/20
                    flex
                    items-center
                    justify-center
                  "
                                >
                                    <CheckCircle2 className="w-6 h-6 text-[#8CC63F]" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold">
                                        96%
                                    </h3>

                                    <p className="text-white/50 text-xs">
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
                    <div
                        className="text-center mb-14"
                        data-aos="fade-up"
                    >

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
                text-xs
                mb-5
                backdrop-blur-xl
              "
                        >
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            Why LearnBridge
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            Built For The
                            <span className="text-emerald-400">
                                {" "}Modern Workforce
                            </span>
                        </h2>

                        <p className="text-emerald-50/70 text-sm md:text-lg mt-5 max-w-3xl mx-auto">
                            AI-powered assessments and modern certifications designed for real-world skills.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        {features.map((f, idx) => {
                            const Icon = f.icon

                            return (
                                <div
                                    key={f.title}
                                    data-aos="fade-up"
                                    data-aos-delay={idx * 150}
                                    className="
                    group
                    rounded-3xl
                    bg-emerald-400/[0.07]
                    border
                    border-emerald-300/10
                    p-6
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
                      w-14
                      h-14
                      rounded-2xl
                      bg-emerald-400/15
                      border
                      border-emerald-300/20
                      flex
                      items-center
                      justify-center
                      mb-5
                    "
                                    >
                                        <Icon className="w-7 h-7 text-emerald-400" />
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-white">
                                        {f.title}
                                    </h3>

                                    <p className="text-emerald-50/70 text-sm leading-relaxed">
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