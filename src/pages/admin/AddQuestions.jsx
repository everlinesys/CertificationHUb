import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download, Upload, CheckCircle2, AlertCircle, Edit3, Trash2, HelpCircle } from "lucide-react";

export default function AddQuestions() {
  const { id } = useParams();

  const [certifications, setCertifications] = useState([]);
  const [selectedCert, setSelectedCert] = useState(id || "");

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [questionsList, setQuestionsList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  const [processing, setProcessing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    api.get("/certifications").then((res) => {
      setCertifications(res.data);
    });
  }, []);

  useEffect(() => {
    if (!selectedCert) {
      setQuestionsList([]);
      return;
    }
    reload();
  }, [selectedCert]);

  const triggerFeedback = (message, type = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const reload = async () => {
    try {
      const res = await api.get(`/questions/${selectedCert}`);
      setQuestionsList(res.data || []);
    } catch {
      setQuestionsList([]);
    }
  };

  const submit = async () => {
    if (!selectedCert) return triggerFeedback("Please select a target tracks.", "error");
    if (!question || options.some((o) => !o.trim())) {
      return triggerFeedback("All question parameters must be populated.", "error");
    }

    try {
      setProcessing(true);
      if (editingId) {
        await api.put(`/questions/${editingId}`, {
          question,
          options,
          correctAnswer,
          explanation,
        });
        triggerFeedback("Database mutation complete.");
      } else {
        await api.post("/questions", {
          certificationId: selectedCert,
          question,
          options,
          correctAnswer,
          explanation,
        });
        triggerFeedback("Question node appended successfully.");
      }
      resetForm();
      reload();
    } catch {
      triggerFeedback("Transaction execution error.", "error");
    } finally {
      setProcessing(false);
    }
  };

  const editQuestion = (q) => {
    setEditingId(q.id);
    setQuestion(q.question);
    setOptions(q.options);
    setCorrectAnswer(q.correctAnswer);
    setExplanation(q.explanation || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteQuestion = async (targetId) => {
    if (!window.confirm("Confirm structural deletion of this question node?")) return;
    try {
      await api.delete(`/questions/${targetId}`);
      triggerFeedback("Node structural deletion complete.");
      reload();
    } catch {
      triggerFeedback("Failed to delete record.", "error");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer(0);
    setExplanation("");
  };

  const downloadTemplate = () => {
    const data = [{
      question: "Sample Question Text?",
      option1: "Variant Alpha",
      option2: "Variant Beta",
      option3: "Variant Gamma",
      option4: "Variant Delta",
      correctAnswer: "1",
      explanation: "Optional context metadata validation string structural helper."
    }];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XXLSX.utils.book_append_sheet(workbook, worksheet, "Questions");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(fileData, "questions_template.xlsx");
  };

  const importExcel = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedCert) {
      if (!selectedCert) triggerFeedback("Select a certification track first.", "error");
      return;
    }

    setProcessing(true);
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const workbook = XLSX.read(evt.target.result, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Run batch upload mutations concurrently
        await Promise.all(jsonData.map(row => 
          api.post("/questions", {
            certificationId: selectedCert,
            question: row.question,
            options: [row.option1, row.option2, row.option3, row.option4],
            correctAnswer: Number(row.correctAnswer) - 1,
            explanation: row.explanation || "",
          })
        ));

        triggerFeedback(`Batch processing complete: ${jsonData.length} rows written.`);
        reload();
      } catch {
        triggerFeedback("Batch payload array processing failed.", "error");
      } finally {
        setProcessing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-slate-200 antialiased">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.02]">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {editingId ? "Modify Existing Node" : "Question Bank Engine"}
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Construct standalone queries or deploy structured matrix files directly to active data tracks
          </p>
        </div>

        {/* Global Feedback Alert Box */}
        {feedback && (
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border transition ${
            feedback.type === "error" 
              ? "bg-rose-500/5 border-rose-500/20 text-rose-400" 
              : "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
          }`}>
            {feedback.type === "error" ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            <span>{feedback.message}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COMPOSER PANEL (FORM) */}
        <div className="lg:col-span-5 space-y-4 sticky top-20">
          <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-4 space-y-4">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Node Configuration</span>
            
            {/* Track Selector */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-medium">Target Track Identity</label>
              <select
                value={selectedCert}
                onChange={(e) => setSelectedCert(e.target.value)}
                className="w-full text-xs p-2.5 bg-zinc-950 border border-white/5 rounded-lg text-slate-200 outline-none focus:border-[#11B5FF]/30 transition"
              >
                <option value="">Select Target Track...</option>
                {certifications.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            {/* Excel File Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={downloadTemplate}
                className="flex items-center justify-center gap-1.5 bg-white/[0.02] hover:bg-white/5 border border-white/5 text-[11px] font-medium py-2 px-3 rounded-lg text-slate-300 transition"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                Template Asset
              </button>

              <label className="flex items-center justify-center gap-1.5 bg-[#11B5FF]/5 hover:bg-[#11B5FF]/10 border border-[#11B5FF]/10 text-[11px] font-medium py-2 px-3 rounded-lg text-[#11B5FF] cursor-pointer transition text-center">
                <Upload className="w-3.5 h-3.5" />
                Stream File
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={importExcel}
                  hidden
                  disabled={processing}
                />
              </label>
            </div>

            <div className="h-[1px] bg-white/[0.04] my-2" />

            {/* Question Textarea */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-medium">Question Formulation</label>
              <input
                value={question}
                placeholder="Ex: Database isolation levels describe..."
                className="w-full text-xs p-2.5 bg-zinc-950 border border-white/5 rounded-lg text-white outline-none focus:border-[#11B5FF]/30 transition"
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            {/* Answer Options Map */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-medium block">Variant Parameters & Target Answer</label>
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2 bg-zinc-950/60 border border-white/5 rounded-lg pr-3 pl-1 py-1 focus-within:border-[#11B5FF]/20 transition">
                  <input
                    value={opt}
                    className="flex-1 bg-transparent text-xs p-1.5 text-white outline-none"
                    placeholder={`Variant Option Matrix element ${i + 1}`}
                    onChange={(e) => {
                      const newOpts = [...options];
                      newOpts[i] = e.target.value;
                      setOptions(newOpts);
                    }}
                  />
                  <input
                    type="radio"
                    name="correctAnswerIndex"
                    checked={correctAnswer === i}
                    onChange={() => setCorrectAnswer(i)}
                    className="w-3.5 h-3.5 accent-[#11B5FF] cursor-pointer"
                  />
                </div>
              ))}
            </div>

            {/* Context Explanation */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-medium">Context Validation Metadata (Optional)</label>
              <textarea
                value={explanation}
                placeholder="Ex: Read committed isolation blocks raw dirty records processing..."
                className="w-full text-xs p-2.5 bg-zinc-950 border border-white/5 rounded-lg text-slate-300 outline-none focus:border-[#11B5FF]/30 transition min-h-[70px] max-h-[140px]"
                onChange={(e) => setExplanation(e.target.value)}
              />
            </div>

            {/* Submit Array Rig */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={submit}
                disabled={processing}
                className="flex-1 bg-white text-zinc-950 font-semibold text-xs py-2.5 rounded-lg hover:bg-slate-200 transition disabled:opacity-50"
              >
                {processing ? "Writing Node..." : editingId ? "Commit Changes" : "Append Node to Track"}
              </button>

              {editingId && (
                <button
                  onClick={resetForm}
                  className="bg-zinc-800 hover:bg-zinc-700 text-xs px-3 rounded-lg text-slate-400 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FEED MONITOR PANEL (LISTING) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Track Memory Feed ({questionsList.length})
            </span>
          </div>

          {questionsList.length === 0 && (
            <div className="rounded-xl border border-dashed border-white/5 p-12 text-center space-y-2">
              <HelpCircle className="w-6 h-6 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">No active queries found for selected data track target.</p>
            </div>
          )}

          <div className="space-y-2.5">
            {questionsList.map((q, i) => (
              <div key={q.id} className="bg-zinc-900/30 border border-white/5 rounded-xl p-4 space-y-3 hover:border-white/10 transition">
                <div>
                  <span className="font-mono text-[10px] text-[#11B5FF] font-bold block mb-0.5">INDEX NODE {i + 1}</span>
                  <p className="text-xs font-semibold text-white tracking-tight">{q.question}</p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-400">
                  {q.options.map((opt, idx) => (
                    <li 
                      key={idx} 
                      className={`p-2 rounded-md font-medium text-[11px] border ${
                        idx === q.correctAnswer 
                          ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-400" 
                          : "bg-white/[0.01] border-white/[0.03]"
                      }`}
                    >
                      <span className="font-mono mr-1 text-slate-500">{idx + 1}.</span> {opt}
                    </li>
                  ))}
                </ul>

                {q.explanation && (
                  <div className="p-2 rounded-lg bg-blue-500/5 border border-blue-500/10 text-[11px] text-blue-300 font-medium">
                    <span className="font-semibold text-blue-400 block mb-0.5 text-[10px] tracking-wide uppercase">Core Context:</span>
                    {q.explanation}
                  </div>
                )}

                <div className="flex justify-end gap-4 pt-2 border-t border-white/[0.02] text-xs font-medium">
                  <button
                    onClick={() => editQuestion(q)}
                    className="flex items-center gap-1 text-slate-400 hover:text-[#11B5FF] transition"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Mutate</span>
                  </button>

                  <button
                    onClick={() => deleteQuestion(q.id)}
                    className="flex items-center gap-1 text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Purge Node</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}