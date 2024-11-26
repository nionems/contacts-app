import React, { useState, useEffect } from "react";
import axios from "axios";
import './Contacts.css'; // Custom styling

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null); // State for selected contact

  // Fetch contacts data from JSONPlaceholder API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      });
  }, []);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="contacts-container">
      <h1>Contacts</h1>
      
      {/* Display list of contacts */}
      <div className="contacts-list">
        {contacts.map((contact) => (
          <div
            className="contact-card"
            key={contact.id}
            onClick={() => handleContactClick(contact)} // Handle click event
          >
            <h3>{contact.name}</h3>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
          </div>
        ))}
      </div>

      {/* Conditionally render contact details */}
      {selectedContact && (
        <div className="contact-details">
          <h2>Contact Details</h2>
          <p><strong>Name:</strong> {selectedContact.name}</p>
          <p><strong>Email:</strong> {selectedContact.email}</p>
          <p><strong>Phone:</strong> {selectedContact.phone}</p>
          <p><strong>Website:</strong> <a href={`http://${selectedContact.website}`} target="_blank" rel="noopener noreferrer">{selectedContact.website}</a></p>
          <p><strong>Company:</strong> {selectedContact.company.name}</p>
          <p><strong>Address:</strong> {`${selectedContact.address.street}, ${selectedContact.address.city}`}</p>
        </div>
      )}
    </div>
  );
};

export default Contacts;
