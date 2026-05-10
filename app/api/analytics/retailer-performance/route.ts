import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get all retailers
    const retailers = await prisma.user.findMany({
      where: {
        role: 'RETAILER',
      },
      include: {
        orders: {
          select: {
            id: true,
            totalAmount: true,
          },
        },
        inventory: {
          select: {
            currentStock: true,
            reorderLevel: true,
          },
        },
      },
    });

    const performance = retailers.map((retailer) => {
      const totalOrders = retailer.orders.length;
      const totalOrderValue = retailer.orders.reduce(
        (sum, order) => sum + order.totalAmount,
        0
      );
      const avgOrderValue =
        totalOrders > 0 ? totalOrderValue / totalOrders : 0;

      const lowStockItems = retailer.inventory.filter(
        (inv) => inv.currentStock < inv.reorderLevel
      ).length;

      return {
        retailerId: retailer.id,
        retailerName: retailer.name,
        totalOrders,
        totalOrderValue,
        avgOrderValue: Math.round(avgOrderValue),
        lastOrderDate:
          retailer.orders.length > 0
            ? new Date(Math.max(...retailer.orders.map((o) => o.id)))
            : null,
        lowStockItems,
        totalItems: retailer.inventory.length,
      };
    });

    return NextResponse.json({ performance });
  } catch (error) {
    console.error('Error fetching retailer performance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch performance data' },
      { status: 500 }
    );
  }
}
