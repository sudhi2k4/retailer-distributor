import { NextResponse } from 'next/server';
import { Product } from '@/types';

// Mock products database
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    sku: 'LAPTOP-001',
    description: 'High-performance laptop',
    price: 50000,
    category: 'Electronics',
    distributorId: 'dist-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Mouse',
    sku: 'MOUSE-001',
    description: 'Wireless mouse',
    price: 500,
    category: 'Accessories',
    distributorId: 'dist-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Keyboard',
    sku: 'KB-001',
    description: 'Mechanical keyboard',
    price: 3000,
    category: 'Accessories',
    distributorId: 'dist-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Monitor',
    sku: 'MON-001',
    description: '27 inch 4K monitor',
    price: 25000,
    category: 'Electronics',
    distributorId: 'dist-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Headphones',
    sku: 'HP-001',
    description: 'Noise cancelling headphones',
    price: 5000,
    category: 'Accessories',
    distributorId: 'dist-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function GET() {
  return NextResponse.json({ products: mockProducts });
}
