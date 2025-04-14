import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EventsSection from './components/EventsSection';
import DonateSection from './components/DonateSection';
import Footer from './components/Footer';
import CalendarPage from './components/CalendarPage';
import ContactListPage from './components/ContactListPage';
import StaffLogin from './components/StaffLogin';
import ManageEventsPage from './components/ManageEventsPage';
import TabbedDonatePage from './components/TabbedDonatePage';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Initialize events state from localStorage or empty array.
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  // Save events to localStorage whenever they change.
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  return (
    <Router>
      <div>
        <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <EventsSection events={events} />
                <DonateSection />
                <Footer />
              </>
            }
          />
          {/* Updated donation route that passes isAdmin so admins can edit the list */}
          <Route path="/donate" element={<TabbedDonatePage isAdmin={isAdmin} />} />
          <Route path="/calendar" element={<CalendarPage events={events} />} />
          <Route path="/staff-login" element={<StaffLogin setIsAdmin={setIsAdmin} />} />
          {isAdmin && <Route path="/contacts" element={<ContactListPage />} />}
          {isAdmin && (
            <Route
              path="/manage-events"
              element={<ManageEventsPage events={events} setEvents={setEvents} />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
