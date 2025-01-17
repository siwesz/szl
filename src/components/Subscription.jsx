import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';

const Subscription = () => {
  const [currentPlan, setCurrentPlan] = useState('basic');

  const plans = [
    { id: 'basic', name: 'Basic', price: '$9.99/month', features: ['Limited matches', 'Basic chat'] },
    { id: 'premium', name: 'Premium', price: '$19.99/month', features: ['Unlimited matches', 'Advanced chat', 'Profile boost'] },
    { id: 'vip', name: 'VIP', price: '$29.99/month', features: ['All Premium features', 'Priority support', 'Ad-free experience'] },
  ];

  const handleChangePlan = (planId) => {
    setCurrentPlan(planId);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/settings" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold">Subscription</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map(plan => (
          <div key={plan.id} className={`bg-card text-card-foreground rounded-lg p-6 ${currentPlan === plan.id ? 'ring-2 ring-accent' : ''}`}>
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>
            <ul className="space-y-2 mb-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleChangePlan(plan.id)}
              className={`w-full py-2 rounded-md ${
                currentPlan === plan.id
                  ? 'bg-accent-foreground text-accent'
                  : 'bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent'
              } transition-colors`}
            >
              {currentPlan === plan.id ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;

