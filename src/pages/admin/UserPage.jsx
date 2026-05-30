import { useEffect, useState } from "react";
import api from "../../api";
import { Users, FileBadge, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [certs, setCerts] = useState([]);
  const [tab, setTab] = useState("users");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, certsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/certificates"),
      ]);

      setUsers(usersRes.data || []);
      setCerts(certsRes.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-6 w-48 bg-white/5 rounded" />
          <div className="h-3 w-64 bg-white/5 rounded" />
        </div>
        {/* Metric Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-24 bg-white/[0.02] border border-white/5 rounded-xl" />
          <div className="h-24 bg-white/[0.02] border border-white/5 rounded-xl" />
        </div>
        {/* Body List Skeleton */}
        <div className="space-y-3">
          <div className="h-20 bg-white/[0.02] border border-white/5 rounded-xl" />
          <div className="h-20 bg-white/[0.02] border border-white/5 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-200 antialiased">
      {/* SECTION HEADER */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Platform Overview</h1>
        <p className="text-slate-500 text-xs mt-0.5 font-medium">
          Manage system operational accounts and earned identity records
        </p>
      </div>

      {/* OPERATIONAL COUNTERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-4 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider mb-1">Total Users</p>
            <h2 className="text-2xl font-bold text-white tracking-tight font-mono">{users.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#11B5FF]/5 border border-[#11B5FF]/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-[#11B5FF]" />
          </div>
        </div>

        <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-4 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider mb-1">Issued Certificates</p>
            <h2 className="text-2xl font-bold text-white tracking-tight font-mono">{certs.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#11B5FF]/5 border border-[#11B5FF]/10 flex items-center justify-center">
            <FileBadge className="w-4 h-4 text-[#11B5FF]" />
          </div>
        </div>
      </div>

      {/* MATRIX CONTROLS */}
      <div className="flex items-center gap-1 bg-zinc-900/80 border border-white/5 p-1 rounded-lg w-fit">
        <button
          onClick={() => setTab("users")}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
            tab === "users"
              ? "bg-white/5 text-[#11B5FF] border border-white/5 shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Users Registry
        </button>
        <button
          onClick={() => setTab("certs")}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
            tab === "certs"
              ? "bg-white/5 text-[#11B5FF] border border-white/5 shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Earned Records
        </button>
      </div>

      {/* DATA TERMINAL VIEWPORTS */}
      {tab === "users" && (
        <div className="space-y-3">
          {users.length === 0 && <p className="text-slate-500 text-xs italic p-2">No system records available.</p>}
          {users.map((u) => (
            <div key={u.id} className="rounded-xl bg-zinc-900/20 border border-white/5 p-4 hover:border-white/10 transition">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-white tracking-tight">
                    {u.name || "Anonymous Platform Identity"}
                  </h3>
                  <p className="text-slate-400 text-xs font-mono">{u.email}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide bg-white/5 px-2 py-0.5 rounded">
                      {u.role || "User"}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      • {u._count?.certificates || 0} Records Secured
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-[10px] font-medium font-mono">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </div>
              </div>

              {/* Nested Badges */}
              {u.certificates?.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/[0.02] flex flex-wrap gap-1.5">
                  {u.certificates.map((cert) => (
                    <div key={cert.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[10px] text-slate-400">
                      <ShieldCheck className="w-3 h-3 text-[#11B5FF]/70" />
                      {cert.certification?.title || "Standard Verification"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "certs" && (
        <div className="space-y-3">
          {certs.length === 0 && <p className="text-slate-500 text-xs italic p-2">No certificates currently issued.</p>}
          {certs.map((c) => (
            <div key={c.id} className="rounded-xl bg-zinc-900/20 border border-white/5 p-4 hover:border-white/10 transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0 space-y-1">
                  <h3 className="text-xs font-semibold text-white tracking-tight truncate">
                    {c.certification?.title || "Unknown Verification Track"}
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Signatory Target: <span className="text-slate-300 font-mono">{c.user?.email || "Unlinked System Node"}</span>
                  </p>
                  <p className="text-slate-500 text-[10px] font-mono tracking-tight">
                    HASH: {c.certificateNumber || c.id.slice(0, 8)}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <div className="px-2 py-1 rounded bg-white/[0.02] border border-white/5 text-emerald-400 text-[10px] font-medium tracking-wider uppercase font-mono">
                    Verified
                  </div>
                  
                  {c.certificateUrl ? (
                    <a
                      href={c.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-xs text-white font-medium hover:bg-white/10 transition"
                    >
                      <span>Review Asset</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </a>
                  ) : (
                    <span className="text-[10px] text-slate-600 italic font-mono px-2">UNROUTED_URL</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}