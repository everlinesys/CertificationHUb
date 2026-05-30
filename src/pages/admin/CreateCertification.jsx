import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { PlusCircle, Edit3, Trash2, HelpCircle, FileText, IndianRupee, Clock, Award } from "lucide-react";

export default function CreateCertification() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    passMark: "",
    duration: "",
    categoryId: ""
  });

  const [certs, setCerts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    api.get("/categories")
      .then(res => setCategories(res.data))
      .catch(console.error);

    fetchCerts();
  }, []);

  const triggerFeedback = (message, type = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const fetchCerts = async () => {
    try {
      const res = await api.get("/certifications");
      setCerts(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const submit = async () => {
    if (!form.title || !form.price || !form.passMark) {
      return triggerFeedback("Please populate all required validation metrics.", "error");
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        price: Number(form.price),
        passMark: Number(form.passMark),
        duration: form.duration ? Number(form.duration) : null
      };

      if (editingId) {
        await api.put(`/certifications/${editingId}`, payload);
        triggerFeedback("Certification parameter payload updated.");
      } else {
        await api.post("/certifications", payload);
        triggerFeedback("New certification track initialized.");
      }

      resetForm();
      fetchCerts();
    } catch (err) {
      triggerFeedback("Transaction execution error.", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      passMark: "",
      duration: "",
      categoryId: ""
    });
    setEditingId(null);
  };

  const deleteCert = async (id) => {
    if (!window.confirm("Purge certification? All dependent track metrics will be cleared.")) return;

    try {
      await api.delete(`/certifications/${id}`);
      triggerFeedback("Certification purged cleanly from core ledger.");
      fetchCerts();
    } catch {
      triggerFeedback("Unable to clear tracking node.", "error");
    }
  };

  const editCert = (c) => {
    setEditingId(c.id);
    setForm({
      title: c.title || "",
      description: c.description || "",
      price: c.price || "",
      passMark: c.passMark || "",
      duration: c.duration || "",
      categoryId: c.categoryId || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-slate-200 antialiased">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.02]">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {editingId ? "Modify Certification" : "Certification Tracks Provisioning"}
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Configure dynamic parameters, benchmark pass limits, and map operational curriculum structures
          </p>
        </div>

        {feedback && (
          <div className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition ${
            feedback.type === "error" 
              ? "bg-rose-500/5 border-rose-500/20 text-rose-400" 
              : "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
          }`}>
            {feedback.message}
          </div>
        )}
      </div>

      {/* WORKSPACE MANIFEST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* MANAGEMENT FORM PANEL */}
        <div className="lg:col-span-5 space-y-4 sticky top-20">
          <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-4 space-y-3.5">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              Track Parameters
            </span>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-medium">Certification Title *</label>
              <input
                value={form.title}
                placeholder="Ex: Advanced Distributed Infrastructures"
                className="w-full text-xs p-2.5 bg-zinc-950 border border-white/5 rounded-lg text-white outline-none focus:border-[#11B5FF]/30 transition"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-medium">Syllabus Context Abstract</label>
              <textarea
                value={form.description}
                placeholder="Detailed catalog syllabus, module mappings, and target criteria notes..."
                className="w-full text-xs p-2.5 bg-zinc-950 border border-white/5 rounded-lg text-slate-300 outline-none focus:border-[#11B5FF]/30 transition min-h-[70px] max-h-[140px]"
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <IndianRupee className="w-2.5 h-2.5 text-slate-500" /> Valuation Rate *
                </label>
                <input
                  value={form.price}
                  type="number"
                  placeholder="0.00"
                  className="w-full text-xs p-2.5 bg-zinc-950 border border-white/5 rounded-lg text-white outline-none focus:border-[#11B5FF]/30 transition"
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Award className="w-2.5 h-2.5 text-slate-500" /> Pass Boundary % *
                </label>
                <input
                  value={form.passMark}
                  type="number"
                  placeholder="75"
                  className="w-full text-xs p-2.5 bg-zinc-950 border border-white/5 rounded-lg text-white outline-none focus:border-[#11B5FF]/30 transition"
                  onChange={(e) => setForm({ ...form, passMark: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-slate-500" /> Duration (Minutes)
                </label>
                <input
                  value={form.duration}
                  type="number"
                  placeholder="120"
                  className="w-full text-xs p-2.5 bg-zinc-950 border border-white/5 rounded-lg text-white outline-none focus:border-[#11B5FF]/30 transition"
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-medium">Category Mapping</label>
                <select
                  value={form.categoryId}
                  className="w-full text-xs p-2.5 bg-zinc-950 border border-white/5 rounded-lg text-slate-200 outline-none focus:border-[#11B5FF]/30 transition"
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                >
                  <option value="">Select Category Node...</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={submit}
                disabled={loading}
                className="flex-1 bg-white text-zinc-950 font-semibold text-xs py-2.5 rounded-lg hover:bg-slate-200 transition disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {!editingId && <PlusCircle className="w-3.5 h-3.5" />}
                {loading ? "Committing..." : editingId ? "Save Modifications" : "Deploy Certification"}
              </button>

              {editingId && (
                <button
                  onClick={resetForm}
                  className="bg-zinc-800 hover:bg-zinc-700 text-xs px-4 rounded-lg text-slate-400 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FEED MONITOR PANEL (LISTING) */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block px-1">
            Active Certification Ledger ({certs.length})
          </span>

          {certs.length === 0 && (
            <div className="rounded-xl border border-dashed border-white/5 p-12 text-center space-y-2">
              <FileText className="w-6 h-6 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">No system certification tracks are initialized.</p>
            </div>
          )}

          <div className="space-y-2.5">
            {certs.map((c) => (
              <div 
                key={c.id} 
                className="bg-zinc-900/30 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/10 transition"
              >
                <div className="space-y-1 min-w-0">
                  <h3 className="text-xs font-semibold text-white tracking-tight truncate">{c.title}</h3>
                  {c.description && (
                    <p className="text-slate-400 text-[11px] line-clamp-1 pr-4">{c.description}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-3 pt-0.5 text-[10px] font-mono text-slate-500">
                    <span className="text-[#11B5FF] font-semibold">₹{c.price.toLocaleString("en-IN")}</span>
                    <span>•</span>
                    <span>Min Threshold: <span className="text-slate-300 font-bold">{c.passMark}%</span></span>
                    {c.duration && (
                      <>
                        <span>•</span>
                        <span>Limits: {c.duration}m</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 border-t sm:border-t-0 border-white/[0.02] pt-2 sm:pt-0 justify-end text-xs font-medium">
                  <button
                    onClick={() => editCert(c)}
                    className="flex items-center gap-1 text-slate-400 hover:text-[#11B5FF] transition"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Config</span>
                  </button>

                  <button
                    onClick={() => deleteCert(c.id)}
                    className="flex items-center gap-1 text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Purge</span>
                  </button>

                  <Link
                    to={`/admin/questions/${c.id}`}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>Questions</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}