import React from 'react';
import { Link } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-3xl mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/products"
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-accent transition-colors inline-block"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain rounded-lg bg-gray-50"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="mb-2 hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 capitalize mb-4">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl text-primary">
                        ${item.price.toFixed(2)}
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal for this item */}
                <div className="mt-4 pt-4 border-t border-gray-200 text-right">
                  <span className="text-gray-600">Subtotal: </span>
                  <span className="text-xl text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (estimated)</span>
                  <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl">Total</span>
                    <span className="text-3xl text-primary">
                      ${(getCartTotal() * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-accent transition-colors block text-center"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="w-full mt-4 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors block text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
