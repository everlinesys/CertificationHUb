import { useEffect, useState } from "react";
import api from "../../api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [certs, setCerts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchCerts();
  }, []);

  const fetchStats = async () => {
    const res = await api.get("/admin/stats");
    setStats(res.data);
  };

  const fetchCerts = async () => {
    const res = await api.get("/certifications");
    setCerts(res.data);
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* 📊 Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Users" value={stats.totalUsers} />
        <Card title="Certifications" value={stats.totalCertifications} />
        <Card title="Attempts" value={stats.totalAttempts} />
        <Card title="Revenue" value={`₹${stats.totalRevenue}`} />
      </div>

      {/* 📚 Certifications */}
      <h2 className="text-xl font-semibold mb-4">Certifications</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {certs.map(c => (
          <div
            key={c.id}
            onClick={() => setSelected(c)}
            className="bg-zinc-900 p-4 rounded cursor-pointer hover:bg-zinc-800"
          >
            <h3 className="font-bold text-lg">{c.title}</h3>

            <p className="text-sm text-zinc-400 mt-1">
              {c.category?.name || "No Category"}
            </p>

            <p className="text-xs text-zinc-500 mt-2 line-clamp-2">
              {c.description}
            </p>

            <p className="text-xs mt-2 text-indigo-400">
              {c.questions?.length} questions
            </p>
          </div>
        ))}
      </div>

      {/* 🔥 Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 w-full max-w-2xl p-6 rounded max-h-[80vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selected.title}</h2>

              <button
                onClick={() => setSelected(null)}
                className="text-red-400"
              >
                Close
              </button>
            </div>

            {/* Category */}
            <p className="text-sm text-indigo-400 mb-2">
              {selected.category?.name}
            </p>

            {/* Description */}
            <p className="text-zinc-300 mb-4">
              {selected.description}
            </p>

            {/* Questions */}
            <h3 className="font-semibold mb-2">Questions</h3>

            <div className="space-y-3">
              {selected.questions.map((q, i) => (
                <div key={q.id} className="bg-zinc-800 p-3 rounded">
                  <p className="font-semibold">
                    {i + 1}. {q.question}
                  </p>

                  <ul className="text-sm text-zinc-400 mt-2">
                    {q.options.map((opt, idx) => (
                      <li key={idx}>
                        {idx === q.correctAnswer ? "✅" : "•"} {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <p className="text-sm text-zinc-400">{title}</p>
      <h2 className="text-xl font-bold mt-2">{value}</h2>
    </div>
  );
}