import React from 'react';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

export const About: React.FC = () => {
  const values = [
    {
      icon: <Target className="h-12 w-12" />,
      title: 'Our Mission',
      description:
        'To provide customers with high-quality products at competitive prices while delivering exceptional service.',
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: 'Customer First',
      description:
        'Our customers are at the heart of everything we do. We strive to exceed expectations with every interaction.',
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: 'Quality Guarantee',
      description:
        'We carefully curate our product selection to ensure only the best items make it to our store.',
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: 'Innovation',
      description:
        'We continuously improve our platform and services to provide the best shopping experience.',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Happy Customers' },
    { value: '500+', label: 'Products' },
    { value: '50+', label: 'Brands' },
    { value: '24/7', label: 'Support' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl mb-6">About ShopHub</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your trusted online shopping destination for quality products, great prices, and
            exceptional customer service.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl text-primary mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                ShopHub was founded with a simple mission: to make online shopping easy,
                enjoyable, and accessible to everyone. We started as a small team with big dreams,
                and today we're proud to serve thousands of satisfied customers worldwide.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that shopping should be more than just a transaction. It should be an
                experience that brings joy, convenience, and value to your life. That's why we
                carefully select every product in our store and work tirelessly to ensure your
                satisfaction.
              </p>
              <p className="text-gray-600">
                Our commitment to quality, affordability, and customer service has made us one of
                the most trusted names in e-commerce. Join our growing community and discover the
                ShopHub difference today.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-sm">Quality Products</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="text-4xl mb-2">💎</div>
                  <p className="text-sm">Best Prices</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="text-4xl mb-2">🚚</div>
                  <p className="text-sm">Fast Shipping</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="text-4xl mb-2">⭐</div>
                  <p className="text-sm">Top Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Our Values</h2>
            <p className="text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};
