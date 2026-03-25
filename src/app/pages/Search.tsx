import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { Search as SearchIcon } from 'lucide-react';
import { Product } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (query && products.length > 0) {
      const searchLower = query.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-4">Search Results</h1>
          {query && (
            <p className="text-gray-600">
              {loading
                ? 'Searching...'
                : `Found ${filteredProducts.length} result(s) for "${query}"`}
            </p>
          )}
        </div>

        {/* Results */}
        {!query ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <SearchIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl mb-4">Start Your Search</h2>
            <p className="text-gray-600 mb-8">
              Use the search bar above to find products
            </p>
            <Link
              to="/products"
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-accent transition-colors inline-block"
            >
              Browse All Products
            </Link>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <SearchIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl mb-4">No Results Found</h2>
            <p className="text-gray-600 mb-8">
              We couldn't find any products matching "{query}"
            </p>
            <Link
              to="/products"
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-accent transition-colors inline-block"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
