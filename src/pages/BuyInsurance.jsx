import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Notification from '../components/Notification';
import { mockPlans } from '../data/mockData';

const colorMap = {
  blue: {
    badge: 'bg-blue-100 text-blue-700',
    button: 'primary',
    accent: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-600',
    ring: 'ring-blue-500',
    header: 'bg-gradient-to-br from-blue-500 to-blue-600',
    check: 'text-blue-500',
  },
  indigo: {
    badge: 'bg-indigo-100 text-indigo-700',
    button: 'primary',
    accent: 'bg-indigo-50 border-indigo-200',
    icon: 'text-indigo-600',
    ring: 'ring-indigo-500',
    header: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    check: 'text-indigo-500',
  },
  green: {
    badge: 'bg-green-100 text-green-700',
    button: 'success',
    accent: 'bg-green-50 border-green-200',
    icon: 'text-green-600',
    ring: 'ring-green-500',
    header: 'bg-gradient-to-br from-green-500 to-green-600',
    check: 'text-green-500',
  },
};

const BuyInsurance = () => {
  const [selected, setSelected] = useState(null);
  const [subscribed, setSubscribed] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleSubscribe = (plan) => {
    setSubscribed(plan.id);
    setNotification(`🎉 Successfully subscribed to ${plan.name}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {notification && (
        <Notification
          message={notification}
          type="success"
          onClose={() => setNotification(null)}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Protection</h1>
          <p className="text-gray-500 mt-2 text-lg">
            Select a plan that fits your delivery schedule and risk profile
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {mockPlans.map((plan) => {
            const colors = colorMap[plan.color] || colorMap.blue;
            const isSelected = selected === plan.id;
            const isSubscribed = subscribed === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 ${
                  isSelected ? `ring-2 ${colors.ring} ring-offset-2` : ''
                } ${plan.popular ? 'scale-105 shadow-xl' : ''}`}
                onClick={() => setSelected(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 text-center py-1.5 bg-indigo-700 text-white text-xs font-bold tracking-wider uppercase">
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div className={`${colors.header} p-6 ${plan.popular ? 'pt-10' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    {isSubscribed && (
                      <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full font-medium">
                        ✓ Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-extrabold text-white">
                      {plan.price.split('/')[0]}
                    </span>
                    <span className="text-white text-opacity-80 text-sm">/week</span>
                  </div>
                </div>

                {/* Body */}
                <div className="bg-white p-6">
                  <p className="text-gray-500 text-sm mb-5">{plan.description}</p>

                  <div className="space-y-2.5 mb-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Coverage Includes</p>
                    {plan.coverage.map((item, i) => (
                      <div key={i} className="flex items-center space-x-2.5">
                        <svg className={`w-4 h-4 ${colors.check} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant={isSubscribed ? 'secondary' : colors.button}
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isSubscribed) handleSubscribe(plan);
                    }}
                  >
                    {isSubscribed ? '✓ Subscribed' : 'Subscribe Now'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Footer */}
        <div className="mt-10 max-w-5xl mx-auto">
          <Card className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { icon: '⚡', title: 'Instant Payouts', desc: 'Claims processed within 24 hours' },
                { icon: '🤖', title: 'AI-Powered', desc: 'Automatic disruption detection' },
                { icon: '🔒', title: 'Secure & Transparent', desc: 'Blockchain-verified claims' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-3xl mb-2">{item.icon}</span>
                  <h4 className="font-semibold text-gray-800 text-sm">{item.title}</h4>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BuyInsurance;
