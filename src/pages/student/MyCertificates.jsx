import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function MyCertificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/student/certificates", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCerts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCerts();
  }, []);

  if (loading) {
    return <div className="p-6 text-zinc-400">Loading certificates...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">{error}</div>;
  }

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Certificates</h1>

      {certs.length === 0 && (
        <p className="text-zinc-500">No certificates yet.</p>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {certs.map((c) => (
          <div
            key={c.id}
            className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg"
          >
            <h3 className="font-semibold">
              {c.certification?.title || "Unknown Certification"}
            </h3>

            <p className="text-xs text-zinc-500 mt-1">
              Issued: {new Date(c.issuedAt).toLocaleDateString()}
            </p>

            {/* 🎯 Certificate actions */}
            {c.certificateUrl ? (
              <button
                onClick={() => window.open(c.certificateUrl, "_blank")}
                className="mt-3 text-indigo-400 hover:underline"
              >
                View Certificate
              </button>
            ) : (
              <button
                onClick={() => navigate(`/certificate/${c.certificationId}`)}
                className="mt-3 text-yellow-400 hover:underline"
              >
                Generate / Unlock Certificate
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}