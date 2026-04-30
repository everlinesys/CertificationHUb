import { useLocation, useNavigate } from "react-router-dom";
import { Lock, Sparkles, Trophy, ShieldCheck, ArrowRight } from "lucide-react";

export default function ResultGate() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
        <p>No exam data found. Please take an exam first.</p>
      </div>
    );
  }

  const { cert } = state;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-md w-full text-center z-10">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-3xl mb-8 shadow-2xl relative">
          <Trophy className="w-10 h-10 text-yellow-500" />
          <div className="absolute -top-2 -right-2 bg-indigo-600 rounded-full p-1.5 shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-3 tracking-tight">
          Exam Complete!
        </h1>
        <p className="text-zinc-400 mb-10 leading-relaxed">
          You've just finished the <span className="text-white font-semibold">{cert.title}</span> certification. 
          Your responses have been recorded and are ready for evaluation.
        </p>

        {/* The "Locked" Stats Card */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-8 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-20">
            <div className="bg-white/10 p-3 rounded-full mb-3">
              <Lock className="w-6 h-6 text-indigo-400" />
            </div>
            <p className="text-sm font-medium text-white px-8">
              Score & Detailed Analysis Locked
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 opacity-20 select-none">
            <div className="text-left p-3 bg-zinc-800 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase">Your Score</p>
              <p className="text-2xl font-bold text-white">??%</p>
            </div>
            <div className="text-left p-3 bg-zinc-800 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase">Status</p>
              <p className="text-2xl font-bold text-white">Pending</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all active:scale-[0.98]"
          >
            Sign in to Reveal Result
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col gap-3 pt-4 border-t border-zinc-900">
            <div className="flex items-center gap-3 text-left text-sm text-zinc-500">
              <ShieldCheck className="w-5 h-5 text-indigo-500" />
              <span>Get a verified PDF certificate upon passing</span>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate("/")}
        className="mt-12 text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
      >
        Discard results and return home
      </button>
    </div>
  );
}