import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { SlidersHorizontal, X } from 'lucide-react';
import { Product } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';

export const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);

  const categories = ['all', "men's clothing", "women's clothing", 'electronics', 'jewelery'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Rating filter
    filtered = filtered.filter((product) => product.rating.rate >= minRating);

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, minRating]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setMinRating(0);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Our Products</h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md mb-4 w-full justify-center"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </button>

            {/* Filter Panel */}
            <div
              className={`${
                showFilters ? 'block' : 'hidden'
              } lg:block bg-white rounded-xl shadow-md p-6 space-y-6`}
            >
              <div className="flex justify-between items-center">
                <h3>Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-accent transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="capitalize text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">
                        {rating === 0 ? 'All' : `${rating}+ Stars`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Close Button */}
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(9)
                  .fill(0)
                  .map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No products found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:text-accent transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
