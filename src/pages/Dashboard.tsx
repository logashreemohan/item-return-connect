import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, LogOut, Plus } from "lucide-react";
import { toast } from "sonner";
import LostItemsGrid from "@/components/LostItemsGrid";
import FoundItemsGrid from "@/components/FoundItemsGrid";
import AddItemDialog from "@/components/AddItemDialog";

// Example items with real image paths
const exampleLostItems = [
  {
    id: "lost-1",
    user_id: "example@example.com",
    title: "Blue Water Bottle",
    description: "Hydro Flask water bottle, blue color, lost near the library entrance",
    category: "Accessories",
    location: "Library Building",
    date_lost: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/water-bottle.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lost-2",
    user_id: "example@example.com",
    title: "Black Backpack",
    description: "Nike backpack with laptop compartment, lost in cafeteria",
    category: "Accessories",
    location: "Student Cafeteria",
    date_lost: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/backpack.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lost-3",
    user_id: "example@example.com",
    title: "Silver Laptop",
    description: "MacBook Pro 13 inch, silver color, lost in engineering building",
    category: "Electronics",
    location: "Engineering Building",
    date_lost: new Date(Date.now() - 259200000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/laptop.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lost-4",
    user_id: "example@example.com",
    title: "Wireless Headphones",
    description: "Sony WH-1000XM4 headphones, black color, lost in library",
    category: "Electronics",
    location: "Library",
    date_lost: new Date(Date.now() - 345600000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/headphones.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lost-5",
    user_id: "example@example.com",
    title: "Campus ID Card",
    description: "Student ID card with blue lanyard, lost near cafeteria",
    category: "Other",
    location: "Cafeteria",
    date_lost: new Date(Date.now() - 432000000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/id-card.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lost-6",
    user_id: "example@example.com",
    title: "Leather Wallet",
    description: "Brown leather wallet with multiple cards, lost in main hall",
    category: "Accessories",
    location: "Main Hall",
    date_lost: new Date(Date.now() - 518400000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/wallet.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lost-7",
    user_id: "example@example.com",
    title: "Textbook Set",
    description: "Set of 3 textbooks for Computer Science, lost in study room",
    category: "Books",
    location: "Study Room",
    date_lost: new Date(Date.now() - 604800000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/textbooks.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lost-8",
    user_id: "example@example.com",
    title: "Sunglasses",
    description: "Ray-Ban sunglasses, black frame, lost near parking lot",
    category: "Accessories",
    location: "Parking Lot",
    date_lost: new Date(Date.now() - 691200000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/sunglasses.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lost-9",
    user_id: "example@example.com",
    title: "Jacket",
    description: "Blue denim jacket, size M, lost in sports complex",
    category: "Clothing",
    location: "Sports Complex",
    date_lost: new Date(Date.now() - 777600000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/jacket.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lost-10",
    user_id: "example@example.com",
    title: "USB Drive",
    description: "SanDisk 64GB USB drive, red color, lost in computer lab",
    category: "Electronics",
    location: "Computer Lab",
    date_lost: new Date(Date.now() - 864000000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/usb-drive.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

const exampleFoundItems = [
  {
    id: "found-1",
    user_id: "example@example.com",
    title: "Wireless Earbuds",
    description: "White wireless earbuds found near the main entrance",
    category: "Electronics",
    location: "Main Entrance",
    date_found: new Date(Date.now() - 43200000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/earbuds.webp",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "found-2",
    user_id: "example@example.com",
    title: "Calculus Textbook",
    description: "Calculus Early Transcendentals textbook, 8th edition",
    category: "Books",
    location: "Engineering Building",
    date_found: new Date(Date.now() - 259200000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/calculus-textbook.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "found-3",
    user_id: "example@example.com",
    title: "Keychain",
    description: "Silver keychain with campus logo, found in library",
    category: "Accessories",
    location: "Library",
    date_found: new Date(Date.now() - 345600000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/keychain.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "found-4",
    user_id: "example@example.com",
    title: "Notebook",
    description: "Spiral-bound notebook with blue cover, found in cafeteria",
    category: "Books",
    location: "Cafeteria",
    date_found: new Date(Date.now() - 432000000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/notebook.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "found-5",
    user_id: "example@example.com",
    title: "Umbrella",
    description: "Black folding umbrella, found near main entrance",
    category: "Accessories",
    location: "Main Entrance",
    date_found: new Date(Date.now() - 518400000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/umbrella.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "found-6",
    user_id: "example@example.com",
    title: "Phone Case",
    description: "iPhone 12 case, clear with blue design, found in parking lot",
    category: "Accessories",
    location: "Parking Lot",
    date_found: new Date(Date.now() - 604800000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/phone-case.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "found-7",
    user_id: "example@example.com",
    title: "Water Bottle",
    description: "Green thermos bottle, found in sports complex",
    category: "Accessories",
    location: "Sports Complex",
    date_found: new Date(Date.now() - 691200000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/green-water-bottle.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "found-8",
    user_id: "example@example.com",
    title: "Sweatshirt",
    description: "Gray campus sweatshirt, size L, found in student lounge",
    category: "Clothing",
    location: "Student Lounge",
    date_found: new Date(Date.now() - 777600000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/sweatshirt.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "found-9",
    user_id: "example@example.com",
    title: "Charger Cable",
    description: "USB-C charging cable, black, found in computer lab",
    category: "Electronics",
    location: "Computer Lab",
    date_found: new Date(Date.now() - 864000000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/charger-cable.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "found-10",
    user_id: "example@example.com",
    title: "Campus Map",
    description: "Folded campus map, found near administration building",
    category: "Other",
    location: "Administration Building",
    date_found: new Date(Date.now() - 950400000).toISOString().split('T')[0],
    contact_info: "example@example.com",
    image_url: "/images/items/campus-map.jpg",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"lost" | "found">("lost");

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const userData = localStorage.getItem("user");
      if (!userData) {
        navigate("/auth");
      } else {
        try {
          const parsedUser = JSON.parse(userData);
          if (parsedUser && parsedUser.id) {
            setUser(parsedUser);
          } else {
            navigate("/auth");
          }
        } catch (e) {
          // If there's an error parsing, remove the invalid user data
          localStorage.removeItem("user");
          navigate("/auth");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    
    // Initialize with example items if localStorage is empty
    const lostItems = JSON.parse(localStorage.getItem("lostItems") || "[]");
    const foundItems = JSON.parse(localStorage.getItem("foundItems") || "[]");
    
    if (lostItems.length === 0) {
      localStorage.setItem("lostItems", JSON.stringify(exampleLostItems));
    }
    
    if (foundItems.length === 0) {
      localStorage.setItem("foundItems", JSON.stringify(exampleFoundItems));
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const openAddDialog = (type: "lost" | "found") => {
    setDialogType(type);
    setShowAddDialog(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Campus Connect</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/contact")}>
                Contact
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search items..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="lost" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="lost">Lost Items</TabsTrigger>
            <TabsTrigger value="found">Found Items</TabsTrigger>
          </TabsList>

          <TabsContent value="lost" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={() => openAddDialog("lost")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Lost Item
              </Button>
            </div>
            <LostItemsGrid searchQuery={searchQuery} userId={user.id} />
          </TabsContent>

          <TabsContent value="found" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={() => openAddDialog("found")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Found Item
              </Button>
            </div>
            <FoundItemsGrid searchQuery={searchQuery} userId={user.id} />
          </TabsContent>
        </Tabs>
      </main>

      <AddItemDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        type={dialogType}
        userId={user.id}
      />
    </div>
  );
}