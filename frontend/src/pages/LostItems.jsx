import { useEffect, useState } from "react";
import api from "../services/api";

export default function LostItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/lost");

        // Ensure response is array
        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          console.error("Backend did not return an array:", res.data);
          setItems([]);
        }
      } catch (err) {
        console.error("Error fetching lost items:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex justify-center items-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 p-8 text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Lost Items</h1>

      {items.length === 0 ? (
        <p className="text-center text-xl">No lost items posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white text-black p-4 rounded-xl shadow-xl"
            >
              <img
                src={item.imageUrl}
                alt="Lost item"
                className="h-48 w-full object-cover rounded-xl mb-3"
              />
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-700">{item.description}</p>
              <p className="text-sm text-gray-500 mt-1">📍 {item.location}</p>
              <p className="text-sm text-gray-500">
                📅 Lost On: {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
