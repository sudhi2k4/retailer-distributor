'use client';

import { useState, useEffect } from 'react';
import { InventoryAlert } from '@/types';

export default function DistributorInventoryAlerts() {
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, [filter]);

  const fetchAlerts = async () => {
    try {
      const url =
        filter === 'all'
          ? '/api/inventory/alerts'
          : `/api/inventory/alerts?severity=${filter}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch alerts');
      const data = await response.json();
      setAlerts(data.alerts);
    } catch (error) {
      console.error('Failed to load alerts');
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (
    severity: 'critical' | 'warning' | 'info'
  ) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
    }
  };

  const handleContactRetailer = (retailerId: string, productName: string) => {
    // In a real app, this would open a notification/contact form
    alert(
      `Contacting retailer ${retailerId} about low stock of ${productName}`
    );
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Stock Alerts</h2>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value as 'all' | 'critical' | 'warning'
            )
          }
          className="border rounded px-4 py-2"
        >
          <option value="all">All Alerts</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {alerts.length === 0 ? (
          <div className="bg-green-50 border border-green-200 rounded p-4 text-green-700">
            All retailers have healthy stock levels
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${getSeverityColor(
                alert.severity
              )}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{alert.productName}</h3>
                  <p className="text-sm mt-1">
                    Retailer {String(alert.retailerId).slice(0, 8)} has{' '}
                    <span className="font-bold">{alert.currentStock}</span>{' '}
                    units (Reorder at: {alert.reorderLevel})
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleContactRetailer(alert.retailerId, alert.productName)
                  }
                  className="ml-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm whitespace-nowrap"
                >
                  Contact
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
