import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { mockAdminStats, mockAdminUsers, mockMonthlyData } from '../data/mockData';

const StatBox = ({ icon, label, value, sub, iconBg }) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
        {sub && <p className="mt-1 text-xs text-green-600 font-medium">{sub}</p>}
      </div>
      <div className={`p-3 rounded-2xl ${iconBg}`}>
        {icon}
      </div>
    </div>
  </Card>
);

const BarChart = ({ data }) => {
  const maxClaims = Math.max(...data.map(d => d.claims));

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.month} className="flex items-center space-x-3">
          <span className="w-8 text-xs text-gray-500 font-medium text-right">{item.month}</span>
          <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${(item.claims / maxClaims) * 100}%` }}
            >
              <span className="text-white text-xs font-medium">{item.claims}</span>
            </div>
          </div>
          <span className="w-14 text-xs text-gray-400 font-medium">{item.users.toLocaleString()} users</span>
        </div>
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Live Dashboard</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-gray-500 mt-1">Platform statistics and user management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <StatBox
            label="Total Users"
            value={mockAdminStats.totalUsers.toLocaleString()}
            sub={`${mockAdminStats.monthlyGrowth} this month`}
            iconBg="bg-blue-100"
            icon={
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
          <StatBox
            label="Total Claims"
            value={mockAdminStats.totalClaims.toLocaleString()}
            sub={`${mockAdminStats.claimsThisMonth} this month`}
            iconBg="bg-purple-100"
            icon={
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          />
          <StatBox
            label="Total Payout"
            value={mockAdminStats.totalPayout}
            iconBg="bg-green-100"
            icon={
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatBox
            label="Active Plans"
            value={mockAdminStats.activePlans.toLocaleString()}
            iconBg="bg-indigo-100"
            icon={
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          />
        </div>

        {/* Charts & Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Monthly Claims Chart */}
          <Card className="p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-5">Monthly Claims (Last 6 Months)</h3>
            <BarChart data={mockMonthlyData} />
          </Card>

          {/* Plan Distribution */}
          <Card className="p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-5">Plan Distribution</h3>
            <div className="space-y-4">
              {[
                { name: 'Standard Plan', count: 487, pct: 49, color: 'bg-indigo-500' },
                { name: 'Premium Plan', count: 312, pct: 32, color: 'bg-green-500' },
                { name: 'Basic Plan', count: 188, pct: 19, color: 'bg-blue-400' },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.count} users ({item.pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-700">98.2%</p>
                  <p className="text-xs text-gray-500 mt-1">Claim Approval Rate</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-700">4.8h</p>
                  <p className="text-xs text-gray-500 mt-1">Avg. Processing Time</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Users */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-800">Recent Users</h2>
            <span className="text-sm text-gray-400">{mockAdminStats.totalUsers.toLocaleString()} total</span>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockAdminUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.city}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-700">{user.plan}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        label={user.status}
                        type={user.status === 'Active' ? 'success' : 'default'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="sm:hidden divide-y divide-gray-100">
            {mockAdminUsers.map((user) => (
              <div key={user.id} className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.city} · {user.plan}</p>
                  </div>
                </div>
                <Badge label={user.status} type={user.status === 'Active' ? 'success' : 'default'} />
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
