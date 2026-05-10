import { NextResponse } from 'next/server';
import { Order, OrderStatus, OrderItem } from '@/types';

// Mock orders database
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    retailerId: 'retail-1',
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
    status: OrderStatus.SHIPPED,
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
    retailerId: 'retail-1',
    distributorId: 'dist-1',
    items: [
      {
        productId: '2',
        productName: 'Mouse',
        quantity: 10,
        price: 500,
        total: 5000,
      },
      {
        productId: '3',
        productName: 'Keyboard',
        quantity: 5,
        price: 3000,
        total: 15000,
      },
    ],
    totalAmount: 20000,
    status: OrderStatus.PENDING,
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let filteredOrders = mockOrders;

  if (status && status !== 'all') {
    filteredOrders = mockOrders.filter((order) => order.status === status);
  }

  return NextResponse.json({ orders: filteredOrders });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newOrder: Order = {
    id: String(Date.now()),
    orderNumber: `ORD-${String(Date.now()).slice(-6)}`,
    retailerId: 'retail-1',
    distributorId: 'dist-1',
    items: body.items,
    totalAmount: body.totalAmount,
    status: OrderStatus.PENDING,
    deliveryAddress: body.deliveryAddress,
    deliveryCity: body.deliveryCity,
    deliveryState: body.deliveryState,
    deliveryPincode: body.deliveryPincode,
    orderDate: new Date(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  mockOrders.push(newOrder);
  return NextResponse.json({ order: newOrder });
}
