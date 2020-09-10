import { createStore, compose } from "redux";
import reducer from "./reducer";
const devtools = window.devToolsExtension || (() => (noop) => noop);
const enhancers = [devtools()];
const store = createStore(reducer, compose(...enhancers));
export default store;