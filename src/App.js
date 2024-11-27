import React from "react"; // Importing React library
import Contacts from "./Contacts"; // Importing the Contacts component from a local file

// Main App component
function App() {
  return (
    <div className="App"> {/* Root div with a class name for styling */}
      <Contacts /> {/* Rendering the Contacts component */}
    </div>
  );
}

export default App; // Exporting the App component as the default export
