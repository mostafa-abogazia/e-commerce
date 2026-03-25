import React from 'react';
import { Link } from 'react-router';
import { Store, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary rounded-lg p-2">
                <Store className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ShopHub</span>
            </Link>
            
            
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cart" className="text-sm hover:text-primary transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-sm hover:text-primary transition-colors">
                  Wishlist
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-sm">Egypt, Ismailia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-sm">+20 1121 863 867</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm">mostafa@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
