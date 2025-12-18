import React, { useState } from "react";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/medicals/auth/password_reset/",
        { email }
      );

      toast.success(
        res.data.detail || "If this email exists, a reset link has been sent."
      );

      if (res.data.reset_link) {
        setResetLink(res.data.reset_link);
        console.log("Reset link:", res.data.reset_link);
      }

    } catch (err) {
      console.error("Password reset error:", err);
      toast.error("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenResetPage = () => {
    if (!resetLink) return;
    const url = new URL(resetLink);
    navigate(url.pathname);  
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <div className="w-full max-w-md bg-gray-800 p-6 rounded border border-gray-700">

          <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 mb-4 rounded bg-black text-white"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded bg-green-600 hover:bg-green-700"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {resetLink && (
            <div className="mt-6 text-center text-sm">
              <p className="mb-2 text-gray-300">Reset link generated:</p>

              <button
                onClick={handleOpenResetPage}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Go to Reset Password
              </button>

              <p className="mt-2 text-xs text-gray-400 break-all">
                {resetLink}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
