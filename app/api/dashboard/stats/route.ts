import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('auth');

    if (!authCookie?.value) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const user = JSON.parse(authCookie.value);

    if (user.role === 'RETAILER') {
      // Retailer stats
      const orders = await prisma.order.findMany({
        where: { retailerId: user.id },
      });

      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

      return NextResponse.json({
        stats: {
          totalOrders,
          totalRevenue,
        },
      });
    } else {
      // Distributor stats
      const orders = await prisma.order.findMany();
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

      const retailers = await prisma.user.findMany({
        where: { role: 'RETAILER' },
      });
      const activeRetailers = retailers.length;

      const lowStockInventories = await prisma.inventory.findMany({
        where: {
          currentStock: {
            lt: 10,
          },
        },
      });
      const lowStockItems = lowStockInventories.length;

      const pendingOrders = await prisma.order.findMany({
        where: { status: 'PENDING' },
      });

      return NextResponse.json({
        stats: {
          totalOrders,
          totalRevenue,
          activeRetailers,
          lowStockItems,
          pendingOrders: pendingOrders.length,
        },
      });
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
