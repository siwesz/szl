import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Lock, UserCircle, LogOut, UserX, CreditCard } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

const Settings = () => {
  const { isDarkMode } = useDarkMode();

  const handleSignOut = () => {
    console.log('Signing out...');
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} bg-background text-foreground`}>
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-foreground">Settings</h1>
        
        {/* Account Settings Card */}
        <div className="mb-4 sm:mb-6 bg-card text-card-foreground rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Account Settings</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <UserCircle className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
              <div>
                <h3 className="font-medium text-sm sm:text-base">Profile Information</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Update your profile details and preferences</p>
              </div>
            </div>
            <Link to="/settings/edit-profile" className="bg-accent text-accent-foreground px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-accent-foreground hover:text-accent transition-colors">
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Privacy Settings Card */}
        <div className="mb-4 sm:mb-6 bg-card text-card-foreground rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Privacy Settings</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
              <div>
                <h3 className="font-medium text-sm sm:text-base">Privacy & Security</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Manage your privacy preferences and account security</p>
              </div>
            </div>
            <Link to="/settings/manage-privacy" className="bg-accent text-accent-foreground px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-accent-foreground hover:text-accent transition-colors">
              Manage Privacy
            </Link>
          </div>
        </div>

        {/* Notification Settings Card */}
        <div className="mb-4 sm:mb-6 bg-card text-card-foreground rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Notification Preferences</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
              <div>
                <h3 className="font-medium text-sm sm:text-base">Notifications</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Control how you receive notifications</p>
              </div>
            </div>
            <Link to="/settings/notifications" className="bg-accent text-accent-foreground px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-accent-foreground hover:text-accent transition-colors">
              Manage Notifications
            </Link>
          </div>
        </div>

        {/* Blocked Users Card */}
        <div className="mb-4 sm:mb-6 bg-card text-card-foreground rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Blocked Users</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <UserX className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
              <div>
                <h3 className="font-medium text-sm sm:text-base">Manage Blocked Users</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">View and manage your list of blocked users</p>
              </div>
            </div>
            <Link to="/settings/blocked-users" className="bg-accent text-accent-foreground px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-accent-foreground hover:text-accent transition-colors">
              View Blocked Users
            </Link>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="mb-4 sm:mb-6 bg-card text-card-foreground rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Subscription</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
              <div>
                <h3 className="font-medium text-sm sm:text-base">Manage Subscription</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">View and update your subscription details</p>
              </div>
            </div>
            <Link to="/settings/subscription" className="bg-accent text-accent-foreground px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-accent-foreground hover:text-accent transition-colors">
              Manage Subscription
            </Link>
          </div>
        </div>

        {/* Sign Out Card */}
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-4 sm:p-6">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm transition-colors"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

