

// import React from 'react';
// import { Link } from 'react-router-dom';
// import home_image from '../assets/home_image.jpg'; // Replace with your image path

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation */}
      

//       {/* Hero Section */}
//       <div className="container mx-auto px-6 py-12 md:flex items-center">
//         {/* Left Content */}
//         <div className="md:w-1/2 md:pr-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
//             Welcome to Renewly
//           </h1>
//           <p className="text-lg text-gray-600 mb-8">
//             Keep track of all your subscriptions in one place.
//           </p>
//           <Link
//             to="/signup"
//             className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
//           >
//             Get Started
//           </Link>
//         </div>

//         {/* Hero Image */}
    
//         <div className="w-full max-w-xl md:max-w-2xl h-auto">
//           <img
//             src={home_image}
//             alt="Subscription Tracker"
//              className="w-[600px] h-[500px] object-cover"
//           />
//         </div>
        
//       </div>

//       {/* Social Proof Section (Optional) */}
//       <div className="container mx-auto px-6 py-16">
//         <p className="text-center text-gray-700 mb-12">
//           Trusted by people who never miss a renewal.
//         </p>
//         <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
//           <span className="text-blue-600 font-bold text-xl">Netflix</span>
//           <span className="text-red-500 font-bold text-xl">Spotify</span>
//           <span className="text-green-500 font-bold text-xl">YouTube</span>
//           <span className="text-purple-600 font-bold text-xl">Amazon Prime</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import home_image from '../assets/home_image.jpg'; // Replace with your image path

// const RenewlyLanding = () => {
//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-white">
//       {/* Hero Section */}
//       <div className="container mx-auto px-6 py-12 md:flex items-center">
//         {/* Left Content */}
//         <div className="md:w-1/2 md:pr-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
//             Welcome to Renewly
//           </h1>
//           <p className="text-lg text-gray-600 mb-8">
//             Keep track of all your subscriptions in one place. <br />
//             Never forget a renewal again — receive timely reminders, monitor spending, 
//             and manage everything from Netflix to your gym membership in one dashboard.
//           </p>
//           <Link
//             to="/signup"
//             className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
//           >
//             Get Started
//           </Link>
//         </div>

//         {/* Hero Image */}
//         <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center items-center">
//           <img
//             src={home_image}
//             alt="Subscription Tracker"
//             className="w-[600px] h-[500px] object-cover"
//           />
//         </div>
//       </div>

//       {/* Social Proof Section at the bottom */}
      
//     </div>
//   );
// };

// export default RenewlyLanding;

import React from 'react';
import { Link } from 'react-router-dom';
import home_image from '../assets/home_image.jpg';

const RenewlyLanding = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* Hero Section with margin on top */}
      <div className="container mx-auto px-6 mt-45 md:flex items-center">
        {/* Left Content */}
        <div className="md:w-1/2 md:pr-12 -mt-12">
  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
    Welcome to    <span className="text-blue-500">R</span>enewly 
  </h1>
  <p className="text-2xl text-gray-600 mb-8">
    Keep track of all your subscriptions in one place. <br />
    Stay on top of your subscriptions with automatic renewal reminders and seamless calendar syncing. Never miss a payment again—stay organized and in control!
  </p>
  <Link
    to="/signup"
    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
  >
    Get Started
  </Link>
</div>


        {/* Hero Image */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center items-center">
          <img
            src={home_image}
            alt="Subscription Tracker"
            className="w-[600px] h-[500px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RenewlyLanding;
