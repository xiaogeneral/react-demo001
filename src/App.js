import React from 'react';
import './App.css';
import store from "./store";
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
