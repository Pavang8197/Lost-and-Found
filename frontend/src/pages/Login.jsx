import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 p-6">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login 🔐</h2>

        {error && (
          <p className="text-red-200 bg-red-500/20 p-2 rounded text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none border border-white/20"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none border border-white/20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full p-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-semibold shadow-lg transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-white/90">
          Don’t have an account?{" "}
          <a href="/register" className="text-yellow-300 underline">Register</a>
        </p>
      </div>
    </div>
  );
}
