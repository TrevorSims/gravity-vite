import React from 'react';
import { Link } from 'react-router-dom';
import useFadeInOnScroll from '../useFadeInOnScroll';

const DonateSection = () => {
  const fadeInRef = useFadeInOnScroll();

  return (
    <section 
      ref={fadeInRef} 
      id="donate" 
      className="py-12 px-4 bg-gradient-to-r from-gray-100 to-gray-200 text-center"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Support Our Mission</h2>
        <p className="text-gray-600 mb-6">
          Your contributions help us make a lasting impact in the community. Every little bit counts.
        </p>
        <Link to="/donate">
          <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition duration-200">
            Donate
          </button>
        </Link>
      </div>
    </section>
  );
};

export default DonateSection;
