import React from 'react';
import { Navbar } from './Navbar';
import './App.scss';


function App() {
  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
            <h1 className="title">
              Hello World
            </h1>
            <p className="subtitle">
              My first website with <strong>Bulma</strong>!
            </p>
        </div>
    </section>
  </>
  )
}

export default App
