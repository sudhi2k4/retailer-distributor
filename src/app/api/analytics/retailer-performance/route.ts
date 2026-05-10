import { NextResponse } from 'next/server';

export async function GET() {
  // Mock retailer performance
  const mockPerformance = [
    {
      retailerId: 'retail-1',
      retailerName: 'ABC Retail Store',
      totalOrders: 25,
      totalOrderValue: 325000,
      averageOrderValue: 13000,
      lastOrderDate: new Date('2026-05-02'),
      stockStatus: {
        lowStockItems: 3,
        totalItems: 15,
      },
    },
    {
      retailerId: 'retail-2',
      retailerName: 'XYZ Electronics',
      totalOrders: 18,
      totalOrderValue: 280000,
      averageOrderValue: 15555,
      lastOrderDate: new Date('2026-05-01'),
      stockStatus: {
        lowStockItems: 1,
        totalItems: 12,
      },
    },
    {
      retailerId: 'retail-3',
      retailerName: 'Tech Hub',
      totalOrders: 12,
      totalOrderValue: 180000,
      averageOrderValue: 15000,
      lastOrderDate: new Date('2026-04-30'),
      stockStatus: {
        lowStockItems: 2,
        totalItems: 10,
      },
    },
  ];

  return NextResponse.json({ performance: mockPerformance });
}
