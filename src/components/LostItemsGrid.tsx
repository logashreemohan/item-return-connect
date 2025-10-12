import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface LostItem {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date_lost: string;
  contact_info: string;
  image_url: string | null;
  status: string;
  created_at: string;
}

export default function LostItemsGrid({ searchQuery, userId }: { searchQuery: string; userId: string }) {
  const [items, setItems] = useState<LostItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<LostItem[]>([]);

  useEffect(() => {
    // Load items from localStorage
    const storedItems = JSON.parse(localStorage.getItem("lostItems") || "[]");
    setItems(storedItems);
  }, []);

  useEffect(() => {
    // Filter items based on search query
    const filtered = items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [items, searchQuery]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No lost items found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? "No items match your search." : "Be the first to report a lost item."}
          </p>
        </div>
      ) : (
        filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            {item.image_url ? (
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <Badge variant="secondary">{item.category}</Badge>
              </div>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="font-medium">{item.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Date Lost</span>
                <span className="font-medium">{new Date(item.date_lost).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Contact</span>
                <span className="font-medium">{item.contact_info}</span>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}