import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Calendar, Upload, X, AtSign, Eye } from 'lucide-react';

const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    username: 'janedoe',
    email: 'jane.doe@example.com',
    birthdate: '1990-01-01',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [additionalImages, setAdditionalImages] = useState(Array(5).fill(null));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdditionalImages(prev => {
          const newImages = [...prev];
          newImages[index] = reader.result;
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated profile:', { ...profile, profilePicture, additionalImages });
    // Here you would typically send the updated profile to your backend
  };

  const handlePreview = () => {
    // Navigate to the preview page with the current profile data
    navigate('/preview-profile', { state: { profile, profilePicture, additionalImages } });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/settings" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold">Edit Profile</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="profilePicture" className="block text-sm font-medium">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-24">
                  {profilePicture ? (
                    <img src={profilePicture || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setProfilePicture(null)}
                  className="bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent-foreground hover:text-accent transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                <User className="inline-block w-5 h-5 mr-2" />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-gray-300 bg-background"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                <AtSign className="inline-block w-5 h-5 mr-2" />
                Username
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="w-full p-2 pl-10 rounded-md border border-gray-300 bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                <Mail className="inline-block w-5 h-5 mr-2" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-gray-300 bg-background"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="birthdate" className="block text-sm font-medium">
                <Calendar className="inline-block w-5 h-5 mr-2" />
                Birthdate
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={profile.birthdate}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-gray-300 bg-background"
              />
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Additional Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {additionalImages.map((image, index) => (
              <div key={index} className="relative">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                  {image ? (
                    <img src={image || "/placeholder.svg"} alt={`Additional ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAdditionalImageUpload(e, index)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {image && (
                  <button
                    type="button"
                    onClick={() => setAdditionalImages(prev => {
                      const newImages = [...prev];
                      newImages[index] = null;
                      return newImages;
                    })}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-accent text-accent-foreground py-2 px-4 rounded-md hover:bg-accent-foreground hover:text-accent transition-colors"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handlePreview}
            className="flex items-center justify-center bg-secondary text-secondary-foreground py-2 px-4 rounded-md hover:bg-secondary-foreground hover:text-secondary transition-colors"
          >
            <Eye className="h-5 w-5 mr-2" />
            Preview Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

