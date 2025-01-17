import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PlusCircle, Search, MessageCircle, Bell, Sun, Moon, ChevronUp, ChevronDown, User, Users, SettingsIcon, ShoppingBag, Heart, LogOut, ThumbsUp, Send } from 'lucide-react';
import Settings from './components/Settings';
import FindMyMatch from './components/FindMyMatch';
import Shop from './components/Shop';
import Wishlist from './components/Wishlist';
import Checkout from './components/Checkout';
import { useDarkMode } from './hooks/useDarkMode';
import './index.css';
import UserProfile from './components/UserProfile';
import IntroQuiz from './components/IntroQuiz';
import Verification from './components/Verification';
import SignUp from './signup';
import SignIn from './signin';
import ThankYou from './components/ThankYou';
import Chat from './components/Chat';
import BlockedUsers from './components/BlockedUsers';
import Subscription from './components/Subscription';
import EditProfile from './components/EditProfile';
import ManagePrivacy from './components/ManagePrivacy';
import NotificationSettings from './components/NotificationSettings';
import PreviewProfile from './components/PreviewProfile';

const posts = [
  {
    id: 1, 
    username: 'Sarah', 
    avatar: '/placeholder.svg?height=40&width=40', 
    content: 'Looking for a fun night out! Anyone interested?', 
    likes: 15, 
    comments: [
      { id: 1, username: 'Mike', avatar: '/placeholder.svg?height=30&width=30', content: 'I\'m in! Where are you thinking?' },
      { id: 2, username: 'Emily', avatar: '/placeholder.svg?height=30&width=30', content: 'Sounds fun! Keep me posted.' }
    ]
  },
  { 
    id: 2, 
    username: 'Mike', 
    avatar: '/placeholder.svg?height=40&width=40', 
    content: 'New to the area. Any recommendations for good date spots?', 
    likes: 23, 
    comments: [
      { id: 3, username: 'Sarah', avatar: '/placeholder.svg?height=30&width=30', content: 'The rooftop bar downtown is amazing!' }
    ]
  },
  { 
    id: 3, 
    username: 'Emily', 
    avatar: '/placeholder.svg?height=40&width=40', 
    content: 'Just updated my profile pics. Check them out!', 
    likes: 45, 
    comments: []
  },
];

