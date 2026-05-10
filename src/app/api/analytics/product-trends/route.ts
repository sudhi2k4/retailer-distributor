import { NextResponse } from 'next/server';

export async function GET() {
  // Mock product trends
  const mockTrends = [
    {
      productId: '1',
      productName: 'Laptop',
      totalOrders: 15,
      totalQuantity: 25,
      averageOrderValue: 50000,
      demandTrend: 'high' as const,
      lastOrderDate: new Date('2026-05-02'),
    },
    {
      productId: '2',
      productName: 'Mouse',
      totalOrders: 32,
      totalQuantity: 150,
      averageOrderValue: 500,
      demandTrend: 'high' as const,
      lastOrderDate: new Date('2026-05-01'),
    },
    {
      productId: '3',
      productName: 'Keyboard',
      totalOrders: 12,
      totalQuantity: 30,
      averageOrderValue: 3000,
      demandTrend: 'medium' as const,
      lastOrderDate: new Date('2026-04-28'),
    },
    {
      productId: '4',
      productName: 'Monitor',
      totalOrders: 8,
      totalQuantity: 10,
      averageOrderValue: 25000,
      demandTrend: 'low' as const,
      lastOrderDate: new Date('2026-04-25'),
    },
    {
      productId: '5',
      productName: 'Headphones',
      totalOrders: 20,
      totalQuantity: 35,
      averageOrderValue: 5000,
      demandTrend: 'medium' as const,
      lastOrderDate: new Date('2026-05-02'),
    },
  ];

  return NextResponse.json({ trends: mockTrends });
}
