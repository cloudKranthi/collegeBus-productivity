import { useState } from "react";
import { login } from "../api/auth";
import { Link } from "react-router-dom"; // for SPA navigation

function Login() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await login(form);
      localStorage.setItem("token", data.token);
      setSuccess("✅ Successfully logged in!");
      console.log("Login success:", data);
      // optionally redirect after 1-2 seconds
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        {success && (
          <div className="bg-green-100 text-green-700 border border-green-300 p-3 rounded mb-4 flex items-center">
            <span className="mr-2">✅</span>
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <input
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-4"
        >
          Login
        </button>

        <p className="mt-2 text-center text-gray-600">
          Dont have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
