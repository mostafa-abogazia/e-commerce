import React from 'react';
import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl text-primary mb-4">404</h1>
          <h2 className="text-4xl mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Search className="h-5 w-5" />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};
