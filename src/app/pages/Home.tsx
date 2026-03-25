import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ShoppingBag, Truck, Shield, Headphones } from 'lucide-react';
import { Product } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=8');
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const categories = [
    { name: "Men's Clothing", path: "men's clothing", color: 'bg-blue-500' },
    { name: "Women's Clothing", path: "women's clothing", color: 'bg-pink-500' },
    { name: 'Electronics', path: 'electronics', color: 'bg-purple-500' },
    { name: 'Jewelery', path: 'jewelery', color: 'bg-yellow-500' },
  ];

  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure Payment',
      description: '100% secure transactions',
    },
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: 'Easy Returns',
      description: '30-day return policy',
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: '24/7 Support',
      description: 'Dedicated customer service',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl mb-6">
                Welcome to ShopHub
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Discover amazing products at unbeatable prices. Shop the latest trends in fashion,
                electronics, jewelry, and more.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="text-4xl mb-2">🛍️</div>
                      <p className="text-sm">Latest Products</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="text-4xl mb-2">🎯</div>
                      <p className="text-sm">Best Deals</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="text-4xl mb-2">⚡</div>
                      <p className="text-sm">Fast Delivery</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="text-4xl mb-2">💎</div>
                      <p className="text-sm">Premium Quality</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Shop by Category</h2>
            <p className="text-gray-600">Browse our wide range of product categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${encodeURIComponent(category.path)}`}
                className="group"
              >
                <div
                  className={`${category.color} rounded-xl p-8 text-white text-center aspect-square flex flex-col items-center justify-center hover:scale-105 transition-transform`}
                >
                  <div className="text-4xl mb-3">
                    {index === 0 && '👔'}
                    {index === 1 && '👗'}
                    {index === 2 && '💻'}
                    {index === 3 && '💍'}
                  </div>
                  <h3 className="group-hover:underline">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl mb-2">Featured Products</h2>
              <p className="text-gray-600">Check out our handpicked selection</p>
            </div>
            <Link
              to="/products"
              className="hidden md:inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
            >
              View All
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array(8)
                  .fill(0)
                  .map((_, index) => <ProductCardSkeleton key={index} />)
              : featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
            >
              View All Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sale Banner */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-accent to-primary rounded-3xl p-12 text-white text-center">
            <h2 className="text-4xl md:text-5xl mb-4">Special Offer</h2>
            <p className="text-xl mb-8 text-white/90">
              Get up to 50% off on selected items. Limited time only!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Shop Sale
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
