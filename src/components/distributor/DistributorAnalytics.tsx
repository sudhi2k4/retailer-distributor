'use client';

import { useState, useEffect } from 'react';
import { ProductTrend, RetailerPerformance } from '@/types';

export default function DistributorAnalytics() {
  const [productTrends, setProductTrends] = useState<ProductTrend[]>([]);
  const [retailerPerformance, setRetailerPerformance] = useState<
    RetailerPerformance[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'retailers'>(
    'products'
  );

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [trendsRes, performanceRes] = await Promise.all([
        fetch('/api/analytics/product-trends'),
        fetch('/api/analytics/retailer-performance'),
      ]);

      if (!trendsRes.ok || !performanceRes.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const [trendsData, performanceData] = await Promise.all([
        trendsRes.json(),
        performanceRes.json(),
      ]);

      setProductTrends(trendsData.trends);
      setRetailerPerformance(performanceData.performance);
    } catch (error) {
      console.error('Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Analytics & Trends</h2>

      <div className="border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'products'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Product Trends
          </button>
          <button
            onClick={() => setActiveTab('retailers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'retailers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Retailer Performance
          </button>
        </nav>
      </div>

      {activeTab === 'products' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {productTrends.map((trend) => (
            <div key={trend.productId} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">{trend.productName}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Orders:</span>
                  <span className="font-medium">{trend.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Quantity:</span>
                  <span className="font-medium">{trend.totalQuantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Order Value:</span>
                  <span className="font-medium">
                    ₹{trend.averageOrderValue.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-600">Demand Trend:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getDemandColor(
                      trend.demandTrend
                    )}`}
                  >
                    {trend.demandTrend}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                  <span>Last Order:</span>
                  <span>{new Date(trend.lastOrderDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'retailers' && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Retailer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Avg Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Low Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Last Order
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {retailerPerformance.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No retailer data available
                  </td>
                </tr>
              ) : (
                retailerPerformance.map((retailer) => (
                  <tr key={retailer.retailerId}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-sm">
                      {retailer.retailerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {retailer.totalOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      ₹{retailer.totalOrderValue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ₹{retailer.avgOrderValue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {retailer.lowStockItems} /{' '}
                      {retailer.totalItems}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(retailer.lastOrderDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
