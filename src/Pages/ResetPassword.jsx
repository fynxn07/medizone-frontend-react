import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill both fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `https://medizone.duckdns.org/medicals/auth/password_reset_confirm/${uid}/${token}`,
        {
          password,
          confirmPassword,
        }
      );

      toast.success(res.data.detail || "Password reset successful");
      navigate("/login");
    } catch (err) {
      console.error("Reset password error:", err);
      const detail =
        err.response?.data?.detail || "Failed to reset password. Try again.";
      toast.error(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <div className="w-full max-w-md bg-gray-800 p-6 rounded border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-semibold">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 mb-4 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="block mb-2 text-sm font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 mb-4 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded bg-green-600 hover:bg-green-700 font-semibold disabled:opacity-50"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
