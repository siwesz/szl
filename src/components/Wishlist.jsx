import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const wishlistItems = [
  { id: 1, name: 'Vibrator', price: 49.99, image: 'https://picsum.photos/200/300?random=1' },
  { id: 2, name: 'Dildo', price: 39.99, image: 'https://picsum.photos/200/300?random=2' },
];

const Wishlist = () => {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <Link to="/" className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent transition-colors py-1 px-3 rounded text-sm inline-flex items-center">
          <ChevronLeft className="mr-1" size={16} />
          Back
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-accent">Your Wishlist</h2>
      {wishlistItems.map((item) => (
        <div key={item.id} className="flex items-center bg-card text-card-foreground transition-colors duration-300 rounded-lg shadow-md p-4">
          <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
          <div className="flex-grow">
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <p className="text-accent mb-4">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <button className="bg-primary text-primary-foreground transition-colors duration-300 px-4 py-2 rounded-md hover:bg-primary-foreground hover:text-primary">
              Add to Cart
            </button>
            <button className="bg-accent text-accent-foreground transition-colors duration-300 px-4 py-2 rounded-md hover:bg-accent-foreground hover:text-accent">
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;

