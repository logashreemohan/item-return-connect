import React from "react";

const lostItems = [
  {
    id: 1,
    name: "Wireless Earbuds",
    image: "https://images.unsplash.com/photo-1582719475975-9a8f1d8d5b1e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Smartphone",
    image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Wrist Watch",
    image: "https://images.unsplash.com/photo-1609795649518-0e51f74b19c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNpbHZlciUyMHdhdGNofGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: "Water Bottle",
    image: "https://images.unsplash.com/photo-1501594907351-3c6a3e9e3c7e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Laptop",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de3c6c4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Headphones",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Smartwatch",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=80",
  },
];

export default function LostItems() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Lost Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {lostItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
              onError={(e) =>
                (e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image")
              }
            />
            <div className="p-3 text-center">
              <p className="font-medium text-gray-800">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
