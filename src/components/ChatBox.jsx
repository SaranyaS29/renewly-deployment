
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatBox = ({ onClose, userId, token }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '👋 Hi! Ask me about your renewal dates!' }
  ]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/api/subscriptions/get/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubscriptions(res.data);
      } catch (error) {
        console.error('Error fetching subscriptions', error);
      }
    };
    fetchSubscriptions();
  }, [userId, token]);

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage('user', input);
    handleBotResponse(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSend();
    }
  };

  const handleBotResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    const today = new Date();

    if (
  lowerQuery.includes('next renewal') ||
  lowerQuery.includes('upcoming') ||
  lowerQuery.includes('nearest') ||
  lowerQuery.includes('when is my next') ||
  lowerQuery.includes('soonest') ||
  (lowerQuery.includes('renewal') && lowerQuery.includes('next'))
) {
  const todayOnly = new Date(new Date().toDateString());
  const upcoming = subscriptions
    .filter(sub => new Date(sub.renewalDate) >= todayOnly)
    .sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate))[0];

  if (upcoming) {
    addMessage(
      'bot',
      `📅 Your next renewal is **${upcoming.name}** on **${new Date(upcoming.renewalDate).toDateString()}**.`
    );
  } else {
    addMessage('bot', '✅ You have no upcoming renewals.');
  }
} else if (lowerQuery.includes('how many') || lowerQuery.includes('count')) {
      const monthMatch = lowerQuery.match(/(?:in|for)?\s*(january|february|march|april|may|june|july|august|september|october|november|december)/i);
      if (monthMatch) {
        const month = new Date(`${monthMatch[1]} 1, ${new Date().getFullYear()}`).getMonth();
        const count = subscriptions.filter(sub => new Date(sub.renewalDate).getMonth() === month).length;
        addMessage('bot', `📊 You have **${count}** renewal(s) in **${monthMatch[1]}**.`);
      } else {
        addMessage('bot', "❓ Please specify a month like 'May' or 'August' to check renewal count.");
      }

    } else if (lowerQuery.includes('what') && lowerQuery.includes('subscriptions')) {
      const monthMatch = lowerQuery.match(/(?:in|for)?\s*(january|february|march|april|may|june|july|august|september|october|november|december)/i);
      if (monthMatch) {
        const month = new Date(`${monthMatch[1]} 1, ${new Date().getFullYear()}`).getMonth();
        const filtered = subscriptions.filter(sub => new Date(sub.renewalDate).getMonth() === month);
        if (filtered.length > 0) {
          const names = filtered.map(sub => `• ${sub.name} (${new Date(sub.renewalDate).toDateString()})`).join('\n');
          addMessage('bot', `📋 Subscriptions in **${monthMatch[1]}**:\n${names}`);
        } else {
          addMessage('bot', `📭 No subscriptions found in **${monthMatch[1]}**.`);
        }
      } else {
        addMessage('bot', "📅 Try asking: 'What are the subscriptions in May?'");
      }

    } else {
      addMessage('bot', "🤖 Sorry, I didn't understand. Try asking:\n- 'When is my next renewal?'\n- 'What are the subscriptions in June?'\n- 'How many renewals are there in May?'");
    }
  };

  return (
    <div className="fixed bottom-20 right-5 w-80 bg-white shadow-lg rounded-xl border border-gray-300 z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-blue-600 text-white rounded-t-xl">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <button onClick={onClose} className="text-white font-bold text-xl">&times;</button>
      </div>

      {/* Messages */}
      <div className="p-4 h-64 overflow-y-auto text-sm text-gray-800 flex flex-col gap-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded-md whitespace-pre-line ${msg.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-2 border-t flex bg-yellow-50">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow p-2 border rounded focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
