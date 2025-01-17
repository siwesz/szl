import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Globe, Lock } from 'lucide-react';

const ManagePrivacy = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowMessagesFrom: 'everyone',
    showLastSeen: true,
  });

  const handleToggle = (setting) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleRadioChange = (setting, value) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/settings" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold">Manage Privacy</h1>
      </div>
      
      <div className="space-y-6">
        <div className="bg-card text-card-foreground rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Profile Visibility</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="profileVisibility"
                value="public"
                checked={privacySettings.profileVisibility === 'public'}
                onChange={() => handleRadioChange('profileVisibility', 'public')}
                className="mr-2"
              />
              <Globe className="w-5 h-5 mr-2" />
              Public
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="profileVisibility"
                value="private"
                checked={privacySettings.profileVisibility === 'private'}
                onChange={() => handleRadioChange('profileVisibility', 'private')}
                className="mr-2"
              />
              <Lock className="w-5 h-5 mr-2" />
              Private
            </label>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Online Status</h2>
          <label className="flex items-center justify-between">
            <span className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Show when I'm online
            </span>
            <input
              type="checkbox"
              checked={privacySettings.showOnlineStatus}
              onChange={() => handleToggle('showOnlineStatus')}
              className="toggle"
            />
          </label>
        </div>

        <div className="bg-card text-card-foreground rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Messaging</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="allowMessagesFrom"
                value="everyone"
                checked={privacySettings.allowMessagesFrom === 'everyone'}
                onChange={() => handleRadioChange('allowMessagesFrom', 'everyone')}
                className="mr-2"
              />
              Everyone
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="allowMessagesFrom"
                value="matches"
                checked={privacySettings.allowMessagesFrom === 'matches'}
                onChange={() => handleRadioChange('allowMessagesFrom', 'matches')}
                className="mr-2"
              />
              Matches Only
            </label>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Last Seen</h2>
          <label className="flex items-center justify-between">
            <span className="flex items-center">
              <EyeOff className="w-5 h-5 mr-2" />
              Show my last seen
            </span>
            <input
              type="checkbox"
              checked={privacySettings.showLastSeen}
              onChange={() => handleToggle('showLastSeen')}
              className="toggle"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ManagePrivacy;

