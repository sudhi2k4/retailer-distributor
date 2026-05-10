import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const trends = await prisma.analyticsData.findMany({
      include: {
        product: {
          select: { id: true, name: true },
        },
      },
      orderBy: {
        totalOrders: 'desc',
      },
    });

    const formattedTrends = trends.map((trend) => ({
      id: trend.id,
      productId: trend.productId,
      productName: trend.product.name,
      totalOrders: trend.totalOrders,
      totalQuantity: trend.totalQuantity,
      avgOrderValue: trend.avgOrderValue,
      demandTrend: trend.demandTrend.toLowerCase(),
      lastOrderDate: trend.lastOrderDate,
    }));

    return NextResponse.json({ trends: formattedTrends });
  } catch (error) {
    console.error('Error fetching product trends:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trends' },
      { status: 500 }
    );
  }
}
