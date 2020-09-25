import React from 'react';
// import logo from './logo.svg';
import './App.css';
import store from "./storeTest";
import { Button } from 'antd'

function App() {
  console.log('APP====')
  const handleClick = () => {
    store.dispatch({type: 'demo'});
  }
  return (
    <div className="App">
      <Button type="primary" onClick={handleClick}>click me!</Button>
    </div>
  );
}

export default App;
