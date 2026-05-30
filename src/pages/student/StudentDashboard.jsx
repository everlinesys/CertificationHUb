import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Calendar, Award, CheckCircle2, XCircle, FileText, ExternalLink } from "lucide-react"
import api from "../../api"

export default function StudentDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await api.get("/student/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setData(res.data)
      } catch (err) {
        console.error(err)
        setError("Failed to load dashboard data. Please refresh.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Inline premium skeleton loading state
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-20 bg-white/[0.02] border border-white/5 rounded-xl" />
          ))}
        </div>
        <div className="h-4 w-28 bg-white/5 rounded" />
        <div className="grid md:grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-white/[0.02] border border-white/5 rounded-xl" />
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
    <div className="max-w-5xl space-y-8">
      
      {/* 📊 STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard title="Total Attempts" value={data?.totalAttempts || 0} icon={FileText} />
        <StatCard title="Earned Certificates" value={data?.totalCertificates || 0} icon={Award} />
      </div>

      {/* 📚 MY EXAMS SECTION */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold tracking-tight text-white">Recent Exam Attempts</h2>
          <span className="text-[10px] bg-white/5 text-slate-400 px-1.5 py-0.5 rounded-md font-medium">
            {data?.attempts?.length || 0}
          </span>
        </div>

        {data?.attempts?.length === 0 ? (
          <p className="text-xs text-slate-500 py-3 bg-white/[0.01] border border-dashed border-white/5 rounded-xl text-center">
            No exam attempts recorded yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data?.attempts?.map((attempt) => {
              const dateString = new Date(attempt.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })

              return (
                <div 
                  key={attempt.id} 
                  className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl flex flex-col justify-between group hover:border-white/10 transition-colors duration-200"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs font-medium text-white line-clamp-1 group-hover:text-[#11B5FF] transition-colors">
                        {attempt.certification?.title}
                      </h3>
                      {attempt.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 mt-1">
                      Score: <span className="text-slate-200 font-medium">{attempt.score}</span> / {attempt.totalQuestions}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-white/[0.03] flex items-center justify-between text-[10px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{dateString}</span>
                    </div>
                    <span className={`font-medium ${attempt.passed ? "text-emerald-400/80" : "text-rose-400/80"}`}>
                      {attempt.passed ? "Passed" : "Failed"}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* 🎓 CERTIFICATES SECTION */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold tracking-tight text-white">Earned Credentials</h2>
          <span className="text-[10px] bg-[#11B5FF]/10 text-[#11B5FF] px-1.5 py-0.5 rounded-md font-medium">
            {data?.certificates?.length || 0}
          </span>
        </div>

        {data?.certificates?.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 bg-white/[0.01] border border-dashed border-white/5 rounded-xl text-center">
            No credentials earned yet. Pass an exam to unlock.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data?.certificates?.map((cert) => (
              <div 
                key={cert.id} 
                className="bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/5 p-3.5 rounded-xl flex flex-col justify-between"
              >
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/10 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-[#11B5FF]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-medium text-white truncate">
                      {cert.certification?.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Verified Certificate
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/certificate/${cert.certificationId}`)}
                  className="mt-4 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] font-medium text-slate-300 hover:bg-[#11B5FF] hover:text-white hover:border-transparent transition-all duration-200"
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

/* Micro Stats Component */
function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl flex items-center justify-between gap-2">
      <div>
        <p className="text-[11px] text-slate-400 font-medium truncate">
          {title}
        </p>
        <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
          {value}
        </h2>
      </div>
      <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 shrink-0">
        <Icon className="w-4 h-4" />
      </div>
    </div>
  )
}