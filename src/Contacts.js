import React, { useState, useEffect } from "react";
import axios from "axios";
import './Contacts.css'; // Custom styling

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [page, setPage] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const [error, setError] = useState(null);

  const contactsPerPage = 10;

  // Fetch contacts from API with pagination
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${contactsPerPage}`)
      .then((response) => {
        const sortedContacts = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setContacts((prevContacts) => [...prevContacts, ...sortedContacts]);
        setLoading(false);
        setTotalContacts(parseInt(response.headers['x-total-count']));
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setLoading(false);
        setError("Failed to load contacts.");
      });
  }, [page]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseDetails = () => {
    setSelectedContact(null);
  };

  const loadMoreContacts = () => {
    if (contacts.length < totalContacts) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && contacts.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="contacts-container">
      {/* Header with logo and title */}
      <header className="header">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ7xr2l_rq4bQDHGcPubnaa03fUgnveQJRQg&s"
          alt="Company Logo"
          className="logo"
        />
        <h1 className="title">Contact List</h1>
      </header>

      {/* Display contacts list */}
      <div className="contacts-list">
        {contacts.map((contact) => (
          <div
            className="contact-card"
            key={contact.id}
            onClick={() => handleContactClick(contact)}
          >
            <img
              className="contact-avatar"
              src={`https://i.pravatar.cc/150?img=${contact.id}`}
              alt={`${contact.name}'s Avatar`}
            />
            <h3>{contact.name}</h3>
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

export default Contacts;
