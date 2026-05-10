import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth');

  if (!authCookie?.value) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = JSON.parse(authCookie.value);

  // Mock data - return orders for the current retailer
  const mockOrders = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      retailerId: user.id,
      distributorId: 'dist-1',
      items: [
        {
          productId: '1',
          productName: 'Laptop',
          quantity: 2,
          price: 50000,
          total: 100000,
        },
      ],
      totalAmount: 100000,
      status: 'shipped',
      deliveryAddress: '123 Retail St',
      deliveryCity: 'Mumbai',
      deliveryState: 'Maharashtra',
      deliveryPincode: '400001',
      orderDate: new Date('2026-05-01'),
      estimatedDelivery: new Date('2026-05-05'),
      createdAt: new Date('2026-05-01'),
      updatedAt: new Date('2026-05-02'),
    },
  ];

  return NextResponse.json({ orders: mockOrders });
}
