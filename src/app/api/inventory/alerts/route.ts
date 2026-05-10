import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const severity = searchParams.get('severity');

  // Mock inventory alerts
  const mockAlerts = [
    {
      id: '1',
      retailerId: 'retail-1',
      productId: '1',
      productName: 'Laptop',
      currentStock: 2,
      reorderLevel: 5,
      severity: 'critical' as const,
      createdAt: new Date(),
    },
    {
      id: '2',
      retailerId: 'retail-2',
      productId: '2',
      productName: 'Mouse',
      currentStock: 15,
      reorderLevel: 10,
      severity: 'warning' as const,
      createdAt: new Date(),
    },
    {
      id: '3',
      retailerId: 'retail-1',
      productId: '3',
      productName: 'Keyboard',
      currentStock: 8,
      reorderLevel: 10,
      severity: 'warning' as const,
      createdAt: new Date(),
    },
  ];

  let filteredAlerts = mockAlerts;
  if (severity) {
    filteredAlerts = mockAlerts.filter((alert) => alert.severity === severity);
  }

  return NextResponse.json({ alerts: filteredAlerts });
}
