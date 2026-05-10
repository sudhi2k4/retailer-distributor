'use client';

import { useState, useEffect } from 'react';
import { Product, OrderItem } from '@/types';

export default function RetailerOrderForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [deliveryState, setDeliveryState] = useState('');
  const [deliveryPincode, setDeliveryPincode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      setMessage('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    if (quantity <= 0) return;

    const existingItem = cart.find((item) => item.productId === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                total: (item.quantity + quantity) * item.price,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          productName: product.name,
          quantity,
          price: product.price,
          total: quantity * product.price,
        },
      ]);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      setMessage('Please add items to cart');
      return;
    }

    setIsSubmitting(true);
    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          totalAmount,
          deliveryAddress,
          deliveryCity,
          deliveryState,
          deliveryPincode,
        }),
      });

      if (!response.ok) throw new Error('Failed to create order');
      setMessage('Order created successfully!');
      setCart([]);
      setDeliveryAddress('');
      setDeliveryCity('');
      setDeliveryState('');
      setDeliveryPincode('');
    } catch (error) {
      setMessage('Failed to create order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading products...</div>;

  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Products */}
      <div className="col-span-2">
        <h2 className="text-2xl font-bold mb-4">Available Products</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold text-blue-600">₹{product.price}</p>
              <input
                type="number"
                min="0"
                placeholder="Qty"
                id={`qty-${product.id}`}
                className="w-full border rounded px-2 py-1 mt-2"
              />
              <button
                onClick={() => {
                  const input = document.getElementById(
                    `qty-${product.id}`
                  ) as HTMLInputElement;
                  handleAddToCart(product, parseInt(input.value) || 0);
                  input.value = '';
                }}
                className="w-full mt-2 bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Delivery */}
      <div className="border rounded-lg p-4 h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {/* Cart Items */}
        <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">No items in cart</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between text-sm border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-gray-600">
                    {item.quantity} x ₹{item.price}
                  </p>
                </div>
                <div className="text-right">
                  <p>₹{item.total.toFixed(2)}</p>
                  <button
                    onClick={() => handleRemoveFromCart(item.productId)}
                    className="text-red-600 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-2 mb-4">
          <p className="text-lg font-bold">
            Total: ₹{totalAmount.toFixed(2)}
          </p>
        </div>

        {/* Delivery Address */}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
          />
          <input
            type="text"
            placeholder="City"
            value={deliveryCity}
            onChange={(e) => setDeliveryCity(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
          />
          <input
            type="text"
            placeholder="State"
            value={deliveryState}
            onChange={(e) => setDeliveryState(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
          />
          <input
            type="text"
            placeholder="Pincode"
            value={deliveryPincode}
            onChange={(e) => setDeliveryPincode(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
          />
        </div>

        {message && (
          <p
            className={`text-sm mt-2 p-2 rounded ${
              message.includes('success')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleSubmitOrder}
          disabled={isSubmitting || cart.length === 0}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Creating Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}
