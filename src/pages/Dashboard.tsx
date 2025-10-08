import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, LogOut, Plus } from "lucide-react";
import { toast } from "sonner";
import LostItemsGrid from "@/components/LostItemsGrid";
import FoundItemsGrid from "@/components/FoundItemsGrid";
import AddItemDialog from "@/components/AddItemDialog";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"lost" | "found">("lost");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      } else {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    
    setIsAdmin(!!data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
  };

  const openAddDialog = (type: "lost" | "found") => {
    setDialogType(type);
    setShowAddDialog(true);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Campus Connect</h1>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Admin
                </span>
              )}
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
            <LostItemsGrid searchQuery={searchQuery} userId={user.id} isAdmin={isAdmin} />
          </TabsContent>

          <TabsContent value="found" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={() => openAddDialog("found")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Found Item
              </Button>
            </div>
            <FoundItemsGrid searchQuery={searchQuery} userId={user.id} isAdmin={isAdmin} />
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
