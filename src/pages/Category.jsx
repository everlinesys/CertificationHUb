import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import Card from "../components/ui/Card";
import { Layout, PlayCircle } from "lucide-react";

export default function Category() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [certs, setCerts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await api.get(`/certifications?categoryId=${id}`);
      setCerts(res.data);

      // get category name from first item (quick way)
      if (res.data.length > 0) {
        setCategory(res.data[0].category);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-6 py-16 max-w-7xl mx-auto text-white">
      
      {/* 🔥 Title */}
      <h1 className="text-3xl font-bold mb-10">
        {category?.name || "Category"}
      </h1>

      {/* ❌ Empty state */}
      {certs.length === 0 && (
        <p className="text-zinc-500">No certifications found.</p>
      )}

      {/* 📚 Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert) => (
          <div
            key={cert.id}
            onClick={() => navigate(`/exam/${cert.id}`)}
            className="cursor-pointer"
          >
            <Card className="bg-zinc-900 border border-zinc-800 p-5 hover:bg-zinc-800 transition">

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">
                {cert.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
                {cert.description}
              </p>

              {/* Info */}
              <div className="flex items-center justify-between text-sm text-zinc-500">
                <div className="flex items-center gap-1">
                  <Layout className="w-4 h-4" />
                  <span>
                    {cert._count?.questions ?? cert.questions?.length ?? 0} Questions
                  </span>
                </div>

                <span className="text-indigo-400 flex items-center gap-1">
                  <PlayCircle className="w-4 h-4" />
                  Start
                </span>
              </div>

            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}