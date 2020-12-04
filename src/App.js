import React from 'react';
// import './App.css';
// import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
// import TodoList from './pages/TodoList';
// import ConnectTodoList from './pages/TodoList/connect'
import SiderDemo from './layout'
import FormValidate from './pages/FormValidate';
import DynamicRue from './pages/FormValidate/DynamicRue';

/* 测试合并 fuck pre-merge-commit */
/* 啦啦啦 我是卖报的小螺号 5个大洋一张报 */
function App() {
  return (
    <div className="App">
      <SiderDemo>
        <FormValidate />
        <DynamicRue />
      </SiderDemo>
    </div>
  );
}

export default App;
