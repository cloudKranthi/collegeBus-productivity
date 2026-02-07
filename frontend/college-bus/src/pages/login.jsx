import { useState } from "react";
import { login } from "../api/auth";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, User, CheckCircle2 } from "lucide-react";

function Login() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState(null); // To store the backend response

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoginData(null);
    setLoading(true);

    try {
      const data = await login(form);
      localStorage.setItem("token", data.token);
      
      // Store the response data to display it
      setLoginData(data); 
      console.log("Backend Response:", data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-from)_0%,_var(--tw-gradient-to)_100%)] from-indigo-600 via-purple-600 to-pink-500 p-6">
      
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          
          <div className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600" />

          <div className="p-10">
            {!loginData ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-black text-gray-800 tracking-tight">Welcome</h2>
                  <p className="text-gray-500 mt-2 font-medium">Enter your credentials to continue</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium animate-bounce">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="username"
                        required
                        value={form.username}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:bg-white focus:border-purple-400 outline-none transition-all font-medium"
                        placeholder="shiva_dev"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:bg-white focus:border-purple-400 outline-none transition-all font-medium"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:bg-white focus:border-purple-400 outline-none transition-all font-medium"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 mt-4"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
                  </button>
                </form>
              </>
            ) : (
              /* Success State Display */
              <div className="text-center animate-in zoom-in duration-300">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle2 className="text-green-600" size={48} />
                  </div>
                </div>
                <h2 className="text-3xl font-black text-gray-800 mb-2">Login Successful!</h2>
                <p className="text-gray-500 mb-6 font-medium">Backend response received successfully.</p>
                
                <div className="bg-slate-900 rounded-2xl p-4 text-left overflow-auto max-h-60 mb-6 border border-slate-700">
                  <pre className="text-emerald-400 text-xs font-mono">
                    {JSON.stringify(loginData, null, 2)}
                  </pre>
                </div>

                <button
                  onClick={() => setLoginData(null)}
                  className="text-indigo-600 font-bold hover:text-indigo-700 underline underline-offset-4"
                >
                  Try again
                </button>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-500 font-medium">
                New user?{" "}
                <Link to="/register" className="text-indigo-600 font-bold">Create account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;