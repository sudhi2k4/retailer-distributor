// User Types
export type UserRole = 'admin' | 'distributor' | 'retailer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  createdAt: Date;
  updatedAt: Date;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  category: string;
  distributorId: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Inventory Types
export interface Inventory {
  id: string;
  productId: string;
  retailerId: string;
  quantity: number;
  reorderLevel: number;
  lastRestocked: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  retailerId: string;
  distributorId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryPincode: string;
  orderDate: Date;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics Types
export interface ProductTrend {
  productId: string;
  productName: string;
  totalOrders: number;
  totalQuantity: number;
  averageOrderValue: number;
  demandTrend: 'high' | 'medium' | 'low';
  lastOrderDate: Date;
}

export interface RetailerPerformance {
  retailerId: string;
  retailerName: string;
  totalOrders: number;
  totalOrderValue: number;
  averageOrderValue: number;
  lastOrderDate: Date;
  stockStatus: {
    lowStockItems: number;
    totalItems: number;
  };
}

export interface InventoryAlert {
  id: string;
  retailerId: string;
  productId: string;
  productName: string;
  currentStock: number;
  reorderLevel: number;
  severity: 'critical' | 'warning' | 'info';
  createdAt: Date;
}

// Dashboard Types
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  activeRetailers?: number;
  lowStockItems?: number;
  pendingOrders?: number;
  todayOrders?: number;
}
