import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function CertificatePage() {
    const { id } = useParams(); // certificationId
    const navigate = useNavigate();

    const [cert, setCert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);
    const [error, setError] = useState("");

    // 📦 Load certificate status (FIXED ENDPOINT)
    useEffect(() => {
        const fetchCert = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    return navigate("/login");
                }

                const res = await api.get(`/certificate/status/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCert(res.data);
            } catch (err) {
                console.error(err);
                setError("Unable to load certificate");
            } finally {
                setLoading(false);
            }
        };

        fetchCert();
    }, [id, navigate]);

    // 💳 Handle payment
    const handlePayment = async () => {
        try {
            if (paying) return;

            setPaying(true);

            const token = localStorage.getItem("token");

            const { data } = await api.post(
                "/payment/create-order",
                { certificationId: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("ORDER RESPONSE:", data);

            // ❌ Already purchased
            if (data?.message === "Already purchased") {
                alert("You already purchased this certificate");
                window.location.reload();
                return;
            }

            // ❌ Invalid order
            if (!data?.orderId) {
                alert("Failed to create order");
                return;
            }

            if (!window.Razorpay) {
                alert("Payment SDK not loaded");
                return;
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                order_id: data.orderId,

                name: cert.certification?.title || "Certification",
                description: "Certificate Payment",

                prefill: {
                    email: JSON.parse(localStorage.getItem("user"))?.email,
                },

                theme: {
                    color: "#4f46e5",
                },

                handler: async function (response) {
                    try {
                        console.log("PAYMENT SUCCESS:", response);

                        await api.post(
                            "/payment/verify",
                            {
                                ...response,
                                certificationId: id,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        window.location.reload();

                    } catch (err) {
                        console.error("VERIFY ERROR:", err);
                        alert("Verification failed");
                    }
                },
            };

            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", function (err) {
                console.error("PAYMENT FAILED:", err);
                alert("Payment failed. Try again.");
            });

            rzp.open();

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Payment failed");
        } finally {
            setPaying(false);
        }
    };

    // ⏳ Loading
    if (loading) {
        return <div className="p-6 text-zinc-400">Loading...</div>;
    }

    // ❌ Error
    if (error || !cert) {
        return <div className="p-6 text-red-400">{error || "Something went wrong"}</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">

                <h1 className="text-2xl font-bold mb-4">
                    {cert.certification?.title || "Certificate"}
                </h1>

                {/* 🎓 Already generated */}
                {cert.certificateUrl && (
                    <>
                        <p className="text-green-400 mb-4">
                            Certificate Ready 🎉
                        </p>

                        <button
                            onClick={() => window.open(cert.certificateUrl, "_blank")}
                            className="w-full bg-indigo-600 py-3 rounded hover:bg-indigo-500"
                        >
                            View Certificate
                        </button>
                    </>
                )}

                {/* 💳 Payment required */}
                {/* 💳 Payment required */}
                {cert.passed && !cert.purchased && (
                    <>
                        <p className="text-yellow-400 mb-4">
                            Unlock your certificate
                        </p>

                        <button
                            onClick={handlePayment}
                            disabled={paying}
                            className="w-full bg-indigo-600 py-3 rounded hover:bg-indigo-500 disabled:opacity-50"
                        >
                            {paying ? "Processing..." : `Pay ₹${cert.price}`}
                        </button>
                    </>
                )}
                {cert.passed && cert.purchased && !cert.certificateUrl && (
                    <p className="text-yellow-400">
                        Generating your certificate... ⏳
                    </p>
                )}
                {/* ❌ Not eligible */}
                {!cert.passed && (
                    <p className="text-red-400">
                        You must pass the exam to unlock certificate
                    </p>
                )}

            </div>
        </div>
    );
}