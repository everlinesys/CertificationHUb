import { useState } from "react";
import api from "../api";
import { useNavigate, useLocation } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);

      const res = await api.post("/auth/register", form);

      const token = res.data.token;
      const user = res.data.user;

      // 🔐 Save auth
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🛑 ADMIN (rare but safe)
      if (user.role === "ADMIN") {
        return navigate("/admin");
      }

      // 🔁 Restore pending attempt (same as login)
      const pending = localStorage.getItem("pending_attempt");

      if (pending) {
        const data = JSON.parse(pending);

        try {
          await api.post(
            "/attempt/submit", // ⚠️ make sure plural matches backend
            {
              certificationId: data.cert.id,
              answers: data.answers
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          localStorage.removeItem("pending_attempt");

          return navigate("/result", { state: data });

        } catch (err) {
          console.error("Failed to sync attempt:", err);
        }
      }

      // 🔁 If coming from result page
      if (location.state) {
        return navigate("/result", { state: location.state });
      }

      // 🧑 Default
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="bg-zinc-900 p-6 rounded-xl w-80 space-y-4">
        <h1 className="text-xl font-bold text-center">Create Account</h1>

        <input
          placeholder="Name"
          value={form.name}
          className="w-full p-2 bg-zinc-800 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          className="w-full p-2 bg-zinc-800 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          className="w-full p-2 bg-zinc-800 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-indigo-600 py-2 rounded hover:bg-indigo-500 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-sm text-zinc-400 text-center">
          Already have an account?{" "}
          <span
            className="text-indigo-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}