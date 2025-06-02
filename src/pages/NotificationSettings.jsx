// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const NotificationSettings = () => {
//   const { id } = useParams(); 
//   const [daysBefore, setDaysBefore] = useState(3);
//   const [renewalDate, setRenewalDate] = useState('');
//   const [platform, setPlatform] = useState('');
//   const [payment, setPayment] = useState(''); 
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false); 

//   useEffect(() => {
//     console.log("ID from route params:", id);
//     const fetchNotification = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_URL}/api/notifications/getNotif/${id}`);
//         console.log("Fetched notification data:", res.data);
//         console.log("Fetched renewal date:", res.data.renewalDate);

//         const data = res.data || {};

// //         let fetchedPlatform = data.platform ?? '';
// //         let fetchedPayment = data.payment ?? ''; 
// //         console.log("fetchedRenewalDate:", fetchedRenewalDate);

    
// //         if (!fetchedRenewalDate || !fetchedPlatform || !fetchedPayment) {
// //           const subRes = await axios.get(`${import.meta.env.VITE_URL}/api/subscriptionById/${id}`);
// //           console.log("Fetched subscription data:", subRes.data);
// //           fetchedRenewalDate = subRes.data?.renewalDate ?? '';
// //           fetchedPlatform = subRes.data?.name ?? '';
// //           fetchedPayment = subRes.data?.cost ?? ''; 
// //         }

// //         setDaysBefore(data.daysBefore ?? 3);
// //         setPhone(data.phone ?? '');
// //         setEmail(data.email ?? '');
// // setRenewalDate(fetchedRenewalDate); // Set renewal date value
// //         setPlatform(fetchedPlatform);
// //         setPayment(fetchedPayment); // Set payment value
       
// let fetchedRenewalDate = data.renewalDate ?? '';
// let fetchedPlatform = data.platform ?? '';
// let fetchedPayment = data.payment ?? ''; 

// if (!fetchedRenewalDate || !fetchedPlatform || !fetchedPayment) {
//   const subRes = await axios.get(`${import.meta.env.VITE_URL}/api/subscriptionById/${id}`);
//   console.log("Fetched subscription data:", subRes.data);
//   fetchedRenewalDate = subRes.data?.renewalDate ?? '';
//   fetchedPlatform = subRes.data?.name ?? '';
//   fetchedPayment = subRes.data?.cost ?? ''; 
// }

// // ✅ Safely format the date
// let formattedRenewalDate = '';
// if (fetchedRenewalDate) {
//   const dateObj = new Date(fetchedRenewalDate);
//   if (!isNaN(dateObj.getTime())) {
//     formattedRenewalDate = dateObj.toISOString().split("T")[0];
//   } else {
//     console.warn("Invalid renewalDate format:", fetchedRenewalDate);
//   }
// }

// setDaysBefore(data.daysBefore ?? 3);
// setPhone(data.phone ?? '');
// setEmail(data.email ?? '');
// setRenewalDate(formattedRenewalDate);
// setPlatform(fetchedPlatform);
// setPayment(fetchedPayment);

//       } catch (err) {
//         console.log('Error fetching notification or subscription:', err);
//       }
//     };

//     fetchNotification();
//   }, [id]);

//   const handleSave = async () => {
//     if (!renewalDate || !email || !phone || !platform || !payment) {
//       setMessage("Please fill all required fields");
//       return;
//     }

//     setIsLoading(true); // Start loading

//     try {
//       await axios.post(`${import.meta.env.VITE_URL}/api/notifications/setNotif/${id}`, {
//         renewalDate,
//         daysBefore,
//         phone,
//         email,
//         platform,
//         payment, 
//       });
//       setMessage('Notification preferences saved!');
//       setTimeout(() => setMessage(''), 3000);
//     } catch (err) {
//       console.error(err);
//       setMessage('Error saving preferences');
//     } finally {
//       setIsLoading(false); 
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-2xl mb-4">Set Notification</h2>

//       <label className="block mb-2">Renewal Date:</label>
//       <input 
//         type="date" 
//         value={renewalDate} 
  
//         onChange={(e) => setRenewalDate(e.target.value)} 
//         className="w-full border p-2 mb-4"
//       />

//       <label className="block mb-2">Platform:</label>
//       <input 
//         type="text" 
//         value={platform} 
//         onChange={(e) => setPlatform(e.target.value)} 
//         className="w-full border p-2 mb-4"
//       />

//       <label className="block mb-2">Payment:</label>
//       <input 
//         type="text" 
//         value={payment} 
//         onChange={(e) => setPayment(e.target.value)} 
//         className="w-full border p-2 mb-4"
//       />

//       <label className="block mb-2">Remind me before (days):</label>
//       <input 
//         type="number" 
//         value={daysBefore} 
//         onChange={(e) => setDaysBefore(Number(e.target.value))} 
//         className="w-full border p-2 mb-4"
//       />

//       <label className="block mb-2">Phone Number (for SMS):</label>
//       <input 
//         type="tel" 
//         value={phone} 
//         onChange={(e) => setPhone(e.target.value)} 
//         className="w-full border p-2 mb-4"
//       />

