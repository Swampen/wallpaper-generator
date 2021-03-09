import React from 'react';
import './App.css';
import Generator from "./Components/Generator"

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Generator/>
      </div>
    );
  }
}