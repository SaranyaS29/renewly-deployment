// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import
// import Header from './components/Header';
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
// import Signup from './pages/Signup';

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <div className="container mx-auto p-4">
//         <Routes> {/* Correct: Routes instead of Switch */}
//           <Route path="/" element={<Home />} /> {/* element prop */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotificationSettings from './pages/NotificationSettings';


const AppLayout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/signup','/dashboard'];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications/:id" element={<NotificationSettings />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
