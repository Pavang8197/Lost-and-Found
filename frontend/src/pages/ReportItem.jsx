import { useState } from "react";
import axios from "../services/api";

export default function ReportItem() {
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    location: "",
    date: "",
    type: "lost",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    for (let key in form) fd.append(key, form[key]);
    if (image) fd.append("image", image);

    try {
      await axios.post(`/${form.type}/report`, fd);
      setMessage("Item reported successfully!");
    } catch (err) {
      setMessage("Error reporting item.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 flex items-center justify-center p-6 pt-28">

      <form 
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-xl text-white p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-white/30"
      >
        <h1 className="text-3xl font-bold mb-4 text-center">
          Report an Item
        </h1>

        <label className="block mb-2 font-semibold">Item Name</label>
        <input 
          type="text"
          name="itemName"
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-white/30 border border-white/40 focus:ring-2 focus:ring-yellow-400 mb-4"
        />

        <label className="block mb-2 font-semibold">Description</label>
        <textarea 
          name="description"
          rows="3"
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-white/30 border border-white/40 focus:ring-2 focus:ring-yellow-400 mb-4"
        ></textarea>

        <label className="block mb-2 font-semibold">Location</label>
        <input 
          type="text"
          name="location"
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-white/30 border border-white/40 focus:ring-2 focus:ring-yellow-400 mb-4"
        />

        <label className="block mb-2 font-semibold">Date</label>
        <input 
          type="date"
          name="date"
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-white/30 border border-white/40 focus:ring-2 focus:ring-yellow-400 mb-4"
        />

        <label className="block mb-2 font-semibold">Type</label>
        <select 
          name="type"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/30 border border-white/40 mb-6"
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <label className="block mb-2 font-semibold">Upload Image</label>
        <input 
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full bg-white/30 border border-white/40 rounded-lg p-2 mb-6"
        />

        <button 
          type="submit"
          className="w-full p-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition"
        >
          Submit
        </button>

        {message && (
          <p className="text-center mt-4 font-semibold">{message}</p>
        )}
      </form>
    </div>
  );
}
