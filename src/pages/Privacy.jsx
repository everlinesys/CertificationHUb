// Privacy.jsx

import Header from "../components/layout/Header"

export default function Privacy() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#071D2E] via-[#0B2A42] to-[#163A57] text-white">
      <Header />

      <div className="max-w-5xl mx-auto px-5 md:px-8 py-14">
        <div className="mb-10">
          <p className="text-[#11B5FF] text-sm font-semibold mb-3">
            LEGAL
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Privacy Policy
          </h1>

          <p className="mt-5 text-[#A8BED1] max-w-3xl leading-relaxed">
            We value your privacy and are committed to protecting your
            personal information while using our certification platform.
          </p>
        </div>

        <div className="space-y-8">
          {[
            {
              title: "Information We Collect",
              text:
                "We may collect your name, email address, certification data, exam results, and technical usage information to improve platform experience.",
            },
            {
              title: "How We Use Data",
              text:
                "Your information is used for certification verification, account access, analytics, platform improvements, and customer support.",
            },
            {
              title: "Data Protection",
              text:
                "We implement industry-standard security practices to safeguard your personal information and prevent unauthorized access.",
            },
            {
              title: "Third Party Services",
              text:
                "We may use secure third-party providers for hosting, analytics, authentication, and payment processing.",
            },
            {
              title: "Cookies",
              text:
                "Cookies may be used to improve user experience, maintain sessions, and analyze traffic usage patterns.",
            },
            {
              title: "Contact",
              text:
                "If you have questions regarding this Privacy Policy, please contact our support team.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-6
                backdrop-blur-sm
              "
            >
              <h2 className="text-2xl font-bold mb-3">
                {item.title}
              </h2>

              <p className="text-[#C7D6E5] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}