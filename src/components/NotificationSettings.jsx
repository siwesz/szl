import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Mail, MessageSquare, Heart } from 'lucide-react';

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newMatches: true,
    messages: true,
    likes: true,
  });

  const handleToggle = (setting) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/settings" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold">Notification Settings</h1>
      </div>
      
      <div className="space-y-6">
        <div className="bg-card text-card-foreground rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Notification Methods</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Email Notifications
              </span>
              <input
                type="checkbox"
                checked={notificationSettings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
                className="toggle"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Push Notifications
              </span>
              <input
                type="checkbox"
                checked={notificationSettings.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
                className="toggle"
              />
            </label>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Notification Types</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                New Matches
              </span>
              <input
                type="checkbox"
                checked={notificationSettings.newMatches}
                onChange={() => handleToggle('newMatches')}
                className="toggle"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Messages
              </span>
              <input
                type="checkbox"
                checked={notificationSettings.messages}
                onChange={() => handleToggle('messages')}
                className="toggle"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Likes
              </span>
              <input
                type="checkbox"
                checked={notificationSettings.likes}
                onChange={() => handleToggle('likes')}
                className="toggle"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;

