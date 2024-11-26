import React, { useState, useEffect } from "react";
import axios from "axios";

import './Contacts.css'; // Custom styling

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="contacts-container">
      <h1>Contacts</h1>
      <div className="contacts-list">
        {contacts.map((contact) => (
          <div className="contact-card" key={contact.id}>
            <h3>{contact.name}</h3>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <p><strong>Website:</strong> <a href={`http://${contact.website}`} target="_blank" rel="noopener noreferrer">{contact.website}</a></p>
            <p><strong>Company:</strong> {contact.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
