import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UserX } from 'lucide-react';

const BlockedUsers = () => {
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 1, name: 'Jane Doe' },
    { id: 2, name: 'John Smith' },
    { id: 3, name: 'Alice Johnson' },
  ]);

  const handleUnblock = (id) => {
    setBlockedUsers(blockedUsers.filter(user => user.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/settings" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold">Blocked Users</h1>
      </div>
      
      {blockedUsers.length > 0 ? (
        <ul className="space-y-4">
          {blockedUsers.map(user => (
            <li key={user.id} className="flex items-center justify-between bg-card text-card-foreground rounded-lg p-4">
              <div className="flex items-center">
                <UserX className="h-6 w-6 mr-3 text-muted-foreground" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={() => handleUnblock(user.id)}
                className="bg-accent text-accent-foreground px-3 py-1 rounded-md hover:bg-accent-foreground hover:text-accent transition-colors"
              >
                Unblock
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted-foreground">You haven't blocked any users.</p>
      )}
    </div>
  );
};

export default BlockedUsers;

