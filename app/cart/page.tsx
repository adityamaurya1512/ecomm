"use client";

import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/outline';
import confetti from 'canvas-confetti';
import { useUser } from "@/context/userContext";
const CartPage = () => {
  const { items, initializeCart, incrementQuantity, decrementQuantity, removeFromCart } = useCartStore();
  const {email} = useUser()
  
  // State for coupon code and discount
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  useEffect(() => {
    const fetchCartItems = async () => {
      if (email) {
        await initializeCart(email);
      }
    };

    fetchCartItems();
  }, [email, initializeCart]);

  useEffect(() => {
    // Calculate total price
    const calculateTotalPrice = () => {
      const total = items.reduce((total, item) => total + item.price * item.quantity, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [items]);

  const handleApplyDiscount = () => {
    // Hardcoded coupon code and discount
    const validCouponCode = 'DISCOUNT10';
    if (couponCode === validCouponCode) {
      setDiscountApplied(true);
    } else {
      alert('Invalid coupon code');
      setDiscountApplied(false);
    }
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    confetti();
  };

  const discountedPrice = discountApplied ? totalPrice * 0.9 : totalPrice;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h1>
      {items.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          {items.map(item => (
            <div key={item.productId} className="flex items-center justify-between mb-6 p-6 bg-white shadow-md rounded-lg border border-gray-200">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md border border-gray-300 mr-6" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">Price: ${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="text-blue-500 hover:text-blue-700 focus:outline-none p-2 rounded-full border border-blue-300"
                  onClick={() => decrementQuantity(item.productId, email)}
                >
                  <MinusIcon className="h-5 w-5" />
                </button>
                <span className="mx-4 text-lg font-medium text-gray-800">{item.quantity}</span>
                <button
                  className="text-blue-500 hover:text-blue-700 focus:outline-none p-2 rounded-full border border-blue-300"
                  onClick={() => incrementQuantity(item.productId, email)}
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none p-2 rounded-full border border-red-300 ml-4"
                  onClick={() => removeFromCart(item.productId, email)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-6 mb-4">
            <p className="text-slate-500 mb-2">Use coupon code <strong>DISCOUNT10</strong> for 10% off!</p>
            <div className="flex items-center justify-end mb-4">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="p-2 border border-gray-300 rounded-l-md"
              />
              <button
                onClick={handleApplyDiscount}
                className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
              >
                Apply
              </button>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-4">
              Total: ${discountApplied ? discountedPrice.toFixed(2) : totalPrice.toFixed(2)}
            </p>
            {discountApplied && (
              <p className="text-lg text-green-600 mb-4">Discount applied!</p>
            )}
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 focus:outline-none"
              disabled={orderPlaced}
            >
              Checkout
            </button>
            {orderPlaced && (
              <div className="mt-6 p-4 border border-green-500 bg-green-100 text-green-700 rounded">
                <p>Order placed successfully!</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
