import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ItemCard, CATEGORIES, ItemCategory } from '@/components/ItemCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/easwari-campus.jpg';

interface DashboardProps {
  user: { name: string; email: string };
  onLogout: () => void;
  onAddItem: () => void;
}

const INITIAL_ITEMS = [
  {
    id: '1',
    title: 'Blue iPhone 13',
    description: 'Lost my blue iPhone 13 with a clear case. Last seen in the library on the second floor.',
    type: 'lost' as const,
    category: 'Electronics' as ItemCategory,
    location: 'Main Library - 2nd Floor',
    date: '2 days ago',
    contactName: 'Sarah Johnson',
    contactPhone: '+1 234-567-8901',
    status: 'open' as const,
    image: undefined
  },
  {
    id: '2',
    title: 'Black Backpack',
    description: 'Found a black Jansport backpack near the science building. Contains textbooks and notebooks.',
    type: 'found' as const,
    category: 'Bags & Wallets' as ItemCategory,
    location: 'Science Building Entrance',
    date: '1 day ago',
    contactName: 'Mike Chen',
    contactPhone: '+1 234-567-8902',
    status: 'open' as const,
    image: undefined
  },
  {
    id: '3',
    title: 'Silver MacBook Pro',
    description: 'Lost silver MacBook Pro 13-inch. Has stickers on the lid. Very important for my thesis work.',
    type: 'lost' as const,
    category: 'Electronics' as ItemCategory,
    location: 'Student Union - Study Area',
    date: '3 days ago',
    contactName: 'Emily Rodriguez',
    contactPhone: '+1 234-567-8903',
    status: 'open' as const,
    image: undefined
  },
  {
    id: '4',
    title: 'Red Water Bottle',
    description: 'Found a red Hydro Flask water bottle in the gym locker room.',
    type: 'found' as const,
    category: 'Other' as ItemCategory,
    location: 'Recreation Center',
    date: '4 hours ago',
    contactName: 'Alex Thompson',
    contactPhone: '+1 234-567-8904',
    status: 'open' as const,
    image: undefined
  },
  {
    id: '5',
    title: 'Calculator TI-84',
    description: 'Lost my graphing calculator during math exam. Name "Jessica" written on the back.',
    type: 'lost' as const,
    category: 'Electronics' as ItemCategory,
    location: 'Mathematics Building - Room 204',
    date: '1 week ago',
    contactName: 'Jessica Williams',
    contactPhone: '+1 234-567-8905',
    status: 'open' as const,
    image: undefined
  },
  {
    id: '6',
    title: 'Car Keys',
    description: 'Found a set of car keys with a Honda keychain near the parking lot.',
    type: 'found' as const,
    category: 'Keys' as ItemCategory,
    location: 'Parking Lot B',
    date: '6 hours ago',
    contactName: 'David Park',
    contactPhone: '+1 234-567-8906',
    status: 'open' as const,
    image: undefined
  }
];

export function Dashboard({ user, onLogout, onAddItem }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'All'>('All');
  const [items, setItems] = useState(INITIAL_ITEMS);
  const { toast } = useToast();

  const handleContact = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    toast({
      title: "Contact Information",
      description: `You can reach ${item.contactName} at ${item.contactPhone} through the campus messaging system.`,
    });
  };

  const handleReturn = (itemId: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, status: 'returned' as const } : item
      )
    );
    toast({
      title: "Success!",
      description: "The item has been successfully marked as returned.",
    });
  };

  const lostCount = items.filter(item => item.type === 'lost' && item.status !== 'returned').length;
  const foundCount = items.filter(item => item.type === 'found' && item.status !== 'returned').length;

  const renderItems = (typeFilter: 'lost' | 'found') => {
    const filteredItems = items.filter(item => {
      const matchesType = item.type === typeFilter;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      
      return matchesType && matchesSearch && matchesCategory;
    });

    if (filteredItems.length === 0) {
      return (
        <div className="text-center py-12 col-span-full border border-dashed border-gray-300 rounded-lg bg-gray-50/50">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No {typeFilter} items found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedCategory !== 'All' 
              ? 'Try adjusting your search or category filter'
              : `Be the first to report a ${typeFilter} item!`
            }
          </p>
          <Button variant={typeFilter === 'lost' ? 'destructive' : 'default'} className={typeFilter === 'found' ? 'bg-green-600 hover:bg-green-700' : ''} onClick={onAddItem}>
            Report {typeFilter === 'lost' ? 'Lost' : 'Found'} Item
          </Button>
        </div>
      );
    }

    return filteredItems.map((item) => (
      <ItemCard
        key={item.id}
        {...item}
        onContact={handleContact}
        onReturn={handleReturn}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogin={() => {}} 
        onLogout={onLogout} 
        onAddItem={onAddItem}
      />
      
      {/* Hero Section */}
      <div 
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              SRM Easwari Engineering College
            </h1>
            <p className="text-xl mb-6 text-gray-200">
              Campus Lost and Found System
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-red-500/20 text-white border-red-500/30 px-4 py-2 text-lg">
                🔴 {lostCount} Active Lost Items
              </Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-white border-green-500/30 px-4 py-2 text-lg">
                🟢 {foundCount} Active Found Items
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        
        {/* Filters Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search items, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Tag className="text-gray-400 w-5 h-5 hidden md:block" />
            <Select value={selectedCategory} onValueChange={(val: any) => setSelectedCategory(val)}>
              <SelectTrigger className="w-full md:w-[220px] border-gray-300 focus:border-red-500 focus:ring-red-500">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Separated Tabs for Lost and Found */}
        <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="lost" className="text-lg data-[state=active]:bg-red-50 data-[state=active]:text-red-700">
                Lost Items
              </TabsTrigger>
              <TabsTrigger value="found" className="text-lg data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                Found Items
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="lost" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderItems('lost')}
            </div>
          </TabsContent>
          
          <TabsContent value="found" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderItems('found')}
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}