import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

export default function AddQuestions() {
  const { id } = useParams();

  const [certifications, setCertifications] = useState([]);
  const [selectedCert, setSelectedCert] = useState(id || "");

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const [questionsList, setQuestionsList] = useState([]);
  const [editingId, setEditingId] = useState(null); // 🔥 edit mode

  // 📚 Load certifications
  useEffect(() => {
    api.get("/certifications").then(res => {
      setCertifications(res.data);
    });
  }, []);

  // 📚 Load questions
  useEffect(() => {
    if (!selectedCert) return;

    api.get(`/questions/${selectedCert}`)
      .then(res => setQuestionsList(res.data))
      .catch(() => setQuestionsList([]));
  }, [selectedCert]);

  // 🔄 Reload helper
  const reload = async () => {
    const res = await api.get(`/questions/${selectedCert}`);
    setQuestionsList(res.data);
  };

  // 🚀 Add / Update
  const submit = async () => {
    if (!question || options.some(o => !o)) {
      return alert("Fill all fields");
    }

    if (editingId) {
      await api.put(`/questions/${editingId}`, {
        question,
        options,
        correctAnswer
      });

      alert("Updated ✅");
    } else {
      await api.post("/questions", {
        certificationId: selectedCert,
        question,
        options,
        correctAnswer
      });

      alert("Added ✅");
    }

    resetForm();
    reload();
  };

  // ✏️ Edit
  const editQuestion = (q) => {
    setEditingId(q.id);
    setQuestion(q.question);
    setOptions(q.options);
    setCorrectAnswer(q.correctAnswer);
  };

  // 🗑 Delete
  const deleteQuestion = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this question permanently? ⚠️"
    );

    if (!confirmDelete) return;

    await api.delete(`/questions/${id}`);
    reload();
  };

  // 🔄 Reset
  const resetForm = () => {
    setEditingId(null);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer(0);
  };

  return (
    <div className="p-6 max-w-xl text-white">
      <h1 className="text-2xl font-bold mb-6">
        {editingId ? "Edit Question" : "Add Questions"}
      </h1>

      {/* 🔽 Certification */}
      <select
        value={selectedCert}
        onChange={(e) => setSelectedCert(e.target.value)}
        className="w-full p-2 mb-4 bg-zinc-800 rounded"
      >
        <option value="">Select Certification</option>
        {certifications.map(c => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>

      {/* Question */}
      <input
        value={question}
        placeholder="Question"
        className="w-full p-2 mb-3 bg-zinc-800 rounded"
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* Options */}
      {options.map((opt, i) => (
        <div key={i} className="flex items-center gap-2 mb-2">
          <input
            value={opt}
            className="flex-1 p-2 bg-zinc-800 rounded"
            placeholder={`Option ${i + 1}`}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
          />

          <input
            type="radio"
            checked={correctAnswer === i}
            onChange={() => setCorrectAnswer(i)}
          />
        </div>
      ))}

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={submit}
          className="flex-1 bg-indigo-600 py-2 rounded"
        >
          {editingId ? "Update" : "Add"}
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

      {/* 📚 Questions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Questions</h2>

        {questionsList.map((q, i) => (
          <div key={q.id} className="bg-zinc-900 p-3 rounded mb-2">
            <p className="font-semibold">{i + 1}. {q.question}</p>

            <ul className="text-sm text-zinc-400 mb-2">
              {q.options.map((opt, idx) => (
                <li key={idx}>
                  {idx === q.correctAnswer ? "✅" : "•"} {opt}
                </li>
              ))}
            </ul>

            <div className="flex gap-3 text-sm">
              <button
                onClick={() => editQuestion(q)}
                className="text-yellow-400"
              >
                Edit
              </button>

              <button
                onClick={() => deleteQuestion(q.id)}
                className="text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}