import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, User, Tag, Phone, CheckCircle2 } from 'lucide-react';

export type ItemCategory =
  | 'Electronics'
  | 'Books & Stationery'
  | 'Clothing & Accessories'
  | 'ID & Documents'
  | 'Keys'
  | 'Bags & Wallets'
  | 'Sports & Fitness'
  | 'Food & Beverages'
  | 'Other';

export const CATEGORIES: ItemCategory[] = [
  'Electronics',
  'Books & Stationery',
  'Clothing & Accessories',
  'ID & Documents',
  'Keys',
  'Bags & Wallets',
  'Sports & Fitness',
  'Food & Beverages',
  'Other',
];

const CATEGORY_EMOJI: Record<ItemCategory, string> = {
  'Electronics': '📱',
  'Books & Stationery': '📚',
  'Clothing & Accessories': '👕',
  'ID & Documents': '🪪',
  'Keys': '🔑',
  'Bags & Wallets': '🎒',
  'Sports & Fitness': '🏃',
  'Food & Beverages': '🍱',
  'Other': '📦',
};

const CATEGORY_COLOR: Record<ItemCategory, string> = {
  'Electronics': 'bg-blue-100 text-blue-700',
  'Books & Stationery': 'bg-yellow-100 text-yellow-700',
  'Clothing & Accessories': 'bg-pink-100 text-pink-700',
  'ID & Documents': 'bg-purple-100 text-purple-700',
  'Keys': 'bg-orange-100 text-orange-700',
  'Bags & Wallets': 'bg-amber-100 text-amber-700',
  'Sports & Fitness': 'bg-emerald-100 text-emerald-700',
  'Food & Beverages': 'bg-lime-100 text-lime-700',
  'Other': 'bg-gray-100 text-gray-700',
};

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  type: 'lost' | 'found';
  category: ItemCategory;
  location: string;
  date: string;
  image?: string;
  status?: 'open' | 'returned';
  contactName: string;
  contactPhone: string;
  onContact: (id: string) => void;
  onReturn?: (id: string) => void;
}

export function ItemCard({
  id,
  title,
  description,
  type,
  category,
  location,
  date,
  image,
  status = 'open',
  contactName,
  contactPhone,
  onContact,
  onReturn,
}: ItemCardProps) {
  const isReturned = status === 'returned';

  return (
    <Card className={`group transition-all duration-300 border ${isReturned ? 'border-green-200 bg-green-50/30 opacity-80 shadow-none' : 'border-gray-200 hover:border-red-200 hover:shadow-lg bg-white'}`}>
      <div className="aspect-[4/3] bg-gray-100 rounded-t-lg overflow-hidden relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-300 ${!isReturned ? 'group-hover:scale-105' : 'grayscale opacity-70'}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className={`text-6xl ${isReturned ? 'grayscale opacity-50' : ''}`}>{CATEGORY_EMOJI[category]}</div>
          </div>
        )}
        
        {/* Overlay badge for type */}
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge
            className={
              type === 'lost'
                ? 'bg-red-600 text-white border-0 shadow'
                : 'bg-green-600 text-white border-0 shadow'
            }
          >
            {type === 'lost' ? '🔴 Lost' : '🟢 Found'}
          </Badge>
          
          {isReturned && (
            <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white border-0 shadow">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Returned
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4 space-y-3 relative">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-semibold text-lg leading-tight ${isReturned ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{title}</h3>
          <Badge
            variant="outline"
            className={`shrink-0 text-xs ${CATEGORY_COLOR[category]} ${isReturned ? 'opacity-50' : ''}`}
          >
            <Tag className="w-3 h-3 mr-1" />
            {category}
          </Badge>
        </div>

        <p className={`text-sm line-clamp-2 ${isReturned ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>

        <div className={`space-y-1.5 text-sm ${isReturned ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="flex items-center">
            <MapPin className={`w-4 h-4 mr-2 shrink-0 ${isReturned ? 'text-gray-400' : 'text-red-500'}`} />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className={`w-4 h-4 mr-2 shrink-0 ${isReturned ? 'text-gray-400' : 'text-red-500'}`} />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <User className={`w-4 h-4 mr-2 shrink-0 ${isReturned ? 'text-gray-400' : 'text-red-500'}`} />
            <span>Posted by {contactName}</span>
          </div>
          <div className="flex items-center">
            <Phone className={`w-4 h-4 mr-2 shrink-0 ${isReturned ? 'text-gray-400' : 'text-red-500'}`} />
            <span>{contactPhone}</span>
          </div>
        </div>

        {!isReturned && (
          <div className="flex gap-2 mt-4">
            <Button
              variant="campus-outline"
              size="sm"
              className="flex-1"
              onClick={() => onContact(id)}
            >
              Contact
            </Button>
            
            {onReturn && (
              <Button
                variant="outline"
                size="sm"
                className="flex-[0.5] bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 border-green-200"
                onClick={() => onReturn(id)}
              >
                Mark Returned
              </Button>
            )}
          </div>
        )}
        
        {isReturned && (
          <div className="mt-4 pt-2 border-t border-green-100 flex justify-center">
            <span className="text-sm font-medium text-emerald-600 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1" /> Item Returned
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}