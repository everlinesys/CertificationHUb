import { useEffect, useState } from "react";
import api from "../../api";

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
  const [editingId, setEditingId] = useState(null); // 🔥 edit mode

  useEffect(() => {
    api.get("/categories")
      .then(res => setCategories(res.data))
      .catch(console.error);

    fetchCerts();
  }, []);

  const fetchCerts = async () => {
    const res = await api.get("/certifications");
    setCerts(res.data);
  };

  // 🚀 Create / Update
  const submit = async () => {
    if (!form.title || !form.price || !form.passMark) {
      return alert("Fill required fields");
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
        alert("Updated ✅");
      } else {
        await api.post("/certifications", payload);
        alert("Created 🎉");
      }

      resetForm();
      fetchCerts();

    } catch (err) {
      alert("Error");
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

  // 🗑 Delete with warning
  const deleteCert = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure? This will delete all related data ⚠️"
    );

    if (!confirmDelete) return;

    await api.delete(`/certifications/${id}`);
    fetchCerts();
  };

  // ✏️ Edit
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
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">
        {editingId ? "Edit Certification" : "Create Certification"}
      </h1>

      {/* FORM */}
      <div className="flex flex-col gap-4">
        <input
          value={form.title}
          placeholder="Title"
          className="p-2 bg-zinc-800 rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          value={form.description}
          placeholder="Description"
          className="p-2 bg-zinc-800 rounded"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          value={form.price}
          type="number"
          placeholder="Price"
          className="p-2 bg-zinc-800 rounded"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          value={form.passMark}
          type="number"
          placeholder="Pass Mark"
          className="p-2 bg-zinc-800 rounded"
          onChange={(e) => setForm({ ...form, passMark: e.target.value })}
        />

        <input
          value={form.duration}
          type="number"
          placeholder="Duration"
          className="p-2 bg-zinc-800 rounded"
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />

        <select
          value={form.categoryId}
          className="p-2 bg-zinc-800 rounded"
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 bg-indigo-600 py-2 rounded"
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update"
              : "Create"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-zinc-700 px-4 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">All Certifications</h2>

        <div className="space-y-3">
          {certs.map((c) => (
            <div
              key={c.id}
              className="bg-zinc-900 p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{c.title}</p>
                <p className="text-sm text-zinc-400">
                  ₹{c.price} • Pass: {c.passMark}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => editCert(c)}
                  className="text-yellow-400"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCert(c.id)}
                  className="text-red-400"
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    window.location.href = `/admin/questions/${c.id}`
                  }
                  className="text-indigo-400"
                >
                  Questions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}