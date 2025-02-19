import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EventsSection from './components/EventsSection';
import DonateSection from './components/DonateSection';
import Footer from './components/Footer';
import CalendarPage from './components/CalendarPage';
import ContactListPage from './components/ContactListPage';
import StaffLogin from './components/StaffLogin';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Track staff login state

  return (
    <Router>
      <div>
        <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <EventsSection />
              <DonateSection />
              <Footer />
            </>
          } />
          <Route path="/calendar" element={<CalendarPage />} />
          {/* Staff login page */}
          <Route path="/staff-login" element={<StaffLogin setIsAdmin={setIsAdmin} />} />
          {/* Contact list only visible to staff */}
          {isAdmin && <Route path="/contacts" element={<ContactListPage />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
