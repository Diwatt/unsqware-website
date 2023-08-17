import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Router } from './Router';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <section className="section">
        <div className="container">
          <Router />
        </div>
    </section>
  </BrowserRouter>
  )
}

export default App;
