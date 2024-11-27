import React from 'react'; 
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering components to the DOM
import App from './App'; // Import the main App component
import reportWebVitals from './reportWebVitals'; // Import performance measurement functions

// Create a root for rendering the React component tree into the 'root' DOM element
const root = ReactDOM.createRoot(document.getElementById('root')); 

// Render the App component wrapped in React.StrictMode for highlighting potential issues
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);

// Optional: Measure app performance by using the reportWebVitals function
// Pass a function like console.log or send the metrics to an analytics endpoint
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
