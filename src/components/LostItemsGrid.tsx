import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface LostItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date_lost: string;
  contact_info: string;
  image_url?: string;
  user_id: string;
}

interface LostItemsGridProps {
  searchQuery: string;
  userId: string;
  isAdmin: boolean;
}

export default function LostItemsGrid({ searchQuery, userId, isAdmin }: LostItemsGridProps) {
  const [items, setItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [searchQuery]);

  const fetchItems = async () => {
    setLoading(true);
    let query = supabase
      .from("lost_items")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
      toast.error("Failed to fetch items");
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (itemId: string) => {
    const { error } = await supabase
      .from("lost_items")
      .delete()
      .eq("id", itemId);

    if (error) {
      toast.error("Failed to delete item");
    } else {
      toast.success("Item returned to owner!");
      fetchItems();
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No lost items found. {searchQuery && "Try a different search."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          {item.image_url && (
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
          )}
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <Badge variant="secondary">{item.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{new Date(item.date_lost).toLocaleDateString()}</span>
            </div>
            <p className="text-sm">
              <strong>Contact:</strong> {item.contact_info}
            </p>
          </CardContent>
          {(item.user_id === userId || isAdmin) && (
            <CardFooter>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Mark as Returned
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
