import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar, Heart, Zap } from 'lucide-react';

const PreviewProfile = () => {
  const location = useLocation();
  const { profile, profilePicture, additionalImages } = location.state || {};

  // Mocked data from IntroQuiz (you would typically fetch this from your backend)
  const quizData = {
    seeking: 'Regular hookup',
    identity: 'Creative',
    smokingHabit: 'Non-smoker',
    bodyType: 'Slim Thick',
    kinksAndFetishes: ['Strap-on', 'Toys', 'Roleplay'],
    bodyPreferences: ['Tattoos'],
    pronouns: 'She/Her',
    privacyLevel: 'Open',
    roles: ['Switch', 'Exhibitionist'],
    boundaries: ['Feet', 'Bondage']
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/settings/edit-profile" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold">Preview Profile</h1>
      </div>

      <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-24 h-24">
            {profilePicture ? (
              <img src={profilePicture || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground">@{profile.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="flex items-center"><Mail className="w-5 h-5 mr-2" /> {profile.email}</p>
            <p className="flex items-center"><Calendar className="w-5 h-5 mr-2" /> {profile.birthdate}</p>
          </div>
          <div>
            <p className="flex items-center"><Heart className="w-5 h-5 mr-2" /> Seeking: {quizData.seeking}</p>
            <p className="flex items-center"><Zap className="w-5 h-5 mr-2" /> Identity: {quizData.identity}</p>
            <p>Smoking Habit: {quizData.smokingHabit}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Body Type</h3>
            <p>{quizData.bodyType}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Kinks & Fetishes</h3>
            <p>{quizData.kinksAndFetishes.join(', ')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Body Preferences</h3>
            <p>{quizData.bodyPreferences.join(', ')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Pronouns</h3>
            <p>{quizData.pronouns}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Privacy Level</h3>
            <p>{quizData.privacyLevel}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Roles</h3>
            <p>{quizData.roles.join(', ')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Boundaries</h3>
            <p>{quizData.boundaries.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Additional Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {additionalImages.map((image, index) => (
            image && (
              <div key={index} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                <img src={image || "/placeholder.svg"} alt={`Additional ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewProfile;

