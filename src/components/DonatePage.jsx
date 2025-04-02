import React from 'react';

const DonatePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Make a Donation</h1>
        <p className="text-gray-600 mb-8">
          Your support helps us continue our mission. Thank you for considering a donation!
        </p>

        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <label className="block text-left text-gray-700 text-sm font-bold mb-2">
            Donation Amount
          </label>
          <input
            type="number"
            placeholder="$25"
            className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring focus:border-blue-300"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition"
          >
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonatePage;
