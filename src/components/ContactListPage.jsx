import React, { useState } from 'react';
import { FiRefreshCcw, FiTrash } from 'react-icons/fi';

const ContactListPage = () => {
  // Initial active contacts (contacts to be contacted)
  const initialActiveContacts = [
    {
      id: 1,
      name: 'John Doe',
      whoContacts: 'Alice',
      contacted: false,
      contactNotes: 'Called last week, no answer.',
      noResponse: 0,
      textOrDM: 'Text',
      generalNotes: 'Interested in donation.',
      events: 'Fundraiser',
      phone: '123-456-7890',
      social: '@johndoe',
    },
    {
      id: 2,
      name: 'Jane Smith',
      whoContacts: 'Bob',
      contacted: false,
      contactNotes: 'Left a lengthy voicemail about potential projects.',
      noResponse: 0,
      textOrDM: 'DM',
      generalNotes: 'Follow-up in two weeks.',
      events: 'Volunteer Drive',
      phone: '987-654-3210',
      social: '@janesmith',
    },
  ];

  // Two separate arrays for active and inactive contacts
  const [activeContacts, setActiveContacts] = useState(initialActiveContacts);
  const [inactiveContacts, setInactiveContacts] = useState([]);

  // State to determine which table to show: "active" or "inactive"
  const [selectedTable, setSelectedTable] = useState('active');
  const currentContacts = selectedTable === 'active' ? activeContacts : inactiveContacts;

  // Common states for filtering and Who Contacts list
  const [search, setSearch] = useState('');
  const [selectedWhoContacts, setSelectedWhoContacts] = useState('All');
  const [whoContactsList, setWhoContactsList] = useState(['Alice', 'Bob']);
  const whoContactsFilterOptions = ['All', ...whoContactsList];

  // State for the Add/Edit Contact modals
  const [newContact, setNewContact] = useState({
    name: '',
    whoContacts: '',
    contactNotes: '',
    textOrDM: '',
    generalNotes: '',
    events: '',
    phone: '',
    social: '',
  });
  const [editContact, setEditContact] = useState(null);

  // Modal visibility states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWhoContactModal, setShowWhoContactModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // NEW: State for move confirmation modal
  const [contactToMove, setContactToMove] = useState(null);
  const [showMoveModal, setShowMoveModal] = useState(false);

  // State for displaying full cell text in a modal
  const [cellModalText, setCellModalText] = useState('');
  const [showCellModal, setShowCellModal] = useState(false);

  // State for new Who Contacts name input
  const [newWhoContact, setNewWhoContact] = useState('');

  // Inline style for fixed cell dimensions and truncation
  const fixedCellStyle = {
    height: "3rem",
    lineHeight: "3rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };

  // Additional style for the Contact Notes column (fixed width)
  const fixedContactNotesStyle = {
    ...fixedCellStyle,
    minWidth: '8rem',
    maxWidth: '8rem',
    width: '8rem',
  };

  // --- Filtering ---
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleWhoContactsFilterChange = (e) =>
    setSelectedWhoContacts(e.target.value);

  const filteredContacts = currentContacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search) ||
      contact.social.toLowerCase().includes(search.toLowerCase());
    const matchesWho =
      selectedWhoContacts === 'All' || contact.whoContacts === selectedWhoContacts;
    return matchesSearch && matchesWho;
  });

  // --- Table actions for currentContacts ---
  const handleCheckboxChange = (id) => {
    if (selectedTable === 'active') {
      setActiveContacts(activeContacts.map(contact =>
        contact.id === id ? { ...contact, contacted: !contact.contacted } : contact
      ));
    } else {
      setInactiveContacts(inactiveContacts.map(contact =>
        contact.id === id ? { ...contact, contacted: !contact.contacted } : contact
      ));
    }
  };

  const handleIncrement = (id) => {
    if (selectedTable === 'active') {
      setActiveContacts(activeContacts.map(contact =>
        contact.id === id && contact.noResponse < 3
          ? { ...contact, noResponse: contact.noResponse + 1 }
          : contact
      ));
    } else {
      setInactiveContacts(inactiveContacts.map(contact =>
        contact.id === id && contact.noResponse < 3
          ? { ...contact, noResponse: contact.noResponse + 1 }
          : contact
      ));
    }
  };

  const handleDecrement = (id) => {
    if (selectedTable === 'active') {
      setActiveContacts(activeContacts.map(contact =>
        contact.id === id && contact.noResponse > 0
          ? { ...contact, noResponse: contact.noResponse - 1 }
          : contact
      ));
    } else {
      setInactiveContacts(inactiveContacts.map(contact =>
        contact.id === id && contact.noResponse > 0
          ? { ...contact, noResponse: contact.noResponse - 1 }
          : contact
      ));
    }
  };

  const handleDeleteContact = (id) => {
    if (selectedTable === 'active') {
      setActiveContacts(activeContacts.filter(contact => contact.id !== id));
    } else {
      setInactiveContacts(inactiveContacts.filter(contact => contact.id !== id));
    }
  };

  // --- Move Function with Confirmation ---
  const confirmMoveContact = (contact) => {
    setContactToMove(contact);
    setShowMoveModal(true);
  };

  const handleMoveContact = () => {
    if (selectedTable === 'active') {
      // Move from active to inactive
      setActiveContacts(activeContacts.filter(c => c.id !== contactToMove.id));
      setInactiveContacts([...inactiveContacts, contactToMove]);
    } else {
      // Move from inactive to active
      setInactiveContacts(inactiveContacts.filter(c => c.id !== contactToMove.id));
      setActiveContacts([...activeContacts, contactToMove]);
    }
    setShowMoveModal(false);
    setContactToMove(null);
  };

  // --- Add / Edit modals ---
  const handleNewContactChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };
  const handleAddContact = (e) => {
    e.preventDefault();
    const newId =
      Math.max(...[...activeContacts, ...inactiveContacts].map(c => c.id), 0) + 1;
    const contactToAdd = { id: newId, ...newContact, contacted: false, noResponse: 0 };
    if (selectedTable === 'active') {
      setActiveContacts([...activeContacts, contactToAdd]);
    } else {
      setInactiveContacts([...inactiveContacts, contactToAdd]);
    }
    setNewContact({
      name: '',
      whoContacts: '',
      contactNotes: '',
      textOrDM: '',
      generalNotes: '',
      events: '',
      phone: '',
      social: '',
    });
    setShowAddModal(false);
  };

  const handleEditContactChange = (e) => {
    setEditContact({ ...editContact, [e.target.name]: e.target.value });
  };
  const handleUpdateContact = (e) => {
    e.preventDefault();
    if (editContact.sourceTable === 'active') {
      setActiveContacts(activeContacts.map(contact =>
        contact.id === editContact.id ? editContact : contact
      ));
    } else {
      setInactiveContacts(inactiveContacts.map(contact =>
        contact.id === editContact.id ? editContact : contact
      ));
    }
    setEditContact(null);
  };

  const openEditModal = (contact) => {
    setEditContact({ ...contact, sourceTable: selectedTable });
  };

  // --- Who Contacts Management ---
  const handleNewWhoContactChange = (e) => setNewWhoContact(e.target.value);
  const handleAddWhoContact = (e) => {
    e.preventDefault();
    if (newWhoContact && !whoContactsList.includes(newWhoContact)) {
      setWhoContactsList([...whoContactsList, newWhoContact]);
    }
    setNewWhoContact('');
  };
  const handleDeleteWhoContact = (name) => {
    setWhoContactsList(whoContactsList.filter(n => n !== name));
  };

  // --- Modal to show full cell text ---
  const openCellModal = (text) => {
    setCellModalText(text);
    setShowCellModal(true);
  };

  // --- Dropdown for switching between tables ---
  const handleTableSwitch = (e) => {
    setSelectedTable(e.target.value);
  };

  return (
    <div className="h-screen w-screen bg-customBlue flex flex-col items-center p-4 pt-40 relative">
      {/* Reset Button */}
      <button
        onClick={() => {
          setActiveContacts(activeContacts.map(c => ({ ...c, contacted: false })));
          setInactiveContacts(inactiveContacts.map(c => ({ ...c, contacted: false })));
        }}
        className="absolute left-6 top-25 bg-blue-500 hover:bg-purple-500 text-white p-2 rounded-full shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95"
      >
        <FiRefreshCcw className="w-5 h-5" />
      </button>

      <h1 className="text-4xl font-bold mb-6 text-white">Contact List</h1>

      {/* Table Switch Dropdown & Who Contacts Filter */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <label className="text-white">View Table:</label>
          <select
            value={selectedTable}
            onChange={handleTableSwitch}
            className="p-2 border rounded shadow text-black bg-white"
          >
            <option value="active">Contacts To Be Contacted</option>
            <option value="inactive">Do Not Contact</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search contacts..."
            className="p-2 w-64 border rounded shadow text-black"
          />
          <select
            value={selectedWhoContacts}
            onChange={handleWhoContactsFilterChange}
            className="p-2 border rounded shadow text-black bg-white"
          >
            {whoContactsFilterOptions.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowWhoContactModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
          >
            Contactors
          </button>
        </div>
      </div>

      {/* Button to open the Add New Contact modal */}
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 bg-green-500 hover:bg-green-600 text-white p-2 rounded"
      >
        Add New Contact
      </button>

      {/* Table Container */}
      <div className="overflow-auto w-full">
        <table className="min-w-full table-fixed bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-4 text-left h-12 w-32">Name</th>
              <th className="py-3 px-4 text-left h-12 w-32">Who Contacts</th>
              <th className="py-3 px-4 text-center h-12 w-24">Contacted</th>
              <th
                className="py-3 px-4 text-left h-12"
                style={{ minWidth: '8rem', maxWidth: '8rem', width: '8rem' }}
              >
                Contact Notes
              </th>
              <th className="py-3 px-4 text-center h-12 w-24">No Response</th>
              <th className="py-3 px-4 text-left h-12 w-32">Text/DM</th>
              <th className="py-3 px-4 text-left h-12 w-32">General Notes</th>
              <th className="py-3 px-4 text-left h-12 w-32">Events</th>
              <th className="py-3 px-4 text-left h-12 w-32">Phone #</th>
              <th className="py-3 px-4 text-left h-12 w-32">IG Handle / Email</th>
              <th className="py-3 px-4 text-center h-12 w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredContacts.map((contact) => (
              <tr
                key={contact.id}
                className={`border-b border-gray-200 transition duration-200 ${
                  contact.noResponse === 3
                    ? 'bg-red-500 text-white'
                    : contact.contacted
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <td className="w-32 h-12">
                  <div style={fixedCellStyle} className="cursor-pointer" onClick={() => openCellModal(contact.name)}>
                    {contact.name}
                  </div>
                </td>
                <td className="w-32 h-12">
                  <div style={fixedCellStyle} className="cursor-pointer" onClick={() => openCellModal(contact.whoContacts)}>
                    {contact.whoContacts}
                  </div>
                </td>
                <td className="w-24 h-12 flex justify-center items-center">
                  <input
                    type="checkbox"
                    checked={contact.contacted}
                    onChange={() => handleCheckboxChange(contact.id)}
                    className="w-5 h-5 accent-blue-500"
                  />
                </td>
                <td className="w-32 h-12">
                  <div style={fixedContactNotesStyle} className="cursor-pointer" onClick={() => openCellModal(contact.contactNotes)}>
                    {contact.contactNotes}
                  </div>
                </td>
                <td className="w-24 h-12 flex justify-center items-center gap-2">
                  <button className="px-2 py-1 bg-gray-300 rounded text-black hover:bg-gray-400" onClick={() => handleDecrement(contact.id)}>
                    -
                  </button>
                  <span className="w-6 text-center">{contact.noResponse}</span>
                  <button className="px-2 py-1 bg-gray-300 rounded text-black hover:bg-gray-400" onClick={() => handleIncrement(contact.id)}>
                    +
                  </button>
                </td>
                <td className="w-32 h-12">
                  <div style={fixedCellStyle} className="cursor-pointer" onClick={() => openCellModal(contact.textOrDM)}>
                    {contact.textOrDM}
                  </div>
                </td>
                <td className="w-32 h-12">
                  <div style={fixedCellStyle} className="cursor-pointer" onClick={() => openCellModal(contact.generalNotes)}>
                    {contact.generalNotes}
                  </div>
                </td>
                <td className="w-32 h-12">
                  <div style={fixedCellStyle} className="cursor-pointer" onClick={() => openCellModal(contact.events)}>
                    {contact.events}
                  </div>
                </td>
                <td className="w-32 h-12">
                  <div style={fixedCellStyle} className="cursor-pointer" onClick={() => openCellModal(contact.phone)}>
                    {contact.phone}
                  </div>
                </td>
                <td className="w-32 h-12">
                  <div style={fixedCellStyle} className="cursor-pointer" onClick={() => openCellModal(contact.social)}>
                    {contact.social}
                  </div>
                </td>
                <td className="w-32 h-12">
                  <div className="flex justify-center gap-2 h-full items-center">
                    <button onClick={() => openEditModal(contact)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => setContactToDelete(contact.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                    <button onClick={() => confirmMoveContact(contact)} className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded">
                      {selectedTable === 'active' ? 'Do Not Contact' : 'Restore'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Add New Contact */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">Add New Contact</h2>
            <form onSubmit={handleAddContact} className="grid grid-cols-1 gap-4">
              <input type="text" name="name" value={newContact.name} onChange={handleNewContactChange} placeholder="Name" className="p-2 border rounded" />
              <select name="whoContacts" value={newContact.whoContacts} onChange={handleNewContactChange} className="p-2 border rounded">
                <option value="">Select Who Contacts</option>
                {whoContactsList.map((name, idx) => (
                  <option key={idx} value={name}>{name}</option>
                ))}
              </select>
              <input type="text" name="contactNotes" value={newContact.contactNotes} onChange={handleNewContactChange} placeholder="Contact Notes" className="p-2 border rounded" />
              <select name="textOrDM" value={newContact.textOrDM} onChange={handleNewContactChange} className="p-2 border rounded">
                <option value="">Select Text/DM</option>
                <option value="Text">Text</option>
                <option value="DM">DM</option>
              </select>
              <input type="text" name="generalNotes" value={newContact.generalNotes} onChange={handleNewContactChange} placeholder="General Notes" className="p-2 border rounded" />
              <input type="text" name="events" value={newContact.events} onChange={handleNewContactChange} placeholder="Events" className="p-2 border rounded" />
              <input type="text" name="phone" value={newContact.phone} onChange={handleNewContactChange} placeholder="Phone #" className="p-2 border rounded" />
              <input type="text" name="social" value={newContact.social} onChange={handleNewContactChange} placeholder="IG Handle / Email" className="p-2 border rounded" />
              <button type="submit" className="bg-blue-500 hover:bg-purple-500 text-white p-2 rounded">
                Add Contact
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Contact */}
      {editContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button onClick={() => setEditContact(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
            <form onSubmit={handleUpdateContact} className="grid grid-cols-1 gap-4">
              <input type="text" name="name" value={editContact.name} onChange={handleEditContactChange} placeholder="Name" className="p-2 border rounded" />
              <select name="whoContacts" value={editContact.whoContacts} onChange={handleEditContactChange} className="p-2 border rounded">
                <option value="">Select Who Contacts</option>
                {whoContactsList.map((name, idx) => (
                  <option key={idx} value={name}>{name}</option>
                ))}
              </select>
              <input type="text" name="contactNotes" value={editContact.contactNotes} onChange={handleEditContactChange} placeholder="Contact Notes" className="p-2 border rounded" />
              <select name="textOrDM" value={editContact.textOrDM} onChange={handleEditContactChange} className="p-2 border rounded">
                <option value="">Select Text/DM</option>
                <option value="Text">Text</option>
                <option value="DM">DM</option>
              </select>
              <input type="text" name="generalNotes" value={editContact.generalNotes} onChange={handleEditContactChange} placeholder="General Notes" className="p-2 border rounded" />
              <input type="text" name="events" value={editContact.events} onChange={handleEditContactChange} placeholder="Events" className="p-2 border rounded" />
              <input type="text" name="phone" value={editContact.phone} onChange={handleEditContactChange} placeholder="Phone #" className="p-2 border rounded" />
              <input type="text" name="social" value={editContact.social} onChange={handleEditContactChange} placeholder="IG Handle / Email" className="p-2 border rounded" />
              <button type="submit" className="bg-blue-500 hover:bg-purple-500 text-white p-2 rounded">
                Update Contact
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Manage Who Contacts */}
      {showWhoContactModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm relative">
            <button onClick={() => setShowWhoContactModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              X
            </button>
            <h2 className="text-xl font-bold mb-4">Manage Who Contacts</h2>
            <form onSubmit={handleAddWhoContact} className="grid grid-cols-1 gap-4 mb-4">
              <input type="text" value={newWhoContact} onChange={handleNewWhoContactChange} placeholder="Enter name" className="p-2 border rounded" />
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
                Add Name
              </button>
            </form>
            <ul>
              {whoContactsList.map((name, idx) => (
                <li key={idx} className="flex items-center justify-between py-1 border-b">
                  <span>{name}</span>
                  <button onClick={() => handleDeleteWhoContact(name)} className="text-red-500 hover:text-red-600">
                    <FiTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation for Contacts */}
      {contactToDelete !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this contact?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setContactToDelete(null)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteContact(contactToDelete);
                  setContactToDelete(null);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Move Confirmation */}
      {showMoveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4">Confirm Move</h2>
            <p className="mb-4">
              Are you sure you want to move this contact to the{" "}
              {selectedTable === "active" ? "Do Not Contact" : "Contacts To Be Contacted"} table?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowMoveModal(false);
                  setContactToMove(null);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleMoveContact}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Display Full Cell Text */}
      {showCellModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button onClick={() => setShowCellModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              X
            </button>
            <div className="text-lg">
              {cellModalText || <em>No text available.</em>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactListPage;
