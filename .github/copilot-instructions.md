# Distributor-Retailer Platform - Copilot Instructions

## Project Overview
This is a React-based (Next.js) product management and inventory tracking platform for distributors and retailers. The platform enables:

- **Retailers**: Place orders for products, view order history and status
- **Distributors**: Manage incoming orders, track inventory across retailers, view demand analytics and trends

## Architecture

### Frontend (Next.js)
- Framework: Next.js 15+ with App Router
- Styling: Tailwind CSS
- Authentication: Custom context-based auth with cookie session

### Backend (API Routes)
- Next.js API Routes for backend endpoints
- Mock data for development and testing

### Key Features

1. **Order Management**
   - Retailers can browse and order products
   - Distributors can view orders and update status
   - Real-time order tracking

2. **Inventory Management**
   - Track stock levels across retailers
   - Stock alerts for low inventory
   - Reorder level management

3. **Analytics Dashboard**
   - Product demand trends (High/Medium/Low)
   - Retailer performance metrics
   - Sales analytics and insights

4. **Role-Based Access**
   - Retailer dashboard: Order placement & tracking
   - Distributor dashboard: Order management & analytics
   - Admin capabilities for system management

## Project Structure

```
src/
├── app/
│   ├── api/                 # API endpoints
│   │   ├── auth/           # Authentication routes
│   │   ├── orders/         # Order management routes
│   │   ├── products/       # Product routes
│   │   ├── inventory/      # Inventory routes
│   │   ├── analytics/      # Analytics routes
│   │   └── dashboard/      # Dashboard stats
│   ├── login/              # Login page
│   └── dashboard/          # Main dashboard
├── components/
│   ├── auth/              # Auth components
│   ├── retailer/          # Retailer-specific components
│   ├── distributor/       # Distributor-specific components
│   └── common/            # Shared components
├── context/               # React Context (Auth)
├── types/                 # TypeScript types
└── lib/                   # Utility functions

```

## Getting Started

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production
```bash
npm run build
npm start
```

## Testing

### Demo Credentials

**Retailer Account:**
- Email: `retailer@example.com`
- Password: `password`

**Distributor Account:**
- Email: `distributor@example.com`
- Password: `password`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - List all products

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/my-orders` - Get retailer's orders
- `GET /api/orders/distributor` - Get distributor's orders
- `POST /api/orders/create` - Create new order
- `PATCH /api/orders/:id/status` - Update order status

### Inventory
- `GET /api/inventory/alerts` - Get inventory alerts

### Analytics
- `GET /api/analytics/product-trends` - Get product demand trends
- `GET /api/analytics/retailer-performance` - Get retailer performance

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Key Components

### Retailer Components
- **RetailerOrderForm**: Browse products and place orders
- **RetailerOrders**: View order history and status

### Distributor Components
- **DistributorOrders**: Manage incoming orders
- **DistributorInventoryAlerts**: View stock alerts
- **DistributorAnalytics**: View demand trends and performance

### Common Components
- **Navigation**: Header with user info and logout
- **Dashboard**: Main dashboard wrapper with role-based routing

## Data Types

All TypeScript types are defined in `src/types/index.ts`:
- `User` - User information
- `Product` - Product details
- `Order` - Order information
- `OrderItem` - Individual order items
- `Inventory` - Stock information
- `ProductTrend` - Demand analysis
- `RetailerPerformance` - Retailer metrics
- `InventoryAlert` - Stock alerts

## Future Enhancements

1. Database Integration (PostgreSQL/MongoDB)
2. Real-time notifications via WebSockets
3. Payment integration
4. Advanced analytics with charts
5. Email notifications
6. Mobile app support
7. Warehouse management features
8. Demand forecasting with ML

## Development Guidelines

- Use TypeScript for type safety
- Follow React hooks best practices
- Component-based architecture
- API endpoint isolation
- Error handling and loading states
- Responsive UI with Tailwind CSS

## Environment Variables

Create a `.env.local` file for development:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Troubleshooting

- Clear `.next` folder and reinstall: `rm -rf .next && npm install`
- Check Node.js version: Requires Node.js 18+
- Ensure ports 3000 is available git 
