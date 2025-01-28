import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default Calendar styles
import '../styles/Calendar.css'; // Custom styles

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-customBlue text-white">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Event Calendar</h1>
        <p className="text-lg">Stay up-to-date with all our upcoming events!</p>
      </header>

      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 max-w-md mx-auto">
        <Calendar
          onChange={setDate}
          value={date}
          className="custom-calendar"
        />
      </div>
    </div>
  );
};

export default CalendarPage;
