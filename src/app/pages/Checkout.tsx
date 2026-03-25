import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard, Building2, Smartphone } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { toast } from 'sonner';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useShop();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'mobile'>('card');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (Object.values(formData).some((value) => !value.trim())) {
      toast.error('Please fill in all fields');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Simulate order placement
    toast.success('Order placed successfully! 🎉');
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-accent transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl mb-6">Shipping Information</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="United States"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block mb-2">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl mb-6">Payment Method</h2>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm">Credit Card</p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building2 className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm">Bank Transfer</p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mobile')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'mobile'
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Smartphone className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm">Mobile Payment</p>
                  </button>
                </div>

                <p className="text-sm text-gray-600">
                  Payment processing is simulated in this demo. No actual payment will be processed.
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain rounded bg-gray-50"
                      />
                      <div className="flex-1">
                        <p className="text-sm line-clamp-2 mb-1">{item.title}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl">Total</span>
                      <span className="text-3xl text-primary">
                        ${(getCartTotal() * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-accent transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
