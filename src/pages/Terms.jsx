// Terms.jsx

import Header from "../components/layout/Header"

export default function Terms() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#071D2E] via-[#0B2A42] to-[#163A57] text-white">
      <Header />

      <div className="max-w-5xl mx-auto px-5 md:px-8 py-14">
        <div className="mb-10">
          <p className="text-[#11B5FF] text-sm font-semibold mb-3">
            LEGAL
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Terms & Conditions
          </h1>

          <p className="mt-5 text-[#A8BED1] max-w-3xl leading-relaxed">
            By using this platform, you agree to comply with the following
            terms and conditions.
          </p>
        </div>

        <div className="space-y-8">
          {[
            {
              title: "Platform Usage",
              text:
                "Users must use the platform lawfully and avoid misuse, fraudulent activities, or unauthorized access attempts.",
            },
            {
              title: "Certification Validity",
              text:
                "Certificates are issued based on assessment performance and may be revoked in case of fraudulent activity.",
            },
            {
              title: "User Responsibility",
              text:
                "Users are responsible for maintaining the confidentiality of their account credentials.",
            },
            {
              title: "Intellectual Property",
              text:
                "All platform content, branding, designs, and examination materials remain the intellectual property of the platform.",
            },
            {
              title: "Limitation of Liability",
              text:
                "We are not liable for indirect damages, service interruptions, or losses arising from platform usage.",
            },
            {
              title: "Policy Changes",
              text:
                "Terms may be updated periodically without prior notice. Continued use indicates acceptance of updated policies.",
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