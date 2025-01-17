import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Heart, Lock, Unlock, ChevronLeft } from 'lucide-react';

const UserProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate profile fetching
    const fetchProfile = async () => {
      try {
        // Mock profile data
        const mockProfile = {
          name: 'Sample User',
          age: 28,
          distance: 5,
          pictures: ['/placeholder.svg'],
          bio: 'A sample user profile'
        };
        
        setProfile(mockProfile);
        setLoading(false);
      } catch (err) {
        setError('Error fetching profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-4">
        <Link to="/find-my-match" className="text-primary hover:text-primary/90">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold ml-4">{profile.name}</h1>
      </div>
      <div className="flex flex-col items-center">
        <img src={profile.pictures[0]} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
        <p className="text-lg">{profile.bio}</p>
        <p className="text-sm text-gray-500">Age: {profile.age}</p>
        <p className="text-sm text-gray-500">Distance: {profile.distance} miles away</p>
      </div>
      <div className="mt-4">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

