import {
  ADD_LIST,
  CHANGE_VALUE
} from './types';

const defaultState = {
  inputValue: '',
  list: []
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        list: action.payload
      };
    case CHANGE_VALUE:
      return {
        ...state,
        inputValue: action.payload
      };
  }
  return state;
}