import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { Product, useShop } from '../context/ShopContext';
import { toast } from 'sonner';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useShop();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to load product. Please try again.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`Added ${quantity} item(s) to cart!`);
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
        toast.info('Removed from wishlist');
      } else {
        addToWishlist(product);
        toast.success('Added to wishlist!');
      }
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-200 aspect-square rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
          <Link
            to="/products"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition-colors inline-block"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="bg-gray-50 rounded-xl p-8">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain max-h-[500px]"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm capitalize">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl mb-4">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${
                          index < Math.round(product.rating.rate)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                </div>
                <span className="text-gray-600">
                  {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={decrementQuantity}
                    className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="text-xl w-12 text-center">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isInWishlist(product.id)
                      ? 'bg-red-50 border-red-500 text-red-500'
                      : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
                  }`}
                >
                  <Heart
                    className={`h-6 w-6 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
