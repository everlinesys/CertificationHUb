import { useLocation, useNavigate } from "react-router-dom";
import { Lock, Sparkles, Trophy, ShieldCheck, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function ResultGate() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const victoryRef = useRef(null);
  const popperRef = useRef(null);

  const muted = localStorage.getItem("examMuted") === "true";
  if (!state) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
        <p>No exam data found. Please take an exam first.</p>
      </div>
    );
  }
  useEffect(() => {
    victoryRef.current = new Audio("/sounds/victory.mp3");
    popperRef.current = new Audio("/sounds/popper.mp3");

    victoryRef.current.volume = 0.5;
    popperRef.current.volume = 0.7;

    if (!muted) {
      // 🎊 pop first
      popperRef.current.play().catch(() => { });

      // 🏆 then victory after slight delay
      setTimeout(() => {
        victoryRef.current.play().catch(() => { });
      }, 300);
    }
    if (passed || !muted) {
      // 🎉 burst effect
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      // 🎊 side bursts
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
        });

        confetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
        });
      }, 200);
    }
  }, []);
  const { cert, answers } = state;

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 compute pass/fail (hidden from UI)
  let correct = 0;
  cert.questions?.forEach((q, i) => {
    if (q.correctAnswer === answers[i]) correct++;
  });

  const passed = correct >= cert.passMark;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const saveAttempt = async () => {
      try {
        await fetch("http://localhost:5010/api/attempt/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            certificationId: cert.id,
            score: correct,
            totalQuestions: cert.questions.length,
            passed,
            answers
          })
        });
      } catch (err) {
        console.error("Failed to save attempt");
      }
    };

    saveAttempt();
  }, []);
  // 💳 Payment
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5010/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ certificationId: cert.id })
      });

      const data = await res.json();

      console.log("ORDER:", data);
      console.log("KEY:", import.meta.env.VITE_RAZORPAY_KEY_ID);

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      if (!data?.orderId) {
        alert("Invalid order");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ FIXED
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,

        handler: async (response) => {
          await fetch("http://localhost:5010/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              ...response,
              certificationId: cert.id
            })
          });

          navigate(`/certificate/${cert.id}`);
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (err) {
        console.error("PAYMENT FAILED:", err);
        alert("Payment failed");
      });

      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment error");
    }
  };
  useEffect(() => {
    if (!state) return;

    localStorage.setItem(
      "pending_attempt",
      JSON.stringify({
        cert,
        answers
      })
    );
  }, []);
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full text-center z-10 animate-[fadeIn_0.6s_ease]">

        {/* Icon */}
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
          You've completed <span className="text-white font-semibold">{cert.title}</span>.
          Sign in to reveal your result and unlock your certificate.
        </p>

        {/* 🔒 Locked Card */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-8 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-20">
            <div className="bg-white/10 p-3 rounded-full mb-3">
              <Lock className="w-6 h-6 text-indigo-400" />
            </div>
            <p className="text-sm font-medium text-white px-8">
              Result & Certificate Locked
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 opacity-20 select-none">
            <div className="text-left p-3 bg-zinc-800 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase">Score</p>
              <p className="text-2xl font-bold text-white">??</p>
            </div>
            <div className="text-left p-3 bg-zinc-800 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase">Status</p>
              <p className="text-2xl font-bold text-white">Hidden</p>
            </div>
          </div>
        </div>

        {/* 🔥 Actions */}
        <div className="space-y-4">

          {/* 🔐 Not logged in */}
          {!user && (
            <button
              onClick={() =>
                navigate("/login", { state: { cert, answers } })
              }
              className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-50"
            >
              Sign in to Reveal Result
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {/* 💳 Logged in + passed */}
          {user && passed && (
            <button
              onClick={handlePayment}
              className="w-full bg-green-600 py-4 rounded-xl font-bold"
            >
              Unlock Certificate
            </button>
          )}

          {/* ❌ Logged in + failed */}
          {user && !passed && (
            <p className="text-red-400">
              You did not pass. Try again to unlock certificate.
            </p>
          )}

          <div className="flex items-center gap-3 text-left text-sm text-zinc-500 pt-4 border-t border-zinc-900">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <span>Verified certificate available after passing</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-12 text-zinc-600 hover:text-zinc-400 text-sm"
      >
        Return Home
      </button>
    </div>
  );
}