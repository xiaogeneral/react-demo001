import { createStore, applyMiddleware } from 'redux';
// 中间件
import {
  middleware1,
  middleware2,
  middleware3
} from '../middlewares';
// reducer
import reducer from './reducer';
const middlewares = [middleware1, middleware2, middleware3];

export default createStore(reducer, undefined, applyMiddleware(...middlewares));