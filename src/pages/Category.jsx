import { useParams, useNavigate } from "react-router-dom";
import { certifications, categories } from "../data/certifications";
import { ChevronLeft, Clock, BarChart, BookOpen, ArrowRight } from "lucide-react";

export default function Category() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the current category metadata
  const categoryInfo = categories.find((cat) => cat.id === id);
  const filtered = certifications.filter((c) => c.category === id);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Header Section */}
      <div className="bg-zinc-900/50 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center text-zinc-400 hover:text-white transition-colors mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Categories
          </button>
          
          <h1 className="text-4xl font-bold mb-2">
            {categoryInfo?.name || "Certifications"}
          </h1>
          <p className="text-zinc-400 max-w-xl">
            {categoryInfo?.description || "Master new skills with our industry-standard certification exams."}
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <main className="max-w-6xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.length > 0 ? (
            filtered.map((cert) => (
              <div
                key={cert.id}
                onClick={() => navigate(`/exam/${cert.id}`)}
                className="group p-6 bg-zinc-900 border border-zinc-800 rounded-xl cursor-pointer 
                           hover:bg-zinc-800/40 hover:border-zinc-600 transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">
                      {cert.title}
                    </h2>
                    <div className="flex gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {cert.questions.length} Questions
                      </span>
                      <span className="flex items-center gap-1">
                        <BarChart className="w-3 h-3" />
                        {cert.difficulty || "General"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        ~{cert.questions.length * 2} mins
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-indigo-600/20 group-hover:text-indigo-400 transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-zinc-700 w-full h-full" />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-2 font-semibold">
                  Not Started
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-800 rounded-3xl">
              <p className="text-zinc-500">No certifications found in this category yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}