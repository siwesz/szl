import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const products = [
  { id: 1, name: 'Vibrator', price: 49.99, image: 'https://picsum.photos/200/300?random=1' },
  { id: 2, name: 'Dildo', price: 39.99, image: 'https://picsum.photos/200/300?random=2' },
  { id: 3, name: 'Lubricant', price: 14.99, image: 'https://picsum.photos/200/300?random=3' },
  { id: 4, name: 'Bondage Kit', price: 79.99, image: 'https://picsum.photos/200/300?random=4' },
];

const Shop = () => {
  return (
    <div>
      <div className="mb-4">
        <Link to="/" className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent transition-colors py-1 px-3 rounded text-sm inline-flex items-center">
          <ChevronLeft className="mr-1" size={16} />
          Back
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-secondary text-secondary-foreground transition-colors duration-300 rounded-lg shadow-md p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-accent mb-4">${product.price.toFixed(2)}</p>
            <div className="flex justify-between">
              <button className="bg-primary text-primary-foreground transition-colors duration-300 px-4 py-2 rounded-md hover:bg-primary-foreground hover:text-primary">
                Add to Cart
              </button>
              <button className="bg-accent text-accent-foreground transition-colors duration-300 px-4 py-2 rounded-md hover:bg-accent-foreground hover:text-accent">
                Add to Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;

