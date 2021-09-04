import React from 'react';
import CollectionList from './components/CollectionList';
import './fonts/HomemadeApple-Regular.ttf';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <h2 className="project-name">Show My Records</h2>
      <CollectionList />
    </React.Fragment>
  );
}

export default App;
