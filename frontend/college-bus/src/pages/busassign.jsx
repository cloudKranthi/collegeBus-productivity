import { useState } from "react";
import { busassign } from "../api/bus";

function BusAssign() {
  const [form, setForm] = useState({
    routeName: "",
    busNumber: "",
    driverName: "",
    capacity: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await busassign(form);
      setSuccess("✅ Bus assigned successfully");
      setForm({
        routeName: "",
        busNumber: "",
        driverName: "",
        capacity: ""
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign bus");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Assign Bus to Route
        </h2>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="routeName"
            placeholder="Route Name"
            value={form.routeName}
            onChange={handleChange}
            autoComplete="off"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            name="busNumber"
            placeholder="Bus Number"
            value={form.busNumber}
            onChange={handleChange}
            autoComplete="off"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            name="driverName"
            placeholder="Driver Name"
            value={form.driverName}
            onChange={handleChange}
            autoComplete="name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="number"
            name="capacity"
            placeholder="Bus Capacity"
            value={form.capacity}
            onChange={handleChange}
            autoComplete="off"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Assign Bus
          </button>
        </form>
      </div>
    </div>
  );
}

export default BusAssign;
