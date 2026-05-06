import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function Export() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/categories")
      .then(res => setCategories(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(c => (
          <div
            key={c.id}
            onClick={() => navigate(`/dashboard/category/${c.id}`)}
            className="bg-zinc-900 p-4 rounded-lg cursor-pointer hover:bg-zinc-800"
          >
            <h2 className="font-semibold">{c.name}</h2>
            <p className="text-sm text-zinc-400">
              {c._count.certifications} courses
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}