import React from 'react';
// import './App.css';
// import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import TodoList from './pages/TodoList';
// import ConnectTodoList from './pages/TodoList/connect'
import SiderDemo from './layout'


function App() {
  return (
    <div className="App">
      <SiderDemo>
        <TodoList />
      </SiderDemo>
    </div>
  );
}

export default App;
