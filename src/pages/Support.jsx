// Support.jsx

import Header from "../components/layout/Header"
import { Mail, Phone, MessageCircle } from "lucide-react"

export default function Support() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#071D2E] via-[#0B2A42] to-[#163A57] text-white">
      <Header />

      <div className="max-w-5xl mx-auto px-5 md:px-8 py-14">
        <div className="text-center mb-12">
          <p className="text-[#11B5FF] text-sm font-semibold mb-3">
            SUPPORT
          </p>

          <h1 className="text-4xl md:text-6xl font-bold">
            We're Here To Help
          </h1>

          <p className="mt-5 text-[#A8BED1] max-w-2xl mx-auto leading-relaxed">
            Need assistance with certifications, exams, verification, or
            technical issues? Reach out to our support team anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Mail,
              title: "Email Support",
              value: "support@learnbridge.in",
            },
            {
              icon: Phone,
              title: "Phone",
              value: "+91 98765 43210",
            },
            {
              icon: MessageCircle,
              title: "Live Chat",
              value: "Available 9AM - 6PM",
            },
          ].map((item, i) => {
            const Icon = item.icon

            return (
              <div
                key={i}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-8
                  text-center
                  backdrop-blur-sm
                  hover:bg-white/10
                  transition-all
                  duration-300
                "
              >
                <div className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-[#11B5FF]/20
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-5
                ">
                  <Icon className="w-8 h-8 text-[#11B5FF]" />
                </div>

                <h2 className="text-2xl font-bold mb-3">
                  {item.title}
                </h2>

                <p className="text-[#C7D6E5]">
                  {item.value}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}