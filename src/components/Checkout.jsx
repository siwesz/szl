import React from 'react';
import { Link } from 'react-router-dom';

const cartItems = [
  { id: 1, name: 'Vibrator', price: 49.99, quantity: 1 },
  { id: 2, name: 'Lubricant', price: 14.99, quantity: 2 },
];

const Checkout = () => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between bg-secondary text-secondary-foreground rounded-lg shadow-md p-4">
          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-accent">${item.price.toFixed(2)} x {item.quantity}</p>
          </div>
          <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <div className="flex justify-between items-center bg-primary text-primary-foreground rounded-lg shadow-md p-4 mt-6">
        <h3 className="text-xl font-bold">Total</h3>
        <p className="text-2xl font-bold">${total.toFixed(2)}</p>
      </div>
      <div className="mt-6 flex justify-between">
        <Link to="/" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md hover:bg-secondary-foreground hover:text-secondary transition-colors">
          Back to Home
        </Link>
        <button className="bg-accent text-accent-foreground px-6 py-3 rounded-md hover:bg-accent-foreground hover:text-accent transition-colors">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;

