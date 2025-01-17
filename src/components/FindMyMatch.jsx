import React, { useState } from 'react';
import { X, Heart, User, Search, ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import { Link } from 'react-router-dom';

const profiles = [
  {
    id: 1,
    name: 'Sarah',
    age: 28,
    bio: 'Adventure seeker and coffee lover',
    distance: 5,
    preferences: ['Slim', 'Strap-on', 'Femme', 'Open'],
    kinks: ['Bondage', 'Role-play'],
    relationshipStatus: 'Single',
    privacyLevel: 'Open',
    roles: ['Switch', 'Exhibitionist'],
    pictures: [
      '/placeholder.svg?height=400&width=300&text=Sarah1',
      '/placeholder.svg?height=400&width=300&text=Sarah2',
      '/placeholder.svg?height=400&width=300&text=Sarah3',
    ]
  },
  {
    id: 2,
    name: 'Mike',
    age: 32,
    bio: 'Fitness enthusiast and dog person',
    distance: 12,
    preferences: ['Tall', 'Voyeurism', 'Stud', 'Discreet'],
    kinks: ['Feet', 'Voyeurism'],
    relationshipStatus: 'It\'s complicated',
    privacyLevel: 'Discreet',
    roles: ['Domme', 'Voyeur'],
    pictures: [
      '/placeholder.svg?height=400&width=300&text=Mike1',
      '/placeholder.svg?height=400&width=300&text=Mike2',
      '/placeholder.svg?height=400&width=300&text=Mike3',
    ]
  },
  {
    id: 3,
    name: 'Emily',
    age: 26,
    bio: 'Bookworm and aspiring chef',
    distance: 8,
    preferences: ['BBW', 'Roleplay', 'Soft Butch', 'Available'],
    kinks: ['FFF Threesomes', 'Exhibitionism'],
    relationshipStatus: 'Open Relationship',
    privacyLevel: 'Open',
    roles: ['Sub', 'Little'],
    pictures: [
      '/placeholder.svg?height=400&width=300&text=Emily1',
      '/placeholder.svg?height=400&width=300&text=Emily2',
      '/placeholder.svg?height=400&width=300&text=Emily3',
    ]
  },
];

const optionCategories = {
  'Body Type': ['Slim', 'Slim Thick', 'Thick', 'BBW', 'Tall', 'Short'],
  'Kinks/Fetishes': ['Strap-on', 'Scissoring/Tribbing', 'Toys', 'Voyeurism', 'Exhibitionism', 'Feet', 'Roleplay', 'FFF Threesomes', 'Bondage'],
  'Body Preferences': ['Piercings', 'Tattoos'],
  'Lifestyle': [],
  'Identity': ['Femme', 'Stud', 'Stem', 'Butch', 'Soft Butch', 'Tomboy'],
  'Privacy Level': ['Open', 'Discreet'],
  'Activity Status': ['Available', 'Away', 'Recently Active (past 24 hrs)'],
  'Roles': ['Domme', 'Sub', 'Switch', 'Mommy', 'Voyeur', 'Little', 'Exhibitionist'],
};

const FindMyMatch = () => {
  const [currentProfile, setCurrentProfile] = useState(0);
  const [expandedLookingFor, setExpandedLookingFor] = useState(false);
  const [expandedAboutMe, setExpandedAboutMe] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const { isDarkMode } = useDarkMode();

  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction} on ${profiles[currentProfile].name}`);
    setCurrentProfile((prev) => (prev + 1) % profiles.length);
  };

  const toggleLookingFor = () => {
    setExpandedLookingFor((prev) => !prev);
    if (expandedAboutMe) setExpandedAboutMe(false);
  };

  const toggleAboutMe = () => {
    setExpandedAboutMe((prev) => !prev);
    if (expandedLookingFor) setExpandedLookingFor(false);
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleOption = (category, option) => {
    setSelectedOptions((prev) => {
      const categoryOptions = prev[category] || [];
      if (categoryOptions.includes(option)) {
        return {
          ...prev,
          [category]: categoryOptions.filter((item) => item !== option),
        };
      } else {
        return {
          ...prev,
          [category]: [...categoryOptions, option],
        };
      }
    });
  };

  const renderOptions = (category) => {
    return (
      <div className="ml-4 space-y-2">
        {optionCategories[category].map((option) => (
          <button
            key={option}
            onClick={() => toggleOption(category, option)}
            className={`text-xs px-2 py-1 rounded transition-colors duration-300 ${
              selectedOptions[category]?.includes(option)
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    const categories = Object.keys(optionCategories);
    return (
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category}>
            <button
              onClick={() => toggleCategory(category)}
              className="flex justify-between items-center w-full text-left font-semibold text-md text-foreground transition-colors duration-300"
            >
              {category}
              {expandedCategories[category] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedCategories[category] && renderOptions(category)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col`}>
      <div className="p-2">
        <div className="mb-2">
          <Link to="/" className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent transition-colors py-1 px-3 rounded text-sm inline-flex items-center">
            <ChevronLeft className="mr-1" size={16} />
            Back
          </Link>
        </div>
        <div className="flex justify-between mb-2">
          <button
            onClick={toggleLookingFor}
            className={`flex-1 py-1 px-3 rounded-l-full transition-colors duration-300 ${
              expandedLookingFor
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <Search className="inline-block mr-1" size={18} />
            Looking For
          </button>
          <button
            onClick={toggleAboutMe}
            className={`flex-1 py-1 px-3 rounded-r-full transition-colors duration-300 ${
              expandedAboutMe
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <User className="inline-block mr-1" size={18} />
            About Me
          </button>
        </div>
        {expandedLookingFor && (
          <div className="p-2">
            <h3 className="font-semibold text-sm mb-1">Looking For:</h3>
            {renderTabContent()}
          </div>
        )}
        {expandedAboutMe && (
          <div className="p-2">
            <h3 className="font-semibold text-sm mb-1">About Me:</h3>
            {renderTabContent()}
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col md:flex-row p-2 gap-2">
        <div className="w-full md:w-2/3">
          <div className="bg-card text-card-foreground transition-colors duration-300 rounded-lg shadow-xl">
            <div className="relative">
              <img
                src={`https://picsum.photos/800/1200?random=${profiles[currentProfile].id}`}
                alt={profiles[currentProfile].name}
                className="w-full h-[28rem] md:h-[36rem] object-cover rounded-t-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 flex justify-between items-end">
                <div>
                  <h2 className="text-white text-2xl md:text-3xl font-bold">{profiles[currentProfile].name}, {profiles[currentProfile].age}</h2>
                  <p className="text-white text-sm">{profiles[currentProfile].distance} miles away</p>
                </div>
                <Link to={`/profile/${profiles[currentProfile].id}`}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white opacity-20 rounded-full filter blur-md"></div>
                    <User className="text-white h-10 w-10 relative z-10" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="p-2">
              <p className="text-sm mb-1">{profiles[currentProfile].bio}</p>
              <div className="flex flex-wrap gap-1">
                {profiles[currentProfile].preferences.map((pref, index) => (
                  <span key={index} className="bg-muted text-muted-foreground text-xs px-1 py-0.5 rounded">{pref}</span>
                ))}
              </div>
            </div>
            <div className="flex justify-center p-4 space-x-4">
              <button
                onClick={() => handleSwipe('left')}
                className="bg-accent text-accent-foreground transition-colors duration-300 p-4 rounded-full hover:bg-accent-foreground hover:text-accent transform hover:scale-110"
              >
                <X size={24} />
              </button>
              <button
                onClick={() => handleSwipe('right')}
                className="bg-primary text-primary-foreground transition-colors duration-300 p-4 rounded-full hover:bg-primary-foreground hover:text-primary transform hover:scale-110"
              >
                <Heart size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindMyMatch;

