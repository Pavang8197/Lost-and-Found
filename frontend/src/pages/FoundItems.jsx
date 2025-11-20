import { useEffect, useState } from "react";
import api from "../services/api";

export default function FoundItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/found");

        // Ensure backend returned an ARRAY
        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          console.error("Backend did NOT return an array:", res.data);
          setItems([]);
        }

      } catch (error) {
        console.error("Error fetching found items:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <div className="text-white text-center pt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 p-8 text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Found Items</h1>

      {items.length === 0 ? (
        <p className="text-center text-xl">No found items yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white text-black p-4 rounded-xl shadow-xl">
              <img
                src={item.imageUrl}
                alt="Found"
                className="h-48 w-full object-cover rounded-xl mb-3"
              />
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-700">{item.description}</p>
              <p className="text-sm text-gray-500 mt-1">📍 {item.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
