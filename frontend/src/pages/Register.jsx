import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-6">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account 📝</h2>

        {error && (
          <p className="text-red-200 bg-red-500/20 p-2 rounded text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none border border-white/20"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            className="w-full p-3 rounded-xl bg-green-400 hover:bg-green-300 text-black font-semibold shadow-lg transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-white/90">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-300 underline">Login</a>
        </p>
      </div>
    </div>
  );
}
