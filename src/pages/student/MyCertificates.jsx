import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

import {
  Download,
  ExternalLink,
  Share2,
  ShieldCheck,
  Link2Icon,
} from "lucide-react";

export default function MyCertificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/student/certificates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCerts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCerts();
  }, []);

  // 🔗 LinkedIn Share
  const shareToLinkedIn = (cert) => {
    const url = encodeURIComponent(cert.certificateUrl);

    const linkedInUrl =
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

    window.open(linkedInUrl, "_blank");
  };

  // 📥 Download
  const downloadCertificate = async (url, title) => {
    try {
      const response = await fetch(url);

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = blobUrl;

      a.download = `${title || "certificate"}.pdf`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(blobUrl);

    } catch (err) {

      console.error(err);

      alert("Failed to download certificate");

    }
  };

  // 📤 Native Share
  const handleShare = async (cert) => {
    try {

      if (navigator.share) {

        await navigator.share({
          title: cert.certification?.title,
          text: "Check out my certificate",
          url: cert.certificateUrl,
        });

      } else {

        await navigator.clipboard.writeText(
          cert.certificateUrl
        );

        alert("Certificate link copied");

      }

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-zinc-400">
        Loading certificates...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">

      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="text-indigo-400" size={28} />
        <h1 className="text-3xl font-bold">
          My Certificates
        </h1>
      </div>

      {certs.length === 0 && (
        <p className="text-zinc-500">
          No certificates yet.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-5">

        {certs.map((c) => (

          <div
            key={c.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg"
          >

            {/* TOP */}
            <div className="p-5 border-b border-zinc-800">

              <h3 className="font-semibold text-lg leading-tight">
                {c.certification?.title ||
                  "Unknown Certification"}
              </h3>

              <p className="text-xs text-zinc-500 mt-2">
                Issued on{" "}
                {new Date(c.issuedAt).toLocaleDateString()}
              </p>

              {c.certificateNumber && (
                <p className="text-xs text-indigo-400 mt-1">
                  Certificate ID: #{c.certificateNumber}
                </p>
              )}
            </div>

            {/* ACTIONS */}
            <div className="p-5">

              {c.certificateUrl ? (
                <div className="space-y-3">

                  {/* VIEW */}
                  <button
                    onClick={() =>
                      window.open(
                        c.certificateUrl,
                        "_blank"
                      )
                    }
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition py-3 rounded-xl"
                  >
                    <ExternalLink size={18} />
                    View Certificate
                  </button>

                  {/* DOWNLOAD */}
                  <button
                    onClick={() =>
                      downloadCertificate(
                        c.certificateUrl,
                        c.certification?.title
                      )
                    }
                    className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition py-3 rounded-xl"
                  >
                    <Download size={18} />
                    Download PDF
                  </button>

                  {/* SHARE */}
                  <button
                    onClick={() => handleShare(c)}
                    className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition py-3 rounded-xl"
                  >
                    <Share2 size={18} />
                    Share Certificate
                  </button>

                  {/* LINKEDIN */}
                  {/* <button
                    onClick={() =>
                      shareToLinkedIn(c)
                    }
                    className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] hover:opacity-90 transition py-3 rounded-xl"
                  >
                    <Link2Icon size={18} />
                    Share to LinkedIn
                  </button> */}

                </div>
              ) : (
                <button
                  onClick={() =>
                    navigate(
                      `/certificate/${c.certificationId}`
                    )
                  }
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium py-3 rounded-xl"
                >
                  Generate / Unlock Certificate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}