import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Send, Users, ArrowLeft } from 'lucide-react';

const mockChats = [
  { id: 1, name: 'Sarah', lastMessage: 'Hey, how are you?', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 2, name: 'Mike', lastMessage: 'Did you see the latest movie?', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 3, name: 'Emily', lastMessage: 'Let\'s meet up this weekend!', avatar: '/placeholder.svg?height=40&width=40' },
];

const mockMessages = [
  { id: 1, senderId: 1, content: 'Hey, how are you?', timestamp: '10:30 AM' },
  { id: 2, senderId: 2, content: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
  { id: 3, senderId: 1, content: 'Doing great! Any plans for the weekend?', timestamp: '10:35 AM' },
];

const Chat = ({ onChatSelect }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(scrollToBottom, [mockMessages]);

  React.useEffect(() => {
    onChatSelect(selectedChat !== null);
  }, [selectedChat, onChatSelect]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setIsLoading(true);
      // Simulate sending a message
      setTimeout(() => {
        console.log('Sending message:', message);
        setMessage('');
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {!selectedChat ? (
        <>
          <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Chats</h1>
            <button className="text-primary-foreground hover:text-accent-foreground transition-colors flex items-center">
              <Users size={24} className="mr-2" />
              <span>Create Group</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center p-4 border-b cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedChat(chat)}
              >
                <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h2 className="font-semibold">{chat.name}</h2>
                  <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="bg-primary text-primary-foreground p-4 flex items-center">
            <button onClick={() => setSelectedChat(null)} className="mr-4">
              <ArrowLeft size={24} />
            </button>
            <img src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} className="w-10 h-10 rounded-full mr-4" />
            <h2 className="font-semibold flex-1">{selectedChat.name}</h2>
            <Link to={`/profile/${selectedChat.id}`} className="text-primary-foreground hover:text-accent-foreground transition-colors">
              <User size={24} />
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {mockMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === 1 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[70%] p-3 rounded-lg ${msg.senderId === 1 ? 'bg-muted' : 'bg-accent text-accent-foreground'}`}>
                    <p>{msg.content}</p>
                    <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="bg-background p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-l-md border border-input bg-background"
              />
              <button type="submit" className="bg-accent text-accent-foreground p-2 rounded-r-md" disabled={isLoading}>
                {isLoading ? (
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <Send size={18} className="sm:size-20" />
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;

