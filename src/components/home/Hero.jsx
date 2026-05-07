import Button from "../ui/Button"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Sparkles, BadgeCheck } from "lucide-react"
import Header from "../layout/Header"

export default function Hero() {
  const navigate = useNavigate()

  return (<div className="bg-[#062B45]">
    <div className=" md:flex fixed top-0 left-0 w-full z-50">
      <Header />
    </div>
    <section className="relative overflow-hidden flex items-center px-4 lg:px-12 pt-24 pb-32 md:py-2">

      {/* Background Glow */}


      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs mb-5 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            AI Powered Skill Certification
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-5xl md:text-5xl font-black leading-[1.05] tracking-tight text-white">
            Unlock Your{" "}
            <span className="text-[#E9D08A]">
              Certificate
            </span>

            <br />

            <span className=" sm:block pr-2">
              Recognised by
            </span>

            <span className="text-[#E9D08A]">
              1100+ Top
            </span>{" "}
            Companies
          </h1>

          {/* Subtext */}
          <p className="mt-5 text-sm sm:text-base md:text-xl text-[#B7C6D2] leading-relaxed max-w-xl mx-auto lg:mx-0">
            Validate your skills with AI-powered assessments and earn certificates trusted by recruiters worldwide.
          </p>

          {/* Desktop CTA */}
          <div className="hidden md:flex mt-10 flex-row gap-5 items-center">
            <Button
              onClick={() => navigate("/categories")}
              className="
    group
    relative
    overflow-hidden
    bg-[#8CC63F]
    hover:bg-[#99D14B]
    text-black
    font-bold
    px-8
    py-4
    rounded-2xl
    transition-all
    duration-300
    hover:scale-[1.03]
    shadow-[0_10px_40px_rgba(140,198,63,0.35)]
  "
            >
              <span
                className="
      absolute
      inset-0
      -translate-x-[150%]
      animate-shimmer
      bg-gradient-to-r
      from-transparent
      via-white/30
      to-transparent
      skew-x-[-20deg]
    "
              />

              <span className="relative flex items-center gap-2">
                Get Certified

                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>

            <button
              onClick={() => navigate("/about")}
              className="text-white/70 hover:text-white transition-colors font-medium"
            >
              Explore Programs
            </button>
          </div>

          {/* Proof */}
          <div className="mt-6 flex flex-wrap justify-center lg:justify-start items-center gap-3 text-xs sm:text-sm text-[#8BB6D1]">
            <span className="font-semibold text-white">
              1555+ from Chennai
            </span>

            <span className="w-1 h-1 rounded-full bg-white/30" />

            <span>
              Scored {">"}60% this week
            </span>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative flex justify-center lg:justify-end">

          {/* Certificate Card */}
          <div className="relative w-full max-w-[290px] sm:max-w-[350px] lg:max-w-[460px] rounded-3xl border border-[#D6B86B] bg-[#07131E] shadow-2xl">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12)_1px,_transparent_1px)] bg-[size:10px_10px]" />

            {/* Floating Skill Badge */}
            <div className="absolute top-[-8px] right-[-8px] sm:top-2 sm:right-4 bg-[#E7D38D] text-black font-bold rounded-2xl px-2.5 py-3 sm:px-3 sm:py-4 shadow-xl z-20">

              <p className="text-[10px] sm:text-xs leading-tight">
                Prove <br /> Your <br /> Skill in
              </p>

              <p className="text-xl sm:text-2xl font-black mt-1">
                5min
              </p>
            </div>

            <div className="relative z-10 p-4 sm:p-6 lg:p-8">

              {/* Top Seal */}
              <div className="flex justify-center mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#D6B86B]/20 flex items-center justify-center border border-[#D6B86B]/30">
                  <BadgeCheck className="text-[#E9D08A] w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Certificate Content */}
              <div className="text-center">

                <p className="text-[#E9D08A] text-2xl sm:text-3xl lg:text-4xl font-serif italic">
                  Certificate
                </p>

                <p className="text-white/60 mt-2 sm:mt-3 text-[11px] sm:text-xs">
                  This certificate is presented to
                </p>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mt-2">
                  Alex Johnson
                </h2>

                <p className="text-white/70 mt-2 text-xs sm:text-sm">
                  for successfully completing
                </p>

                <h3 className="text-[#E9D08A] text-base sm:text-xl mt-2 font-medium">
                  Full Stack Development
                </h3>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12">

                <div className="text-center">
                  <div className="h-[1px] bg-white/20 mb-2" />

                  <p className="text-white text-[11px] sm:text-xs font-medium">
                    John Carter
                  </p>

                  <p className="text-white/50 text-[9px] sm:text-[10px]">
                    Co-Founder
                  </p>
                </div>

                <div className="text-center">
                  <div className="h-[1px] bg-white/20 mb-2" />

                  <p className="text-white text-[11px] sm:text-xs font-medium">
                    Sarah Blake
                  </p>

                  <p className="text-white/50 text-[9px] sm:text-[10px]">
                    Director
                  </p>
                </div>
              </div>

              {/* Bottom Testimonial */}
              <div className="mt-5 sm:mt-8 rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-md">

                <p className="text-white/80 italic leading-relaxed text-xs sm:text-sm">
                  “This certificate helped me land interviews at top tech companies within weeks.”
                </p>
              </div>
            </div>
          </div>

          {/* Floating Mobile Mockup */}
          <div className="hidden lg:block absolute left-[-20px] bottom-[-10px] w-[140px] h-[290px] rounded-[32px] border-[6px] border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-2xl z-20" />

            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
              alt="student"
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-[#0A2235]/90 backdrop-blur-md p-3">

              <p className="text-white text-xs font-semibold">
                What is a Gantt chart used for?
              </p>

              <div className="mt-2 space-y-1.5">
                {["Scheduling tasks", "Budget planning", "Team hiring"].map((item) => (
                  <div
                    key={item}
                    className="bg-white/10 text-white/80 text-[10px] px-2 py-1.5 rounded-lg"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed CTA */}
      {/* Mobile Fixed CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-[#041826] via-[#041826]/95 to-transparent">

        {/* Stats */}
        <div className="flex items-center justify-center gap-3 mb-3 text-[11px]">

          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 backdrop-blur-md">
            🔥 12k+ Certified
          </div>

          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 backdrop-blur-md">
            ⭐ 4.9 Rating
          </div>

          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 backdrop-blur-md">
            🚀 Hiring Ready
          </div>
        </div>

        <Button
          onClick={() => navigate("/categories")}
          className="
    group
    relative
    overflow-hidden
    w-full
    bg-[#8CC63F]
    hover:bg-[#99D14B]
    text-black
    font-bold
    py-4
    rounded-2xl
    shadow-[0_10px_40px_rgba(140,198,63,0.35)]
    text-base
    flex
    items-center
    justify-center
    gap-2
    transition-all
    duration-300
    active:scale-[0.98]
  "
        >
          <span
            className="
      absolute
      inset-0
      -translate-x-[150%]
      animate-shimmer
      bg-gradient-to-r
      from-transparent
      via-white/30
      to-transparent
      skew-x-[-20deg]
    "
          />

          <span className="relative flex items-center gap-2">
            Get Certified Now

            <ArrowRight className="w-5 h-5 animate-[arrowMove_1s_ease-in-out_infinite]" />
          </span>
        </Button>

        {/* Tiny trust text */}
        <p className="text-center text-[11px] text-white/40 mt-2">
          Trusted by learners from 1100+ companies
        </p>
      </div>
    </section>
  </div>
  )
}