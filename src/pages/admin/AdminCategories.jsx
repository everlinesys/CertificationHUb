import { useEffect, useState } from "react";
import api from "../../api";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async () => {
    if (!name) return;

    await api.post("/categories", { name });
    setName("");
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await api.delete(`/categories/${id}`);
    fetchCategories();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

      {/* ➕ Create */}
      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="p-2 bg-zinc-800 rounded"
        />

        <button
          onClick={createCategory}
          className="bg-indigo-600 px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* 📚 List */}
      <div className="space-y-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex justify-between items-center bg-zinc-900 p-3 rounded"
          >
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-zinc-400">
                {c._count?.certifications || 0} certs
              </p>
            </div>

            <button
              onClick={() => deleteCategory(c.id)}
              className="text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}