This Responsive React component, Contacts, fetches and displays a list of contacts from a mock API (jsonplaceholder.typicode.com) in a paginated manner. The component uses state variables to manage the list of contacts, loading state, selected contact details, pagination, and errors.

Initially, it fetches a set of contacts and displays them. The contacts are sorted alphabetically by their name, and duplicates are avoided using a filtering mechanism.
Users can click on a contact card to see more details in a modal window.
There's also a "Load More" button that fetches additional contacts when clicked, allowing for pagination.
If data is being fetched or an error occurs, the component handles it by showing loading indicators or error messages.
The component is styled using a separate CSS file (Contacts.css), with a logo, contact list, contact detail modal, and footer.
In short, the app allows users to browse a paginated list of contacts, view more details about a contact in a modal, and load more contacts as needed.

Technology used:

React: JavaScript framework for building user interfaces, particularly for dynamic, single-page applications.
Axios: A promise-based HTTP client used to make requests to the API to fetch the contacts.
CSS: For custom styling the contact list and details, ensuring a responsive layout across devices.
JavaScript: Core language to handle data fetching, state management (using useState), and side effects (using useEffect).

Lionel Coevoet 27-11-24