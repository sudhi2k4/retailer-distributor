import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const severity = searchParams.get('severity');

    const where: any = {};

    if (severity && severity !== 'all') {
      where.severity = severity.toUpperCase();
    } else {
      // Get all low stock items
      const inventories = await prisma.inventory.findMany({
        where: {
          currentStock: {
            lt: 10, // Less than reorder level
          },
        },
        include: {
          retailer: {
            select: { id: true, name: true },
          },
          product: {
            select: { id: true, name: true },
          },
        },
      });

      const alerts = inventories.map((inv) => {
        const isoCritical = inv.currentStock < inv.reorderLevel / 2;
        return {
          id: inv.id,
          retailerId: inv.retailerId,
          retailerName: inv.retailer.name,
          productId: inv.productId,
          productName: inv.product.name,
          currentStock: inv.currentStock,
          reorderLevel: inv.reorderLevel,
          severity: isoCritical ? 'CRITICAL' : 'WARNING',
          createdAt: inv.createdAt,
        };
      });

      return NextResponse.json({ alerts });
    }

    // If severity is specified, get analytics alerts
    const analyticsAlerts = await prisma.analyticsData.findMany({
      where,
    });

    return NextResponse.json({ alerts: analyticsAlerts });
  } catch (error) {
    console.error('Error fetching inventory alerts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}
