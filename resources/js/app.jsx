import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <div className="app-container" style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#4CAF50' }}>Welcome to My React TODO App</h1>
      <p>This is an enhanced version of the app with some styling and structure changes!</p>
      <button style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
        Add New Task
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
