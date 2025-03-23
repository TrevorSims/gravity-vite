// CalendarPage.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Helper to compare dates (ignoring time)
function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

const CalendarPage = ({ events }) => {
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-page min-h-screen w-screen flex flex-col items-center bg-customBlue text-white pt-20">
      <header className="text-center w-full">
        <h1 className="text-5xl font-bold mb-4 mt-16">Event Calendar</h1>
      </header>

      <div className="w-11/12 max-w-4xl mx-auto mt-12">
        <Calendar
          onChange={setDate}
          value={date}
          className="custom-calendar"
          tileContent={({ date: tileDate, view }) => {
            if (view === 'month') {
              const eventForTile = events.find(e => isSameDay(new Date(e.date), tileDate));
              return eventForTile ? (
                <div
                  className="event-title"
                  onClick={() => handleEventClick(eventForTile)}
                  style={{ cursor: 'pointer' }}
                >
                  {eventForTile.name}
                </div>
              ) : null;
            }
            return null;
          }}
        />
      </div>

      {/* Modal Popup */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-2">{selectedEvent.name}</h2>
            <p className="mb-4">{selectedEvent.description}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        /* Scoped styles for CalendarPage */
        .calendar-page .react-calendar {
          width: 100%;
          max-width: none;
          background: transparent;
          border: none;
          font-family: 'Helvetica', sans-serif;
        }
        .calendar-page .react-calendar__navigation {
          margin-bottom: 1em;
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        .calendar-page .react-calendar__navigation button {
          background: none;
          border: none;
          font-size: 1.5em;
          color: white !important;
          cursor: pointer;
        }
        .calendar-page .react-calendar__navigation__label {
          color: white !important;
          font-size: 1.5em;
          font-weight: bold;
        }
        .calendar-page .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.9em;
          border-bottom: 1px solid white;
          padding-bottom: 0.5em;
          margin-bottom: 0.5em;
        }
        .calendar-page .react-calendar__month-view__days {
          display: grid !important;
          grid-template-columns: repeat(7, minmax(0, 1fr)) !important;
          gap: 1px !important;
          background: white !important;  /* white grid lines */
        }
        .calendar-page .react-calendar__month-view__days__day {
          min-height: 105px !important;
          background: #1E3A8A !important;
          border: none !important;
          border-radius: 0 !important;
          display: flex;
          flex-direction: column;
          align-items: flex-start !important;
          justify-content: flex-start !important;
          padding: 0.5em !important;
          box-sizing: border-box;
          color: white;
          text-align: left;
        }
        .calendar-page .react-calendar__month-view__days__day--neighboringMonth {
          opacity: 1 !important;
          background: #1E3A8A !important;
          color: white;
        }
        .calendar-page .react-calendar__tile--active,
        .calendar-page .react-calendar__tile:focus {
          background: #1E3A8A !important;
          color: white !important;
          border: none !important;
          outline: none !important;
        }
        .calendar-page .react-calendar__tile {
          background: #1E3A8A !important;
          border: none !important;
          border-radius: 0 !important;
          outline: none !important;
        }
        .calendar-page .event-title {
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 4px;
          border-radius: 2px;
          margin-top: 4px;
          color: white;
          max-width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          color: #000;
          padding: 20px;
          border-radius: 8px;
          max-width: 90%;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
