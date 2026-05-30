import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Download,
  ExternalLink,
  Share2,
  ShieldCheck,
  Calendar,
  Award,
} from "lucide-react"
import api from "../../api"

export default function MyCertificates() {
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await api.get("/student/certificates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCerts(res.data)
      } catch (err) {
        console.error(err)
        setError("Failed to load certificates")
      } finally {
        setLoading(false)
      }
    }
    fetchCerts()
  }, [])
  const shareToLinkedIn = (cert) => {
    const postText = `
🎉 I just earned the "${cert.certification?.title}" certification from Eduline.

Credential ID: ${cert.certificateNumber}

Verify Certificate:
${cert.certificateUrl}

#Certification #ProfessionalDevelopment #Eduline
`;

    const linkedinUrl =
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cert.certificateUrl)}&title=${encodeURIComponent(postText)}`;
          // `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    //   cert.certificateUrl
    // )}`;

    navigator.clipboard.writeText(postText);

    window.open(linkedinUrl, "_blank");
  };
  const downloadCertificate = async (url, title) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = `${title || "certificate"}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(blobUrl)
    } catch (err) {
      console.error(err)
      alert("Failed to download certificate")
    }
  }

  const handleShare = async (cert) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: cert.certification?.title,
          text: "Check out my certificate!",
          url: cert.certificateUrl,
        })
      } else {
        await navigator.clipboard.writeText(cert.certificateUrl)
        alert("Certificate URL copied to clipboard.")
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse max-w-5xl">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-white/[0.02] border border-white/5 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/[0.05] text-red-400 text-xs max-w-fit">
        {error}
      </div>
    )
  }

  return (
    <div className="max-w-5xl space-y-6">

      {/* HEADER SECTION */}
      <div className="flex items-center gap-2 border-b border-white/[0.02] pb-4">
        <ShieldCheck className="text-[#11B5FF] w-4 h-4" />
        <h1 className="text-sm font-semibold tracking-tight text-white">
          My Earned Credentials
        </h1>
        <span className="text-[10px] bg-white/5 text-slate-400 px-1.5 py-0.5 rounded-md font-medium ml-1">
          {certs.length}
        </span>
      </div>

      {/* EMPTY STATE */}
      {certs.length === 0 && (
        <p className="text-xs text-slate-500 py-6 bg-white/[0.01] border border-dashed border-white/5 rounded-xl text-center">
          No certificates issued yet. Pass an active evaluation to view credentials here.
        </p>
      )}

      {/* CERTIFICATES GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {certs.map((c) => {
          const issueDate = new Date(c.issuedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })

          return (
            <div
              key={c.id}
              className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-white/10 transition-all duration-200"
            >
              {/* Top Meta Area */}
              <div className="p-4 border-b border-white/[0.03]">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/10 flex items-center justify-center text-[#11B5FF] shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-xs text-white line-clamp-2 group-hover:text-[#11B5FF] transition-colors leading-tight">
                      {c.certification?.title || "Unknown Certification"}
                    </h3>
                    {c.certificateNumber && (
                      <p className="text-[10px] text-cyan-400/80 font-mono mt-1.5">
                        ID: OTC067-{c.certificateNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Lower Dynamic Action Section */}
              <div className="p-4 bg-white/[0.01] flex flex-col gap-2">
                {c.certificateUrl ? (
                  <>
                    {/* Primary Button */}
                    <button
                      onClick={() => window.open(c.certificateUrl, "_blank")}
                      className="w-full flex items-center justify-center gap-1.5 bg-[#11B5FF] hover:bg-cyan-500 text-white text-xs font-medium py-2 rounded-lg shadow-md shadow-cyan-500/5 transition duration-200"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Verification Page
                    </button>

                    {/* Secondary Utilities Row */}
                    <div className="grid grid-cols-2 gap-2 mt-0.5">
                      <button
                        onClick={() => downloadCertificate(c.certificateUrl, c.certification?.title)}
                        className="flex items-center justify-center gap-1.5 bg-white/[0.03] border border-white/5 hover:bg-white/10 text-slate-300 text-[11px] font-medium py-1.5 rounded-lg transition"
                      >
                        <Download className="w-3 h-3 text-slate-400" />
                        PDF
                      </button>
                      <button
                        onClick={() => handleShare(c)}
                        className="flex items-center justify-center gap-1.5 bg-white/[0.03] border border-white/5 hover:bg-white/10 text-slate-300 text-[11px] font-medium py-1.5 rounded-lg transition"
                      >
                        <Share2 className="w-3 h-3 text-slate-400" />
                        Share
                      </button></div>
                    <button
                      onClick={() => shareToLinkedIn(c)}
                      className="flex items-center justify-center gap-1.5 bg-[#0077B5]/10 border border-[#0077B5]/20 hover:bg-[#0077B5]/20 text-[#0077B5] text-[11px] font-medium py-1.5 rounded-lg transition"
                    >
                      <Share2 className="w-3 h-3" />
                      LinkedIn
                    </button>

                  </>
                ) : (
                  <button
                    onClick={() => navigate(`/certificate/${c.certificationId}`)}
                    className="w-full bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 text-[11px] font-medium py-2 rounded-lg transition"
                  >
                    Generate Certificate
                  </button>
                )}

                {/* Footer Time Metrics */}
                <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-2 pt-2 border-t border-white/[0.02]">
                  <Calendar className="w-3 h-3 text-slate-600" />
                  <span>Issued: {issueDate}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}