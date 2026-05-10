# Distributor-Retailer Platform

A comprehensive product management and inventory tracking system designed to streamline the distribution and retail process. This platform enables distributors to manage orders, monitor inventory across multiple retailers, and analyze product demand trends.

## 🎯 Features

### For Retailers
- **Browse Products**: View complete product catalog with details and pricing
- **Place Orders**: Create orders with customizable quantities and delivery addresses
- **Order Tracking**: Real-time order status updates (Pending → Confirmed → Shipped → Delivered)
- **Order History**: View complete order history with detailed information

### For Distributors
- **Order Management**
  - Incoming order queue with detailed information
  - Update order status and manage deliveries
  - Filter orders by status for better workflow

- **Inventory Monitoring**
  - Real-time stock level tracking across retailers
  - Critical and warning alerts for low stock items
  - Quick contact options to restock with retailers

- **Advanced Analytics**
  - **Product Trends**: Analyze demand patterns (High/Medium/Low)
  - **Retailer Performance**: View sales metrics and performance indicators
  - **Inventory Insights**: Identify bestsellers and slow-moving products
  - **Revenue Tracking**: Monitor sales performance and trends

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15+ with React
- **Styling**: Tailwind CSS for responsive design
- **Backend**: Next.js API Routes
- **Authentication**: Session-based with cookies
- **Language**: TypeScript for type safety

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   Navigate to `http://localhost:3000`

### Demo Credentials

#### Retailer Account
```
Email: retailer@example.com
Password: password
```

#### Distributor Account
```
Email: distributor@example.com
Password: password
```

## 📚 Project Structure

```
src/
├── app/
│   ├── api/                 # REST API endpoints
│   │   ├── auth/           # Authentication routes
│   │   ├── orders/         # Order management routes
│   │   ├── products/       # Product routes
│   │   ├── inventory/      # Inventory routes
│   │   ├── analytics/      # Analytics routes
│   │   └── dashboard/      # Dashboard stats
│   ├── login/              # Login page
│   └── dashboard/          # Main dashboard
├── components/
│   ├── auth/              # Authentication components
│   ├── retailer/          # Retailer-specific features
│   ├── distributor/       # Distributor-specific features
│   └── common/            # Shared components
├── context/               # React Context for state management
├── types/                 # TypeScript type definitions
└── lib/                   # Utility functions
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - List all products

### Orders
- `GET /api/orders/my-orders` - Get retailer orders
- `GET /api/orders/distributor` - Get distributor orders
- `POST /api/orders/create` - Create new order
- `PATCH /api/orders/:id/status` - Update order status

### Inventory & Analytics
- `GET /api/inventory/alerts` - Get inventory alerts
- `GET /api/analytics/product-trends` - Get demand trends
- `GET /api/analytics/retailer-performance` - Get retailer metrics
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🏃 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
```

## 🔐 Authentication

The platform uses session-based authentication with secure cookies. Users are authenticated at login and their session is maintained across requests.

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Role-Based UI**: Different interfaces for retailers and distributors
- **Real-time Updates**: Live order status tracking
- **Intuitive Navigation**: Clean and organized menu system

## 🔨 Building for Production

```bash
npm run build
npm start
```

## 📝 Environment Configuration

Create `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push and create a Pull Request

## 📄 License

MIT License - feel free to use this project

## 🚀 Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Real-time notifications via WebSockets
- Payment gateway integration
- Advanced analytics with charts
- Mobile app
- Demand forecasting with ML
- Warehouse management features
