import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('auth');

    if (!authCookie?.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = JSON.parse(authCookie.value);
    const retailerId = parseInt(user.id, 10);
    if (Number.isNaN(retailerId)) {
      return NextResponse.json(
        { error: 'Invalid authenticated user' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        retailerId,
        totalAmount: body.totalAmount,
        deliveryAddress: body.deliveryAddress || '',
        status: 'PENDING',
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: { name: true, price: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
