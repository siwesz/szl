import React from 'react';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Thank You!</h1>
        <p className="mt-4">Your profile has been submitted for approval.</p>
        <p>You will receive an email notification once your profile has been reviewed.</p>
      </div>
    </div>
  );
};

export default ThankYou; 