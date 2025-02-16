import React, { useState } from 'react';

const ContactListPage = () => {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Volunteer' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Donor' },
    { id: 3, name: 'Michael Brown', email: 'michael.brown@example.com', role: 'Staff' },
  ]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen w-screen bg-customBlue text-white flex flex-col items-center p-4 pt-32">
      <h1 className="text-4xl font-bold mb-6">Contact List</h1>

      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by name, email, or role"
        className="mb-4 p-2 w-80 border rounded shadow text-gray-800"
      />

      {/* Table */}
      <div className="overflow-auto w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
        <table className="min-w-full">
          <thead className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm font-light">
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{contact.name}</td>
                <td className="py-3 px-6 text-left">{contact.email}</td>
                <td className="py-3 px-6 text-left">{contact.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactListPage;
