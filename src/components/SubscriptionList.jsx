// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaBell } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const SubscriptionList = ({ userId, token }) => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Function to fetch subscriptions
//   const fetchSubscriptions = async () => {
//     if (!userId || !token) {
//       setError('User ID or token not found');
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');
//       const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/subscriptions/get/${userId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         }
//       });
//       setSubscriptions(data);
//     } catch (err) {
//       console.error('Error fetching subscriptions', err);
//       setError(err.response?.data?.message || 'Failed to fetch subscriptions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to delete a subscription
//   const handleDelete = async (id) => {
//     try {
//       setError('');
//       await axios.delete(`${import.meta.env.VITE_URL}/api/subscriptions/${id}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         }
//       });
//       await fetchSubscriptions(); // Re-fetch subscriptions after deletion
//     } catch (err) {
//       console.error('Error deleting subscription', err);
//       setError(err.response?.data?.message || 'Failed to delete subscription');
//     }
//   };

//   useEffect(() => {
//     fetchSubscriptions();
//   }, [userId, token]);

//   if (loading) {
//     return <div className="text-center">Loading subscriptions...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500 text-center">{error}</div>;
//   }

//   if (subscriptions.length === 0) {
//     return <div className="text-center text-gray-500">No subscriptions found</div>;
//   }

//   return (
//     <div>
//       <h3 className="text-xl mb-4">Your Subscriptions</h3>
//       <ul className="space-y-4">
//         {subscriptions.map((subscription) => (
//           <li key={subscription._id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
//             <div>
//               <div className="text-gray-600">
//                 Name: {subscription.name} |
//                 Cost: ${subscription.cost.toFixed(2)} | 
//                 Renewal Date: {new Date(subscription.renewalDate).toLocaleDateString()}
//               </div>
//             </div>
//             <div className="flex space-x-4 items-center">
//               {/* Notification Bell Icon */}
//               <Link to={`/notifications/${subscription._id}`} className="text-blue-500 hover:text-blue-700">
//                 <FaBell title="Set Notification" />
//               </Link>

//               {/* Delete Button */}
//               <button 
//                 onClick={() => handleDelete(subscription._id)} 
//                 className="text-red-500 hover:text-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SubscriptionList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SubscriptionList = ({ userId, token }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to fetch subscriptions
  const fetchSubscriptions = async () => {
    if (!userId || !token) {
      setError('User ID or token not found');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/subscriptions/get/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setSubscriptions(data);
    } catch (err) {
      console.error('Error fetching subscriptions', err);
      setError(err.response?.data?.message || 'Failed to fetch subscriptions');
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a subscription
  const handleDelete = async (id) => {
    try {
      setError('');
      await axios.delete(`${import.meta.env.VITE_URL}/api/subscriptions/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      await fetchSubscriptions(); // Re-fetch subscriptions after deletion
    } catch (err) {
      console.error('Error deleting subscription', err);
      setError(err.response?.data?.message || 'Failed to delete subscription');
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [userId, token]);

  if (loading) {
    return <div className="text-center">Loading subscriptions...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (subscriptions.length === 0) {
    return <div className="text-center text-gray-500">No subscriptions found</div>;
  }

  return (
    <div className='mt-15'>
      <h3 className="text-xl mb-4">Your Subscriptions</h3>
      <ul className="space-y-4">
        {subscriptions.map((subscription) => (
          <li key={subscription._id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow border border-black">
            <div>
              <div className="text-gray-600">
                Name: {subscription.name} |
                Cost: ${subscription.cost.toFixed(2)} | 
                Renewal Date: {new Date(subscription.renewalDate).toLocaleDateString()}
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              {/* Notification Bell Icon */}
              <Link to={`/notifications/${subscription._id}`} className="text-blue-500 hover:text-blue-700">
                <FaBell title="Set Notification" />
              </Link>

              {/* Delete Button */}
              <button 
                onClick={() => handleDelete(subscription._id)} 
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionList;