const Post = ({ id, username, avatar, content, likes, comments }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [localLikes, setLocalLikes] = useState(likes);

  const handleLike = () => setLocalLikes(prevLikes => prevLikes + 1);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    console.log(`New comment on post ${id}: ${newComment}`);
    setNewComment('');
  };

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <img src={avatar || "/placeholder.svg"} alt={username} className="w-10 h-10 rounded-full mr-2" />
        <div className="font-bold text-lg text-accent">{username}</div>
      </div>
      <p className="mb-4">{content}</p>
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <button onClick={handleLike} className="flex items-center">
          <ThumbsUp className="h-5 w-5 mr-1" />
          {localLikes} likes
        </button>
        <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-1" />
          {comments.length} comments
        </button>
      </div>
      {isExpanded && (
        <div className="mt-4">
          {comments.map(comment => (
            <div key={comment.id} className="flex items-start mb-2">
              <img src={comment.avatar || "/placeholder.svg"} alt={comment.username} className="w-8 h-8 rounded-full mr-2" />
              <div className="bg-muted p-2 rounded-lg flex-grow">
                <div className="font-semibold text-sm">{comment.username}</div>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
          <form onSubmit={handleSubmitComment} className="mt-2 flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-grow p-2 rounded-l-lg bg-muted text-muted-foreground"
            />
            <button type="submit" className="bg-accent text-accent-foreground p-2 rounded-r-lg">
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
};

const shouldShowNavigation = (path, isIndividualChatOpen) => {
  const excludedPaths = ['/signup', '/signin', '/intro-quiz', '/verification'];
  return !excludedPaths.includes(path) && !isIndividualChatOpen;
};

const Navigation = () => {
  const [isCollapsibleMenuOpen, setIsCollapsibleMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCollapsibleMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-foreground hover:text-accent-foreground transition-colors">
                SCISSORLY
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/" className="text-primary-foreground hover:text-accent-foreground transition-colors px-3 py-2 rounded-md text-sm font-medium">
              <Search className="h-5 w-5" />
              <span className="sr-only">Discover</span>
            </Link>
            <Link to="/chat" className="text-primary-foreground hover:text-accent-foreground transition-colors px-3 py-2 rounded-md text-sm font-medium">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Chats</span>
            </Link>
            <Link to="/" className="text-primary-foreground hover:text-accent-foreground transition-colors px-3 py-2 rounded-md text-sm font-medium">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Link>
            <button onClick={useDarkMode().toggleDarkMode} className="p-2 rounded-full bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Toggle dark mode">
              {useDarkMode().isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsCollapsibleMenuOpen(!isCollapsibleMenuOpen)} className="text-primary-foreground hover:text-accent-foreground transition-colors px-3 py-2 rounded-md text-sm font-medium">
                {isCollapsibleMenuOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {isCollapsibleMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1 z-10">
                  <Link to="/settings/edit-profile" className="flex items-center px-4 py-2 text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <Link to="/find-my-match" className="flex items-center px-4 py-2 text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                    <Users className="h-5 w-5 mr-2" />
                    Find My Match
                  </Link>
                  <Link to="/" className="flex items-center px-4 py-2 text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                    <Search className="h-5 w-5 mr-2" />
                    Explore
                  </Link>
                  <Link to="/settings" className="flex items-center px-4 py-2 text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                    <SettingsIcon className="h-5 w-5 mr-2" />
                    Settings
                  </Link>
                  <Link to="/signin" className="flex items-center px-4 py-2 text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  const [selectedFeedOptions, setSelectedFeedOptions] = useState([]);
  const [showFeedOptions, setShowFeedOptions] = useState(false);

  const feedOptions = [
    'Strap-on', 'Scissoring/Tribbing', 'Toys', 'Voyeurism', 'Exhibitionism', 'Feet', 'Roleplay', 'FFF Threesomes', 'Bondage',
    'Thoughts', 'Mood', 'Travel'
  ];

  const toggleFeedOption = (option) => {
    setSelectedFeedOptions(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="relative">
          <button
            onClick={() => setShowFeedOptions(!showFeedOptions)}
            className="text-accent-foreground hover:text-accent transition-colors flex items-center"
          >
            Feed Options <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {showFeedOptions && (
            <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {feedOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleFeedOption(option)}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left ${
                      selectedFeedOptions.includes(option) ? 'bg-gray-100' : ''
                    }`}
                    role="menuitem"
                  >
                    {option}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedFeedOptions([])}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  role="menuitem"
                >
                  All
                </button>
              </div>
            </div>
          )}
        </div>
        <button className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent transition-colors p-2 rounded-full">
          <PlusCircle className="h-6 w-6" />
        </button>
      </div>
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
};

const App = () => {
  const { isDarkMode } = useDarkMode();
  const location = useLocation();
  const [isIndividualChatOpen, setIsIndividualChatOpen] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-background text-foreground transition-colors`}>
      {shouldShowNavigation(location.pathname, isIndividualChatOpen) && <Navigation />}

      <main className={`${isIndividualChatOpen ? 'h-screen' : 'max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8'}`}>
        {location.pathname === '/' && !isIndividualChatOpen && (
          <div className="mb-4 flex items-center">
            <Link to="/find-my-match" className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent transition-colors px-4 py-2 rounded-md">
              Find My Match
            </Link>
          </div>
        )}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/intro-quiz" element={<IntroQuiz />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/" element={<Home />} />
          <Route path="/find-my-match" element={<FindMyMatch />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/chat" element={<Chat onChatSelect={setIsIndividualChatOpen} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/blocked-users" element={<BlockedUsers />} />
          <Route path="/settings/subscription" element={<Subscription />} />
          <Route path="/settings/edit-profile" element={<EditProfile />} />
          <Route path="/settings/manage-privacy" element={<ManagePrivacy />} />
          <Route path="/settings/notifications" element={<NotificationSettings />} />
          <Route path="/preview-profile" element={<PreviewProfile />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

