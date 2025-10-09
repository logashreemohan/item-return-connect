import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const lostItems = [
  {
    id: 1,
    name: "Wireless Earbuds",
    category: "Electronics",
    description: "Black earbuds lost near the library entrance.",
    location: "Library",
    image:
      "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Smartphone",
    category: "Electronics",
    description: "Blue smartphone lost in the cafeteria.",
    location: "Cafeteria",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Wrist Watch",
    category: "Accessories",
    description: "Silver watch lost in the gym locker room.",
    location: "Gym",
    image:
      "https://images.unsplash.com/photo-1518544889286-b3e7232e7c48?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Water Bottle",
    category: "Personal Items",
    description: "Reusable water bottle lost near the sports ground.",
    location: "Sports Ground",
    image:
      "https://images.unsplash.com/photo-1616628182509-1bbbf3c16b6e?auto=format&fit=crop&w=600&q=80",
  },
];

export default function LostItems() {
  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Lost Items
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {lostItems.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://via.placeholder.com/400x300?text=No+Image+Available")
              }
            />
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {item.name}
                </CardTitle>
                <Badge variant="secondary">{item.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Location:</strong> {item.location}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
