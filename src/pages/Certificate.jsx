import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ShieldCheck, CreditCard, Lock, Loader2, ExternalLink, AlertTriangle } from "lucide-react"
import api from "../api"

export default function CertificatePage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [cert, setCert] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCert = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return navigate("/login")

        const res = await api.get(`/certificate/status/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setCert(res.data)
      } catch (err) {
        console.error(err)
        setError("Unable to process your request.")
      } finally {
        setLoading(false)
      }
    }
    fetchCert()
  }, [id, navigate])

  const handlePayment = async () => {
    try {
      if (paying) return
      setPaying(true)

      const token = localStorage.getItem("token")
      const { data } = await api.post(
        "/payment/create-order",
        { certificationId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data?.message === "Already purchased") {
        alert("This credential has already been unlocked.")
        window.location.reload()
        return
      }

      if (!data?.orderId) {
        alert("Failed to build order context. Please try again.")
        return
      }

      if (!window.Razorpay) {
        alert("Payment Gateway SDK offline. Please reload.")
        return
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: cert?.certification?.title || "Credential Hub",
        description: "Official Certification Verification",
        prefill: {
          email: JSON.parse(localStorage.getItem("user"))?.email,
        },
        theme: { color: "#11B5FF" },
        handler: async function (response) {
          try {
            await api.post(
              "/payment/verify",
              { ...response, certificationId: id },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            window.location.reload()
          } catch (err) {
            console.error("VERIFY ERROR:", err)
            alert("Verification mismatch. Support has been notified.")
          }
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", (err) => {
        console.error("PAYMENT FAILED:", err)
        alert("Transaction declined. Check payment details.")
      })
      rzp.open()
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || "Order context generation failure.")
    } finally {
      setPaying(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white/[0.01] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-3 animate-pulse">
          <div className="w-10 h-10 rounded-xl bg-white/5" />
          <div className="h-4 bg-white/5 rounded w-2/3" />
          <div className="h-3 bg-white/5 rounded w-1/2 mt-2" />
          <div className="w-full h-9 bg-white/5 rounded-lg mt-4" />
        </div>
      </div>
    )
  }

  if (error || !cert) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-xs text-center p-4 rounded-xl border border-red-500/10 bg-red-500/[0.05] text-red-400 text-xs">
          {error || "Something went wrong fetching this verification block."}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-center relative overflow-hidden">
        {/* Decorative background glow elements */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#11B5FF]/5 rounded-full blur-2xl pointer-events-none" />

        <h1 className="text-sm font-semibold tracking-tight text-white mb-6">
          {cert.certification?.title || "Verification Asset"}
        </h1>

        {/* ✅ STATUS 1: READY FOR ACCESS */}
        {cert.certificateUrl && (
          <div className="space-y-4">
            <div className="mx-auto w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-emerald-400 font-medium">Credential Ready</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Your official verifiable certificate is live.</p>
            </div>
            <button
              onClick={() => window.open(cert.certificateUrl, "_blank")}
              className="w-full flex items-center justify-center gap-1.5 bg-[#11B5FF] hover:bg-cyan-500 text-white text-xs font-medium py-2 rounded-lg transition-all duration-200 shadow-md shadow-cyan-500/5"
            >
              <span>Launch Certificate</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 💳 STATUS 2: UNLOCKED BUT REQUIRES FEE */}
        {cert.passed && !cert.purchased && (
          <div className="space-y-4">
            <div className="mx-auto w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-amber-400 shadow-md shadow-amber-500/5">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-amber-400 font-medium">Evaluation Complete</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Unlock issuing access to request your official credential.</p>
            </div>
            <button
              onClick={handlePayment}
              disabled={paying}
              className="w-full flex items-center justify-center gap-1.5 bg-white text-slate-900 hover:bg-slate-100 text-xs font-semibold py-2 rounded-lg disabled:opacity-50 transition-all duration-200"
            >
              {paying ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing Checkout...</span>
                </>
              ) : (
                <span>Pay Fee & Issue • ₹{cert.price}</span>
              )}
            </button>
          </div>
        )}

        {/* ⏳ STATUS 3: PROCESSING BACKGROUND ASSET GENERATION */}
        {cert.passed && cert.purchased && !cert.certificateUrl && (
          <div className="py-4 space-y-3">
            <Loader2 className="w-5 h-5 text-[#11B5FF] animate-spin mx-auto" />
            <div>
              <p className="text-xs text-slate-200 font-medium">Compiling Ledger Asset</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Building secure metadata records. Check back momentarily.</p>
            </div>
          </div>
        )}

        {/* ❌ STATUS 4: INELIGIBLE */}
        {!cert.passed && (
          <div className="space-y-3 py-2">
            <div className="mx-auto w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/10 flex items-center justify-center text-rose-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-rose-400 font-medium">Access Restricted</p>
              <p className="text-[11px] text-slate-400 max-w-[240px] mx-auto mt-1 leading-normal">
                You must pass the evaluation track requirement before generating a verified credential signature.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}