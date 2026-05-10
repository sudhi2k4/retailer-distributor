import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { UserRole, OrderStatus, DemandTrend } from "@prisma/client";

async function main() {
  console.log("Starting database seed...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.analyticsData.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const retailer1 = await prisma.user.create({
    data: {
      email: "retailer@example.com",
      password: "password",
      name: "ABC Retail Store",
      role: UserRole.RETAILER,
    },
  });

  const retailer2 = await prisma.user.create({
    data: {
      email: "retailer2@example.com",
      password: "password",
      name: "XYZ Electronics",
      role: UserRole.RETAILER,
    },
  });

  const retailer3 = await prisma.user.create({
    data: {
      email: "retailer3@example.com",
      password: "password",
      name: "Tech Hub",
      role: UserRole.RETAILER,
    },
  });

  const distributor = await prisma.user.create({
    data: {
      email: "distributor@example.com",
      password: "password",
      name: "Tech Distributor Ltd",
      role: UserRole.DISTRIBUTOR,
    },
  });

  console.log("✓ Created users");

  // Create products
  const laptop = await prisma.product.create({
    data: {
      name: "Laptop",
      description: "High-performance laptop",
      price: 50000,
      category: "Electronics",
    },
  });

  const mouse = await prisma.product.create({
    data: {
      name: "Mouse",
      description: "Wireless mouse",
      price: 500,
      category: "Accessories",
    },
  });

  const keyboard = await prisma.product.create({
    data: {
      name: "Keyboard",
      description: "Mechanical keyboard",
      price: 3000,
      category: "Accessories",
    },
  });

  const monitor = await prisma.product.create({
    data: {
      name: "Monitor",
      description: "4K Monitor",
      price: 25000,
      category: "Electronics",
    },
  });

  const headphones = await prisma.product.create({
    data: {
      name: "Headphones",
      description: "Noise-cancelling headphones",
      price: 5000,
      category: "Audio",
    },
  });

  console.log("✓ Created products");

  // Create inventory for retailers
  const retailers = [retailer1, retailer2, retailer3];
  const products = [laptop, mouse, keyboard, monitor, headphones];

  for (const retailer of retailers) {
    for (const product of products) {
      await prisma.inventory.create({
        data: {
          retailerId: retailer.id,
          productId: product.id,
          currentStock: Math.floor(Math.random() * 50) + 5,
          reorderLevel: 10,
        },
      });
    }
  }

  console.log("✓ Created inventory");

  // Create sample orders
  const orderStatuses = [
    OrderStatus.PENDING,
    OrderStatus.CONFIRMED,
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED,
  ];

  for (let i = 0; i < 25; i++) {
    const retailer = retailers[Math.floor(Math.random() * retailers.length)];
    const selectedProducts = products
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 1);

    let totalAmount = 0;
    const orderItems = selectedProducts.map((product) => {
      const quantity = Math.floor(Math.random() * 5) + 1;
      totalAmount += product.price * quantity;
      return {
        productId: product.id,
        quantity,
        price: product.price,
      };
    });

    await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}-${i}`,
        retailerId: retailer.id,
        totalAmount,
        deliveryAddress: `${retailer.name}, Address ${i}`,
        status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
        items: {
          create: orderItems,
        },
      },
    });
  }

  console.log("✓ Created 25 sample orders");

  // Create analytics data
  const trendData = [
    { product: laptop, trend: DemandTrend.HIGH, orders: 15, quantity: 25 },
    { product: mouse, trend: DemandTrend.HIGH, orders: 32, quantity: 150 },
    { product: keyboard, trend: DemandTrend.MEDIUM, orders: 12, quantity: 30 },
    { product: monitor, trend: DemandTrend.LOW, orders: 8, quantity: 10 },
    {
      product: headphones,
      trend: DemandTrend.MEDIUM,
      orders: 20,
      quantity: 35,
    },
  ];

  for (const data of trendData) {
    await prisma.analyticsData.create({
      data: {
        productId: data.product.id,
        demandTrend: data.trend,
        totalOrders: data.orders,
        totalQuantity: data.quantity,
        avgOrderValue: data.product.price,
        lastOrderDate: new Date(),
      },
    });
  }

  console.log("✓ Created analytics data");
  console.log("\n✅ Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