//       <label className="block mb-2">Email (for notifications):</label>
//       <input 
//         type="email" 
//         value={email} 
//         onChange={(e) => setEmail(e.target.value)} 
//         className="w-full border p-2 mb-4"
//       />

//       <button 
//         onClick={handleSave} 
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         disabled={isLoading} 
//       >
//         {isLoading ? 'Saving...' : 'Save'}
//       </button>

//       {isLoading && <p className="mt-4 text-gray-500">Saving your preferences, please wait...</p>} {/* Loading message */}

//       {message && <p className="mt-4 text-green-600">{message}</p>}
//     </div>
//   );
// };

// export default NotificationSettings;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NotificationSettings = () => {
  const { id } = useParams(); 
  const [daysBefore, setDaysBefore] = useState(3);
  const [renewalDate, setRenewalDate] = useState('');
  const [platform, setPlatform] = useState('');
  const [payment, setPayment] = useState(''); 
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/api/notifications/getNotif/${id}`);
        const data = res.data || {};
        
        let fetchedRenewalDate = data.renewalDate ?? '';
        let fetchedPlatform = data.platform ?? '';
        let fetchedPayment = data.payment ?? ''; 

        // Fallback to subscription data if missing
        if (!fetchedRenewalDate || !fetchedPlatform || !fetchedPayment) {
          const subRes = await axios.get(`${import.meta.env.VITE_URL}/api/subscriptionById/${id}`);
          fetchedRenewalDate = subRes.data?.renewalDate ?? '';
          fetchedPlatform = subRes.data?.name ?? '';
          fetchedPayment = subRes.data?.cost ?? ''; 
        }

        // ✅ Format renewal date properly
        // let formattedRenewalDate = '';
        // if (fetchedRenewalDate) {
        //   const parsedDate = new Date(fetchedRenewalDate);
        //   if (!isNaN(parsedDate.getTime())) {
        //     formattedRenewalDate = parsedDate.toISOString().split("T")[0];
        //   } else {
        //     console.warn("Invalid renewalDate format:", fetchedRenewalDate);
        //   }
        // }
       let formattedRenewalDate = '';

if (fetchedRenewalDate) {
  const isoFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  const dmyFormatRegex = /^\d{2}-\d{2}-\d{4}$/;

  if (isoFormatRegex.test(fetchedRenewalDate)) {
    // Already in ISO format
    formattedRenewalDate = fetchedRenewalDate;
  } else if (dmyFormatRegex.test(fetchedRenewalDate)) {
    // Convert DD-MM-YYYY to ISO (YYYY-MM-DD)
    const [day, month, year] = fetchedRenewalDate.split("-");
    formattedRenewalDate = `${year}-${month}-${day}`;
  } else {
    const parsedDate = new Date(fetchedRenewalDate);
    if (!isNaN(parsedDate.getTime())) {
      formattedRenewalDate = parsedDate.toISOString().split("T")[0];
    } else {
      console.warn("Invalid renewalDate format:", fetchedRenewalDate);
    }
  }
}



        setDaysBefore(data.daysBefore ?? 3);
        setPhone(data.phone ?? '');
        setEmail(data.email ?? '');
        setRenewalDate(formattedRenewalDate);
        setPlatform(fetchedPlatform);
        setPayment(fetchedPayment);

      } catch (err) {
        console.error('Error fetching notification or subscription:', err);
      }
    };

    fetchNotification();
  }, [id]);

  const handleSave = async () => {
    if (!renewalDate || !email || !phone || !platform || !payment) {
      setMessage("Please fill all required fields");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_URL}/api/notifications/setNotif/${id}`, {
        renewalDate,
        daysBefore,
        phone,
        email,
        platform,
        payment, 
      });
      setMessage('Notification preferences saved!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Error saving preferences');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Set Notification</h2>

      <label className="block mb-2">Renewal Date:</label>
      <input 
        type="date" 
        value={renewalDate} 
        onChange={(e) => setRenewalDate(e.target.value)} 
        className="w-full border p-2 mb-4"
      />

      <label className="block mb-2">Platform:</label>
      <input 
        type="text" 
        value={platform} 
        onChange={(e) => setPlatform(e.target.value)} 
        className="w-full border p-2 mb-4"
      />

      <label className="block mb-2">Payment:</label>
      <input 
        type="text" 
        value={payment} 
        onChange={(e) => setPayment(e.target.value)} 
        className="w-full border p-2 mb-4"
      />

      <label className="block mb-2">Remind me before (days):</label>
      <input 
        type="number" 
        value={daysBefore} 
        onChange={(e) => setDaysBefore(Number(e.target.value))} 
        className="w-full border p-2 mb-4"
      />

      <label className="block mb-2">Phone Number (for SMS):</label>
      <input 
        type="tel" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        className="w-full border p-2 mb-4"
      />

      <label className="block mb-2">Email (for notifications):</label>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="w-full border p-2 mb-4"
      />

      <button 
        onClick={handleSave} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save'}
      </button>

      {isLoading && <p className="mt-4 text-gray-500">Saving your preferences, please wait...</p>}
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default NotificationSettings;


