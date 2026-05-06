import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/student/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">{error}</div>;
  }

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">

      {/* 🔥 Header */}
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      {/* 📊 Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Stat title="Attempts" value={data?.totalAttempts || 0} />
        <Stat title="Certificates" value={data?.totalCertificates || 0} />
      </div>

      {/* 📚 Attempts */}
      <h2 className="text-xl font-semibold mb-4">My Exams</h2>

      {data?.attempts?.length === 0 && (
        <p className="text-zinc-500 mb-6">No attempts yet.</p>
      )}

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {data?.attempts?.map(a => (
          <div key={a.id} className="bg-zinc-900 p-4 rounded border border-zinc-800">
            
            <h3 className="font-semibold">{a.certification?.title}</h3>

            <p className="text-sm text-zinc-400 mt-1">
              Score: {a.score}/{a.totalQuestions}
            </p>

            <p className={`text-xs mt-2 ${a.passed ? "text-green-400" : "text-red-400"}`}>
              {a.passed ? "Passed" : "Failed"}
            </p>

            <p className="text-xs text-zinc-500 mt-2">
              {new Date(a.createdAt).toLocaleDateString()}
            </p>

          </div>
        ))}
      </div>

      {/* 🎓 Certificates */}
      <h2 className="text-xl font-semibold mb-4">My Certificates</h2>

      {data?.certificates?.length === 0 && (
        <p className="text-zinc-500 mb-6">No certificates yet.</p>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {data?.certificates?.map(c => (
          <div key={c.id} className="bg-zinc-900 p-4 rounded border border-zinc-800">
            
            <h3 className="font-semibold">
              {c.certification?.title}
            </h3>

            <button
              onClick={() => navigate(`/certificate/${c.certificationId}`)}
              className="mt-3 text-indigo-400 hover:underline"
            >
              View Certificate
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
      <p className="text-sm text-zinc-400">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}