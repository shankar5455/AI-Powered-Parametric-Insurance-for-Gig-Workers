import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Notification from '../components/Notification';
import { mockClaims } from '../data/mockData';

const claimTypeIcons = {
  Rain: { emoji: '🌧️', bg: 'bg-blue-50', text: 'text-blue-600' },
  Heat: { emoji: '🌡️', bg: 'bg-orange-50', text: 'text-orange-600' },
  Pollution: { emoji: '💨', bg: 'bg-gray-50', text: 'text-gray-600' },
  Flood: { emoji: '🌊', bg: 'bg-cyan-50', text: 'text-cyan-600' },
  Storm: { emoji: '⛈️', bg: 'bg-purple-50', text: 'text-purple-600' },
};

const statusBadge = {
  Approved: 'success',
  Pending: 'warning',
  Rejected: 'danger',
};

const SimulateModal = ({ onClose, onConfirm }) => {
  const [type, setType] = useState('Rain');
  const disruptions = ['Rain', 'Heat', 'Pollution', 'Flood', 'Storm'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">
            {claimTypeIcons[type]?.emoji || '⚡'}
          </div>
          <h3 className="text-xl font-bold text-gray-900">Simulate Disruption</h3>
          <p className="text-gray-500 text-sm mt-1">
            Choose a weather event to simulate for demo purposes
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {disruptions.map((d) => (
            <button
              key={d}
              onClick={() => setType(d)}
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                type === d
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-300'
              }`}
            >
              <span className="text-xl mb-1">{claimTypeIcons[d]?.emoji}</span>
              {d}
            </button>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-3 mb-5 text-center">
          <p className="text-sm text-blue-700">
            This will simulate a <strong>{type}</strong> disruption and credit ₹300 to your account.
          </p>
        </div>

        <div className="flex space-x-3">
          <Button variant="secondary" fullWidth onClick={onClose}>Cancel</Button>
          <Button variant="primary" fullWidth onClick={() => onConfirm(type)}>
            Simulate {type}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Claims = () => {
  const [claims, setClaims] = useState(mockClaims);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSimulate = (type) => {
    const newClaim = {
      id: claims.length + 1,
      date: new Date().toISOString().split('T')[0],
      type,
      amount: '₹300',
      status: 'Approved',
    };
    setClaims([newClaim, ...claims]);
    setShowModal(false);
    setNotification(`₹300 credited due to heavy ${type.toLowerCase()}! ${claimTypeIcons[type]?.emoji || ''}`);
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

      {showModal && (
        <SimulateModal
          onClose={() => setShowModal(false)}
          onConfirm={handleSimulate}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Claims</h1>
            <p className="text-gray-500 mt-1">Track all your insurance claims and payouts</p>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            Simulate Disruption
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Claims', value: claims.length, icon: '📋' },
            {
              label: 'Approved',
              value: claims.filter(c => c.status === 'Approved').length,
              icon: '✅',
            },
            {
              label: 'Pending',
              value: claims.filter(c => c.status === 'Pending').length,
              icon: '⏳',
            },
            {
              label: 'Total Payout',
              value: `₹${claims
                .filter(c => c.status === 'Approved')
                .reduce((sum, c) => sum + parseInt(c.amount.replace('₹', '')), 0)
                .toLocaleString()}`,
              icon: '💰',
            },
          ].map((stat, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Claims Table */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-800">Claims History</h2>
            <span className="text-sm text-gray-400">{claims.length} total</span>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {claims.map((claim) => {
                  const typeInfo = claimTypeIcons[claim.type] || { emoji: '⚡', bg: 'bg-gray-50', text: 'text-gray-600' };
                  return (
                    <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600">{claim.date}</td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl ${typeInfo.bg}`}>
                          <span>{typeInfo.emoji}</span>
                          <span className={`text-sm font-medium ${typeInfo.text}`}>{claim.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">{claim.amount}</td>
                      <td className="px-6 py-4">
                        <Badge label={claim.status} type={statusBadge[claim.status] || 'default'} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="sm:hidden divide-y divide-gray-100">
            {claims.map((claim) => {
              const typeInfo = claimTypeIcons[claim.type] || { emoji: '⚡', bg: 'bg-gray-50' };
              return (
                <div key={claim.id} className="px-4 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl ${typeInfo.bg}`}>
                      <span>{typeInfo.emoji}</span>
                      <span className="text-sm font-medium text-gray-700">{claim.type}</span>
                    </div>
                    <Badge label={claim.status} type={statusBadge[claim.status] || 'default'} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{claim.date}</span>
                    <span className="text-sm font-bold text-gray-800">{claim.amount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Claims;
