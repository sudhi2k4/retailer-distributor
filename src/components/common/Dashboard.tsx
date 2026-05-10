'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardStats } from '@/types';
import RetailerOrderForm from '@/components/retailer/RetailerOrderForm';
import RetailerOrders from '@/components/retailer/RetailerOrders';
import DistributorOrders from '@/components/distributor/DistributorOrders';
import DistributorInventoryAlerts from '@/components/distributor/DistributorInventoryAlerts';
import DistributorAnalytics from '@/components/distributor/DistributorAnalytics';

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  if (!user) {
    return <div className="text-center py-8">Please login first</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.totalOrders}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              ₹{stats.totalRevenue.toFixed(2)}
            </p>
          </div>
          {user.role === 'distributor' && (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-600 text-sm font-medium">
                  Active Retailers
                </h3>
                <p className="text-3xl font-bold text-purple-600 mt-2">
                  {stats.activeRetailers || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-600 text-sm font-medium">
                  Low Stock Items
                </h3>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {stats.lowStockItems || 0}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {user.role === 'retailer' && (
              <>
                <button
                  onClick={() => setActiveSection('place-order')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === 'place-order'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Place Order
                </button>
                <button
                  onClick={() => setActiveSection('my-orders')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === 'my-orders'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  My Orders
                </button>
              </>
            )}

            {user.role === 'distributor' && (
              <>
                <button
                  onClick={() => setActiveSection('orders')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === 'orders'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setActiveSection('alerts')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === 'alerts'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Stock Alerts
                </button>
                <button
                  onClick={() => setActiveSection('analytics')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === 'analytics'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Analytics
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {user.role === 'retailer' && (
            <>
              {activeSection === 'place-order' && <RetailerOrderForm />}
              {activeSection === 'my-orders' && <RetailerOrders />}
            </>
          )}

          {user.role === 'distributor' && (
            <>
              {activeSection === 'orders' && <DistributorOrders />}
              {activeSection === 'alerts' && (
                <DistributorInventoryAlerts />
              )}
              {activeSection === 'analytics' && <DistributorAnalytics />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
