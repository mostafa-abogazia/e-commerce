import React from 'react';
import { Link } from 'react-router';
import { Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const Wishlist: React.FC = () => {
  const { wishlist } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            <Heart className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-3xl mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">
            Save your favorite items to your wishlist for easy access later.
          </p>
          <Link
            to="/products"
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-accent transition-colors inline-block"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">My Wishlist</h1>
          <p className="text-gray-600">{wishlist.length} item(s) saved</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
