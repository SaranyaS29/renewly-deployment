
import React, { useState, useEffect,useRef } from 'react';

import SubscriptionForm from '../components/SubscriptionForm';
import SubscriptionList from '../components/SubscriptionList';
import CalendarView from '../components/CalenderView';
import ChatBox from '../components/ChatBox';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('name');
  const [activeView, setActiveView] = useState('form');
  const [subscriptionsChanged, setSubscriptionsChanged] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatIconRef = useRef(null);
const [position, setPosition] = useState({ x: 20, y: 20 });
const [dragging, setDragging] = useState(false);
const [rel, setRel] = useState({ x: 0, y: 0 });

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
  const handleMouseDown = (e) => {
  if (chatIconRef.current) {
    const rect = chatIconRef.current.getBoundingClientRect();
    setDragging(true);
    setRel({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  }
};

const handleMouseMove = (e) => {
  if (dragging) {
    setPosition({
      x: e.clientX - rel.x,
      y: e.clientY - rel.y
    });
    e.preventDefault();
  }
};

const handleMouseUp = () => {
  setDragging(false);
};



  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);
  useEffect(() => {
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
});

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between ">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-3 md:mb-0">
            Welcome {userName}
          </h1>
        </div>
        <ul className="flex flex-col md:flex-row gap-6 text-lg text-gray-800">
          <li>
            <button
              onClick={() => setActiveView('form')}
              className="hover:text-blue-600 transition duration-150"
            >
              ➕ Add Subscription
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveView('list')}
              className="hover:text-blue-600 transition duration-150"
            >
              📃 Subscription List
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveView('calendar')}
              className="hover:text-blue-600 transition duration-150"
            >
              📅 Calendar View
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              style={{ marginTop: '-20%' }}
              className="bg-red-500  text-white px-3  py-1 rounded-md hover:bg-red-600 transition duration-150"
            >
              🔒 Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {activeView === 'form' && (
          <SubscriptionForm
            token={token}
            onAddSubscription={() => setSubscriptionsChanged(!subscriptionsChanged)}
          />
        )}
        {activeView === 'list' && (
          <SubscriptionList userId={userId} token={token} />
        )}
        {activeView === 'calendar' && (
          <CalendarView userId={userId} token={token} />
        )}
      </main>
    <div
  ref={chatIconRef}
  onMouseDown={handleMouseDown}
  style={{
    position: 'fixed',
    left: position.x,
    top: position.y,
    cursor: 'grab',
    zIndex: 50
  }}
>
  <button
    onClick={() => setIsChatOpen(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
  >
    💬
  </button>
</div>
{isChatOpen && (
  <div className="fixed bottom-20 right-5 w-80 bg-white shadow-lg rounded-xl border border-gray-300 z-50 flex flex-col">
    <ChatBox userId={userId} token={token} isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
  </div>
)}

</div>
  );
};

export default Dashboard;
