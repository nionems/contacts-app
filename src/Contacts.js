import React, { useState, useEffect } from "react"; // Import React and hooks
import axios from "axios"; // Import axios for API requests
import './Contacts.css'; // Import styling

const Contacts = () => {
  // State variables
  const [contacts, setContacts] = useState([]); // Stores fetched contacts
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedContact, setSelectedContact] = useState(null); // Stores the contact selected for details view
  const [page, setPage] = useState(1); // Tracks current page for pagination
  const [totalContacts, setTotalContacts] = useState(0); // Total number of contacts available
  const [error, setError] = useState(null); // Stores error message, if any

  const contactsPerPage = 100; // Number of contacts to fetch per page

  // Fetch contacts from API whenever the page changes
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${contactsPerPage}`)
      .then((response) => {
        const sortedContacts = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setContacts((prevContacts) => {
          const uniqueContacts = sortedContacts.filter(
            (contact) => !prevContacts.some((prev) => prev.id === contact.id)
          );
          return [...prevContacts, ...uniqueContacts];
        });
        setTotalContacts(parseInt(response.headers['x-total-count'], 10));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setLoading(false);
        setError("Failed to load contacts.");
      });
  }, [page]);
  

  // Handles clicking on a contact to view details
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  // Closes the contact details modal
  const handleCloseDetails = () => {
    setSelectedContact(null);
  };

  // Loads more contacts by incrementing the page number
  const loadMoreContacts = () => {
    if (contacts.length < totalContacts) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Show loading spinner if data is still being fetched
  if (loading && contacts.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  // Display error message if API call fails
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="contacts-container">
      {/* Header section with logo and title */}
      <header className="header">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ7xr2l_rq4bQDHGcPubnaa03fUgnveQJRQg&s"
          alt="Company Logo"
          className="logo"
        />
        <h1 className="title">Contact List</h1>
      </header>

      {/* List of contacts */}
      <div className="contacts-list">
        {contacts.map((contact) => (
          <div
            className="contact-card"
            key={contact.id} // Unique key for each contact
            onClick={() => handleContactClick(contact)} // Open details on click
          >
            <img
              className="contact-avatar"
              src={`https://i.pravatar.cc/150?img=${contact.id}`} // Generate avatar
              alt={`${contact.name}'s Avatar`}
            />
            <h3>{contact.name}</h3> {/* Display contact name */}
          </div>
        ))}
      </div>

      {/* Contact details modal */}
      {selectedContact && (
        <div className="contact-details">
          <h2>Contact Details</h2>
          <p><strong>Name:</strong> {selectedContact.name}</p>
          <p><strong>Email:</strong> {selectedContact.email}</p>
          <p><strong>Phone:</strong> {selectedContact.phone}</p>
          <p><strong>Website:</strong> <a href={`http://${selectedContact.website}`} target="_blank" rel="noopener noreferrer">{selectedContact.website}</a></p>
          <p><strong>Company:</strong> {selectedContact.company.name}</p>
          <p><strong>Address:</strong> {`${selectedContact.address.street}, ${selectedContact.address.city}`}</p>
          <button className="close-button" onClick={handleCloseDetails}>Close</button>
        </div>
      )}

      {/* Load More Button */}
      {contacts.length < totalContacts && (
        <button className="load-more-button" onClick={loadMoreContacts}>Load More</button>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Lionel Coevoet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contacts; // Export the Contacts component
