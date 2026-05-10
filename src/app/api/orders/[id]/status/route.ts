import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { status } = await request.json();

  // Mock update
  return NextResponse.json({
    order: {
      id: params.id,
      status,
      updatedAt: new Date(),
    },
  });
}
