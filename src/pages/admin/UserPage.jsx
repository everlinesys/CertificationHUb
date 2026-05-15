import { useEffect, useState } from "react";
import api from "../../api";
import { Users, FileBadge } from "lucide-react";

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

      // Your images show data is directly in .data
      setUsers(usersRes.data || []);
      setCerts(certsRes.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white p-10">Loading Platform Data...</div>;
  }

  return (
    <section className="text-white min-h-screen p-4 md:p-8">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold">Platform Overview</h1>
        <p className="text-white/50 mt-2 text-sm md:text-base">
          Manage users and earned certificates
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm mb-2">Total Users</p>
              <h2 className="text-4xl font-bold">{users.length}</h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#11B5FF]/10 border border-[#11B5FF]/20 flex items-center justify-center">
              <Users className="w-8 h-8 text-[#11B5FF]" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm mb-2">Earned Certificates</p>
              <h2 className="text-4xl font-bold">{certs.length}</h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#8CC63F]/10 border border-[#8CC63F]/20 flex items-center justify-center">
              <FileBadge className="w-8 h-8 text-[#8CC63F]" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 mb-8 bg-white/[0.03] border border-white/10 p-2 rounded-2xl w-fit">
        <button
          onClick={() => setTab("users")}
          className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${tab === "users" ? "bg-[#11B5FF] text-white" : "text-white/60 hover:text-white"
            }`}
        >
          Users
        </button>
        <button
          onClick={() => setTab("certs")}
          className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${tab === "certs" ? "bg-[#8CC63F] text-black" : "text-white/60 hover:text-white"
            }`}
        >
          Earned Certificates
        </button>
      </div>

      {/* USERS LIST */}
      {tab === "users" && (
        <div className="space-y-4">
          {users.length === 0 && <p className="text-white/40">No users found.</p>}
          {users.map((u) => (
            <div key={u.id} className="rounded-3xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {/* u.name in your screenshot is "", so we provide a fallback */}
                    {u.name || "Unnamed User"}
                  </h3>
                  <p className="text-white/50 text-sm mt-1">{u.email}</p>
                  <p className="text-white/40 text-xs mt-2 uppercase tracking-wider">
                    {u.role} • {u._count?.certificates || 0} Certificates
                  </p>
                </div>
                <div className="px-4 py-2 rounded-full bg-[#11B5FF]/10 border border-[#11B5FF]/20 text-[#11B5FF] text-xs font-semibold">
                  Active
                </div>
              </div>

              {/* Nested Certificates inside User */}
              {u.certificates?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {u.certificates.map((cert) => (
                    <div key={cert.id} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70">
                      {/* Note: Check if certification.title exists inside the user's certificate array */}
                      {cert.certification?.title || "Course Certificate"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CERTIFICATES LIST */}
      {tab === "certs" && (
        <div className="space-y-4">
          {certs.length === 0 && <p className="text-white/40">No certificates issued yet.</p>}
          {certs.map((c) => (
            <div key={c.id} className="rounded-3xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {/* In image 2, title is inside the certification object */}
                    {c.certification?.title || "Unknown Certification"}
                  </h3>
                  <p className="text-white/50 text-sm mt-1">
                    Earned by: {c.user?.email || "Unknown User"}
                  </p>
                  <p className="text-white/30 text-xs mt-2 font-mono">
                    ID: {c.certificateNumber || c.id.slice(0, 8)}
                  </p>
                </div><div className="flex items-center gap-3">
                  {/* VIEW BUTTON */}
                  {c.certificateUrl ? (
                    <a
                      href={c.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8CC63F] text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#8CC63F]/20"
                    >
                      <FileBadge size={16} />
                      View Certificate
                    </a>
                  ) : (
                    <span className="text-xs text-white/20 italic">No URL available</span>
                  )}

                  <div className="hidden md:block px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[#8CC63F] text-[10px] font-bold uppercase">
                    Verified
                  </div>
                </div>


               
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}