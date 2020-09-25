import { createStore, applyMiddleware } from 'redux';
import {
  middleware1,
  middleware2,
  middleware3
} from './middlewares';
const reducer = (state = {}, action) => {
  return state
};
const middlewares = [middleware1, middleware2, middleware3];

export default createStore(reducer, {}, applyMiddleware(...middlewares));