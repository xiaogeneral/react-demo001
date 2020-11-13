import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux'
import TodoList from './pages/TodoList';
import ConnectTodoList from './pages/TodoList/connect'
import store from './store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/redux">redux</Link>
                </li>
                <li>
                  <Link to="/react-redux">react-redux</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/redux">
                <TodoList />
              </Route>
              <Route path="/react-redux">
                <ConnectTodoList />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
