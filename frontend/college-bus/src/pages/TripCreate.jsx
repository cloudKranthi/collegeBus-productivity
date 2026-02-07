import { useState } from "react";
import {tripcreate} from "../api/trips"; // your axios instance

function TripCreate() {
  const [form, setForm] = useState({
    slot: "",
    routeName: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
     const res = await tripcreate(form);

setSuccess(
  res.data?.message || "✅ Trip created  successfully"
);

      setForm({
        slot: "",
        routeName: ""
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "❌ Trip not created "
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-700 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          trip creation
        </h2>

        {success && (
          <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="routeName"
            placeholder="route Name"
            value={form.routeName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />


          <input
            type="text"
            name="slot"
            placeholder="slot"
            value={form.slot}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />


          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
          >
            create trip
          </button>
        </form>
      </div>
    </div>
  );
}

export default TripCreate;