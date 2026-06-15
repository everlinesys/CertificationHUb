import Button from "../ui/Button"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Sparkles, BadgeCheck } from "lucide-react"
import Header from "../layout/Header"
import Trial from "../Due"

export default function Hero() {
  const navigate = useNavigate()

  return (<div className="bg-[#001F3F] md:px-16">
    <Trial/>
    <div className=" md:flex fixed top-0 left-0 w-full z-50">
      <Header />
    </div>
    <section className="relative overflow-hidden flex items-center px-4 lg:px-12 pt-24 pb-32 md:py-2">

      {/* Background Glow */}


      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left " data-aos="fade-right"
          data-aos-delay="100">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs mb-5 backdrop-blur-md" data-aos="fade-up"
            data-aos-delay="150">
            <Sparkles className="w-3 h-3 text-[#74C365]" />
            AI Powered Skill Certification
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-5xl md:text-5xl font-black leading-[1.05] tracking-tight text-white">
            Unlock Your{" "}
            <span className=" text-[#74C365]">
              Certificate
            </span>

            <br />

            <span className=" sm:block pr-2">
              Recognised by
            </span>

            <span className="old-text-[#E9D08A] text-[#74C365]">
              Top
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
    bg-gradient-to-r
    from-[#D4AF37]
    via-[#F4D03F]
    to-[#C89B2B]
    hover:from-[#E0BC4A]
    hover:via-[#FFD95A]
    hover:to-[#D6A93A]
    text-black
    font-bold
    px-8
    py-4
    rounded-2xl
    transition-all
    duration-300
    hover:scale-[1.03]
    shadow-[0_10px_40px_rgba(212,175,55,0.35)]
  "
>
  {/* Golden Shimmer */}
  <span
    className="
      absolute
      inset-0
      -translate-x-[150%]
      animate-shimmer
      bg-gradient-to-r
      from-transparent
      via-[#FFF6CC]/50
      to-transparent
      skew-x-[-20deg]
    "
  />

  <span className="relative flex items-center gap-2 text-black">
    Get Certified

    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </span>
</Button>

            <button
              onClick={() => navigate("/about")}
              className="text-white/70 hover:text-white transition-colors font-medium "
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
        <div className="relative flex justify-center lg:justify-end md:w-[25vw]"
          data-aos="zoom-in"
          data-aos-delay="300">

          {/* Certificate Card */}
          {/* Real Certificate */}
          <div className="relative w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[500px]">

            {/* Floating Skill Badge */}
            <div className="absolute top-[-8px] md:top-[-30px] right-[-8px] md:right-[-30px] sm:top-2 sm:right-4 old-bg-[#E7D38D] bg-[#74C365] text-black font-bold rounded-2xl px-2.5 py-3 sm:px-3 sm:py-4 shadow-xl z-20">

              <p className="text-[10px] sm:text-xs leading-tight">
                Prove <br /> Your <br /> Skill in
              </p>

              <p className="text-xl sm:text-2xl font-black mt-1">
                5min
              </p>
            </div>

            <img
              src="/template.png"
              alt="certificate"
              className="
      w-full
      rounded-3xl
      shadow-[0_20px_80px_rgba(0,0,0,0.45)]
      border
      border-white/10
      object-contain
    "
            />
          </div>

          {/* Floating Mobile Mockup */}
          <div className="hidden lg:block absolute left-[-20px]  bottom-[-10px] md:bottom-[-50px]  md:left-[-50px] w-[140px] h-[290px] rounded-[32px] border-[6px] border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">

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