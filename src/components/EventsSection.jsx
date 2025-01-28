import React, { useState } from 'react';
import useFadeInOnScroll from '../useFadeInOnScroll';

const events = [
  {
    id: 1,
    name: "Community Clean-Up",
    date: "Nov 10, 2024",
    description: "Join us for a community clean-up event to help keep our parks beautiful.",
    details: "This event will take place at Riverside Park. We provide gloves, bags, and refreshments!",
    imageUrl: "https://via.placeholder.com/400x250?text=Community+Clean-Up",
  },
  {
    id: 2,
    name: "Charity Fun Run",
    date: "Nov 15, 2024",
    description: "A 5K fun run to raise funds for local charities and programs.",
    details: "The race starts at City Square and ends at Central Park. All ages are welcome!",
    imageUrl: "https://via.placeholder.com/400x250?text=Charity+Fun+Run",
  },
  {
    id: 3,
    name: "Holiday Food Drive",
    date: "Dec 5, 2024",
    description: "Help us gather non-perishable food items for families in need this holiday season.",
    details: "We accept canned goods, dry foods, and personal care items. Drop-off at Main Hall.",
    imageUrl: "https://via.placeholder.com/400x250?text=Holiday+Food+Drive",
  },
];

const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const fadeInRef = useFadeInOnScroll();

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <section ref={fadeInRef} id="events" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Upcoming Events</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {events.map(event => (
          <div 
            key={event.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-200 hover:scale-105 hover:shadow-lg"
          >
            <img src={event.imageUrl} alt={event.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{event.date}</p>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <button 
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-purple-500 transition duration-200"
                onClick={() => openModal(event)}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-4">{selectedEvent.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{selectedEvent.date}</p>
            <p className="text-gray-700 mb-4">{selectedEvent.details}</p>
            <button 
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-purple-500 transition duration-200"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSection;
