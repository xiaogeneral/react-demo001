import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import Clock from "./Clock";
// import TestForm from './Form'
// import TodoList from "./TodoList";
// import TestOne from "./hooks01";
import TodoList from "./pages/TodoList";

function App() {
  console.log('APP====')
  return (
    <div className="App">
      {/*<Clock foo={obj} />*/}
      {/*<TestOne />*/}
      {/*<TodoList />*/}
      <TodoList />
    </div>
  );
}

export default App;
