import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth');

  if (!authCookie?.value) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = JSON.parse(authCookie.value);

  // Mock data - return all orders for the distributor
  const mockOrders = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      retailerId: 'retail-1',
      distributorId: user.id,
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
    {
      id: '2',
      orderNumber: 'ORD-002',
      retailerId: 'retail-2',
      distributorId: user.id,
      items: [
        {
          productId: '2',
          productName: 'Mouse',
          quantity: 10,
          price: 500,
          total: 5000,
        },
      ],
      totalAmount: 5000,
      status: 'pending',
      deliveryAddress: '456 Retail Ave',
      deliveryCity: 'Bangalore',
      deliveryState: 'Karnataka',
      deliveryPincode: '560001',
      orderDate: new Date('2026-05-02'),
      estimatedDelivery: new Date('2026-05-06'),
      createdAt: new Date('2026-05-02'),
      updatedAt: new Date('2026-05-02'),
    },
  ];

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let filteredOrders = mockOrders;
  if (status) {
    filteredOrders = mockOrders.filter((order) => order.status === status);
  }

  return NextResponse.json({ orders: filteredOrders });
}
