import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Notification from '../components/Notification';
import { mockUser, mockInsurancePlan, mockDashboardStats } from '../data/mockData';

const StatCard = ({ icon, label, value, bg, iconBg }) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`p-3 rounded-2xl ${iconBg}`}>
        {icon}
      </div>
    </div>
  </Card>
);

const Dashboard = () => {
  const [notification, setNotification] = useState(null);

  const riskColors = {
    Low: 'success',
    Medium: 'warning',
    High: 'danger',
  };

  const riskBg = {
    Low: 'from-green-400 to-green-600',
    Medium: 'from-yellow-400 to-orange-500',
    High: 'from-red-400 to-red-600',
  };

  const handleSimulateRain = () => {
    setNotification('₹300 credited due to heavy rain! 🌧️');
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {mockUser.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              {mockUser.deliveryType} Partner · {mockUser.city}
            </p>
          </div>
          <Button onClick={handleSimulateRain} variant="success" className="hidden sm:inline-flex">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            Simulate Rain
          </Button>
        </div>

        {/* Active Plan Banner */}
        <div className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-blue-200 text-sm font-medium">Active Plan</span>
              </div>
              <h2 className="text-2xl font-bold">{mockInsurancePlan.planName}</h2>
              <p className="text-blue-200 mt-1">{mockInsurancePlan.coverageType} Coverage</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{mockInsurancePlan.premium}</p>
              <p className="text-blue-200 text-sm mt-1">
                Valid till {mockInsurancePlan.endDate}
              </p>
              <Link to="/buy-insurance">
                <Button variant="ghost" size="sm" className="mt-2 bg-white bg-opacity-20 text-white hover:bg-opacity-30 border border-white border-opacity-30">
                  Upgrade Plan →
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          <StatCard
            label="Earnings Protected"
            value={mockDashboardStats.earningsProtected}
            iconBg="bg-green-100"
            icon={
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            label="Total Claims Filed"
            value={mockDashboardStats.totalClaims}
            iconBg="bg-blue-100"
            icon={
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          />
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Current Risk Level</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{mockDashboardStats.riskLevel}</p>
                <div className="mt-2">
                  <Badge label={mockDashboardStats.riskLevel} type={riskColors[mockDashboardStats.riskLevel] || 'default'} />
                </div>
              </div>
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${riskBg[mockDashboardStats.riskLevel]}`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { icon: '🌧️', text: 'Rain payout of ₹300 credited', time: '2 days ago', color: 'bg-blue-50' },
                { icon: '🌡️', text: 'Heat alert – payout processed', time: '7 days ago', color: 'bg-orange-50' },
                { icon: '🛡️', text: 'Standard Plan renewed', time: '14 days ago', color: 'bg-green-50' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center space-x-3 p-3 rounded-xl ${item.color}`}>
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{item.text}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/claims" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">View My Claims</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link to="/buy-insurance" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Upgrade Insurance Plan</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <button
                onClick={handleSimulateRain}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Simulate Rain Event</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
