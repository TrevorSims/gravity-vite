import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EventsSection from './components/EventsSection';
import DonateSection from './components/DonateSection';
import Footer from './components/Footer';
import CalendarPage from './components/CalendarPage';
import ContactListPage from './components/ContactListPage';


// Smooth Scroll Function
const smoothScroll = (event) => {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute("href").slice(1); // Get ID from href (without #)
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  }
};

const App = () => {
  useEffect(() => {
    // Add event listeners to all internal links
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach(link => link.addEventListener("click", smoothScroll));

    // Cleanup event listeners on unmount
    return () => links.forEach(link => link.removeEventListener("click", smoothScroll));
  }, []);

  return (
    <Router>
      <div>
        <Header />
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
          <Route path="/contacts" element={<ContactListPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
