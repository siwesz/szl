import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Users, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import PropTypes from 'prop-types';

const posts = [
  { id: 1, username: 'Sarah', content: 'Looking for a fun night out! Anyone interested?', likes: 15, comments: 3 },
  { id: 2, username: 'Mike', content: 'New to the area. Any recommendations for good date spots?', likes: 23, comments: 7 },
  { id: 3, username: 'Emily', content: 'Just updated my profile pics. Check them out!', likes: 45, comments: 12 },
];

const Post = ({ username, content, likes, comments }) => (
  <div className="bg-white rounded-lg shadow p-4 mb-4">
    <div className="font-bold text-lg mb-2 text-pink-600">{username}</div>
    <p className="text-gray-700 mb-4">{content}</p>
    <div className="flex justify-between text-sm text-gray-500">
      <span>{likes} likes</span>
      <span>{comments} comments</span>
    </div>
  </div>
);

Post.propTypes = {
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
};

const QuickNavButton = ({ icon: Icon, label }) => (
  <button className="w-full flex items-center justify-start px-4 py-2 text-pink-600 hover:bg-pink-100 rounded-md transition duration-200">
    <Icon className="h-5 w-5 mr-2" />
    {label}
  </button>
);

QuickNavButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
};

const Home = () => {
  const [isQuickNavOpen, setIsQuickNavOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-grow">
            <button
              onClick={() => setIsQuickNavOpen(!isQuickNavOpen)}
              className="flex items-center text-pink-600 hover:text-pink-800 font-medium"
            >
              Quick Navigation
              {isQuickNavOpen ? <ChevronUp className="ml-2 h-5 w-5" /> : <ChevronDown className="ml-2 h-5 w-5" />}
            </button>
            {isQuickNavOpen && (
              <div className="mt-2 space-y-2">
                <QuickNavButton icon={ShoppingBag} label="Shop" />
                <QuickNavButton icon={Users} label="Groups" />
                <QuickNavButton icon={Heart} label="Communities" />
              </div>
            )}
          </div>
          <Link to="/find-my-match" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
            Find My Match
          </Link>
        </div>

        <div className="mt-8">
          {posts.map(post => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;