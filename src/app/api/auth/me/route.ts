import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth');

  if (authCookie?.value) {
    try {
      const user = JSON.parse(authCookie.value);
      return NextResponse.json({ user });
    } catch (error) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }
  }

  return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
}
