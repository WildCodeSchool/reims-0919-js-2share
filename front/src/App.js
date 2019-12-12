import React from 'react';
import FamilyDirectory from './components/family-directory/FamilyDirectory.component'
import './App.css';
import Event from './components/Events/Event'


function App() {
  return (
    <div>
      <FamilyDirectory />
      <Event />
    </div>
  );
}

export default App;
