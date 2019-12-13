import React from 'react';
import FamilyDirectory from './components/family-directory/FamilyDirectory.component'
import './App.css';
import Event from './components/Events/Event'


function App() {
  return (
    <div>
      <header className='header_style_theme'>
        <img src='logo_toshare_blue.png' alt='logo-toshare'/>
      </header>
      <Event />
      <footer className='footer_style_theme'>
        <p>Icones</p>
      </footer>
    </div>
  );
}

export default App;
