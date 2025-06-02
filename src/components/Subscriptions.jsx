import React, { useState } from 'react';
import axios from 'axios';

// Platforms with logo and name
const platforms = [
  { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { name: 'Amazon Prime Video', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png' },
  { name: 'Disney+ Hotstar', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Disney%2B_Hotstar_logo.svg/2560px-Disney%2B_Hotstar_logo.svg.png' },
  { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
  { name: 'ZEE5', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/ZEE5_logo.svg' },
  { name: 'SonyLIV', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/SonyLIV_Logo.png' },
  { name: 'YouTube Premium', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Premium_logo.svg' },
  { name: 'Apple TV+', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_TV_Plus_Logo.svg' }
];

const Subscriptions = ({ token }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleFetch = async (e) => {
    e.preventDefault();
    setError('');
    setSubscriptionDetails(null);

    try {
      const response = await axios.post('${import.meta.env.VITE_URL}/api/subscriptions/fetchByPlatform', {
        platform: selectedPlatform,
        phone,
        email
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSubscriptionDetails(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch subscription.');
    }
  };

  return (
    <div className="mt-10 p-4 bg-gray-50 rounded shadow-md relative">
      <h2 className="text-xl font-semibold mb-4">Fetch Subscription Details</h2>

      {/* Custom Dropdown */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Select Platform:</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex justify-between items-center p-2 border rounded bg-white"
          >
            {selectedPlatform ? (
              <div className="flex items-center gap-2">
                <img
                  src={platforms.find((p) => p.name === selectedPlatform)?.logo}
                  alt={selectedPlatform}
                  className="h-4 w-4"
                />
                <span>{selectedPlatform}</span>
              </div>
            ) : (
              <span className="text-gray-400">-- Select Platform --</span>
            )}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Items */}
          {dropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto">
              {platforms.map((platform) => (
                <button
                  key={platform.name}
                  type="button"
                  onClick={() => {
                    setSelectedPlatform(platform.name);
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 w-full p-2 hover:bg-gray-100"
                >
                  <img src={platform.logo} alt={platform.name} className="h-6 w-6" />
                  <span>{platform.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Input Form */}
      {selectedPlatform && (
        <form onSubmit={handleFetch} className="space-y-4">
          <input
            type="text"
            placeholder="Registered Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Registered Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Fetch Subscription
          </button>
        </form>
      )}

      {/* Error */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Subscription Details */}
      {subscriptionDetails && (
        <div className="mt-6 p-4 border rounded bg-white">
          <h4 className="font-bold text-lg">{selectedPlatform} Subscription Details</h4>
          <p><strong>Start Date:</strong> {subscriptionDetails.startDate}</p>
          <p><strong>End Date:</strong> {subscriptionDetails.endDate}</p>
          <p><strong>Plan:</strong> {subscriptionDetails.plan}</p>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
