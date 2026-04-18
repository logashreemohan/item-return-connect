import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CATEGORIES, ItemCategory } from '@/components/ItemCard';

interface AddItemFormProps {
  user: { name: string; email: string };
  onBack: () => void;
}

export function AddItemForm({ user, onBack }: AddItemFormProps) {
  const [itemType, setItemType] = useState<'lost' | 'found' | ''>('');
  const [category, setCategory] = useState<ItemCategory | ''>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itemType || !category || !title || !description || !location || !date || !contactPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Item Posted Successfully!",
      description: `Your ${itemType} item has been added to the database in ${category}.`,
    });
    
    setIsLoading(false);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogin={() => {}} 
        onLogout={() => {}} 
        onAddItem={() => {}}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Report an Item</CardTitle>
                <CardDescription>Help reunite items with their owners</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Item Type *</Label>
                      <Select value={itemType} onValueChange={(value: 'lost' | 'found') => setItemType(value)}>
                        <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                          <SelectValue placeholder="Lost or Found?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lost">Lost Item</SelectItem>
                          <SelectItem value="found">Found Item</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={category} onValueChange={(value: ItemCategory) => setCategory(value)}>
                        <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Item Title *</Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="e.g., Blue iPhone 13, Black Backpack"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a detailed description of the item, including any distinctive features, brand, color, etc."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="border-gray-300 focus:border-red-500 focus:ring-red-500 min-h-24"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        type="text"
                        placeholder="e.g., Main Library"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
  
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone Number *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="e.g., +1 234-567-8900"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Photo (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                      {imagePreview ? (
                        <div className="space-y-4">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="mx-auto max-h-48 rounded-lg shadow-md"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setImage(null);
                              setImagePreview(null);
                            }}
                          >
                            Remove Photo
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-gray-600 mb-2">Upload a photo to help identify the item</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                          />
                          <Label htmlFor="image-upload">
                            <Button type="button" variant="outline" asChild>
                              <span>
                                <Upload className="w-4 h-4 mr-2" />
                                Choose Photo
                              </span>
                            </Button>
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={onBack}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      variant="campus" 
                      className="flex-1"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Posting...' : 'Post Item'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}