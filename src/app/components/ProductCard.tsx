import React from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product, useShop } from '../context/ShopContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useShop();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.title.substring(0, 30)}... added to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative bg-gray-50 aspect-square p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
            <span className="text-xs text-gray-700 capitalize">{product.category}</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm text-gray-600">
                {product.rating.rate.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-gray-400">
              ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price and Cart Button */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-primary text-white p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
