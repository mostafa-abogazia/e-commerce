import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.values(formData).some((value) => !value.trim())) {
      toast.error('Please fill in all fields');
      return;
    }

    // Simulate form submission
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      details: 'mostafa@gmail.com',
      link: 'mailto:abogazia.code@gmail.com',
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      details: '+20 1121 863 867',
      link: 'tel:+20 1121863867',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Address',
      details: 'Egypt, Ismailia',
      link: 'https://www.google.com/maps?q=Ismailia,+Egypt',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl mb-6">Get in Touch</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have a question or need assistance? We're here to help! Reach out to us and we'll
            respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className=" py-16 px-4">
        <div className="  max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-full mb-4">
                  {info.icon}
                </div>
                <h3 className="mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm">{info.details}</p>
              </a>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-3xl mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-accent transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Map Placeholder & Additional Info */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              

              {/* FAQ Section */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-2xl mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2">What are your shipping times?</h4>
                    <p className="text-sm text-gray-600">
                      We offer free shipping on orders over $50 and typically deliver within 3-5
                      business days.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2">What is your return policy?</h4>
                    <p className="text-sm text-gray-600">
                      We accept returns within 30 days of purchase for a full refund or exchange.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2">Do you ship internationally?</h4>
                    <p className="text-sm text-gray-600">
                      Yes! We ship to most countries worldwide. Shipping times and costs vary by
                      location.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
