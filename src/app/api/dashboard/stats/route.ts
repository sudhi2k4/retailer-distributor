import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { DashboardStats } from '@/types';

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth');

  if (!authCookie?.value) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = JSON.parse(authCookie.value);

  // Mock stats based on role
  let stats: DashboardStats = {
    totalOrders: 25,
    totalRevenue: 325000,
  };

  if (user.role === 'distributor') {
    stats = {
      ...stats,
      activeRetailers: 8,
      lowStockItems: 12,
      pendingOrders: 5,
      todayOrders: 2,
    };
  }

  return NextResponse.json({ stats });
}
