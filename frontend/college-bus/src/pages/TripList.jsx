import { useState } from "react";
import tripdata  from "../api/tripdata"; // Your updated axios service

function TripList() {
  const [form, setForm] = useState({
    routeName: "",
    slot: "",
    date: ""
  });

  const [trips, setTrips] = useState([]);
  const [cursors, setCursors] = useState([null]); // To track history for "Previous"
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchTrips = async (cursorValue, direction) => {
    setLoading(true);
    setError("");
    try {
      // We pass the cursor and form filters to your service
      const res = await tripdata(cursorValue, form); 
      
      if (res.items.length === 0 && direction === 'next') {
        alert("Reached maximum limit");
        return;
      }

      setTrips(res.items);

      if (direction === 'next' && res.nextCursor) {
        // Add new cursor to history if it's not already there
        const newCursors = [...cursors];
        newCursors[currentIndex + 1] = res.nextCursor;
        setCursors(newCursors);
        setCurrentIndex(currentIndex + 1);
      }
    } catch  {
      setError("❌ Failed to fetch trips");
    } finally {
      setLoading(false);
    }
  };

  // Initial search or filter reset
  const handleSearch = (e) => {
    e.preventDefault();
    setCursors([null]);
    setCurrentIndex(0);
    fetchTrips(null, 'init');
  };

  const handleNext = () => {
    const currentCursor = cursors[currentIndex];
    if (!currentCursor) {
      alert("Reached maximum limit");
    } else {
      fetchTrips(currentCursor, 'next');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevCursor = cursors[prevIndex];
      setCurrentIndex(prevIndex);
      fetchTrips(prevCursor, 'prev');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Trip Search & Logs</h2>

        {/* Filter Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            name="routeName"
            placeholder="Route Name (Required)"
            value={form.routeName}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="slot"
            placeholder="Slot (Optional)"
            value={form.slot}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition">
            Search
          </button>
        </form>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Trips Table */}
        <div className="overflow-hidden border rounded-lg mb-6">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 border-b">Route</th>
                <th className="p-4 border-b">Slot</th>
                <th className="p-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip._id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{trip.routeName}</td>
                  <td className="p-4 border-b">{trip.slot}</td>
                  <td className="p-4 border-b">{trip.date || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0 || loading}
            className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">Page {currentIndex + 1}</span>
          <button
            onClick={handleNext}
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripList;