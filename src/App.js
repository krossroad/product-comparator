import React, { Component } from 'react';
import OverlayMessage from './components/OverlayMessage';
import UrlForm from './components/UrlForm';
import Product from './components/Product';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Product Comparator</h2>
        </div>

        <UrlForm />
        <Product />
        <OverlayMessage />
      </div>
    );
  }
}

export default App;
