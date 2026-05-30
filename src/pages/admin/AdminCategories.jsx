import { useEffect, useState } from "react";
import api from "../../api";
import { FolderPlus, Trash2, Layers, Tag } from "lucide-react";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Error pulling category registry:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const triggerFeedback = (message, type = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const createCategory = async () => {
    if (!name.trim()) return;

    try {
      setProcessing(true);
      await api.post("/categories", { name: name.trim() });
      setName("");
      triggerFeedback("Category node appended to index.");
      await fetchCategories();
    } catch {
      triggerFeedback("Failed to record new category.", "error");
    } finally {
      setProcessing(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Purge this category node? Dependent tracking fields may lose reference integrity.")) return;

    try {
      setProcessing(true);
      await api.delete(`/categories/${id}`);
      triggerFeedback("Category node permanently dropped.");
      await fetchCategories();
    } catch {
      triggerFeedback("Transaction execution error.", "error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-slate-200 antialiased">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.02]">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Taxonomy & Category Index</h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Organize core structural parent directories for academic and certification modules
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

      {/* WORKSPACE MATRIX CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* TAXONOMY PROVISIONER PANEL */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-4 space-y-3.5">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              Initialize Directory
            </span>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-medium">Distinct Index Identifier Name</label>
              <div className="flex gap-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Cloud Architecture"
                  disabled={processing}
                  className="flex-1 text-xs p-2.5 bg-zinc-950 border border-white/5 rounded-lg text-white outline-none focus:border-[#11B5FF]/30 transition disabled:opacity-50"
                  onKeyDown={(e) => e.key === "Enter" && createCategory()}
                />

                <button
                  onClick={createCategory}
                  disabled={processing || !name.trim()}
                  className="bg-white text-zinc-950 font-semibold text-xs px-4 rounded-lg hover:bg-slate-200 transition disabled:opacity-30 flex items-center gap-1.5 shrink-0"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>Append</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FEED MONITOR PANEL */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block px-1">
            Active Directory Map ({categories.length})
          </span>

          {categories.length === 0 && (
            <div className="rounded-xl border border-dashed border-white/5 p-12 text-center space-y-2">
              <Layers className="w-6 h-6 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">No system categories map entries registered.</p>
            </div>
          )}

          <div className="space-y-2">
            {categories.map((c) => (
              <div
                key={c.id}
                className="flex justify-between items-center bg-zinc-900/30 border border-white/5 p-4 rounded-xl hover:border-white/10 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-white/10 transition">
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white tracking-tight">{c.name}</p>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                      {c._count?.certifications || 0} Tracks Managed
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => deleteCategory(c.id)}
                  disabled={processing}
                  className="flex items-center gap-1 text-slate-500 hover:text-rose-400 text-xs font-medium px-2 py-1.5 rounded-md hover:bg-rose-500/5 transition disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Drop</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}