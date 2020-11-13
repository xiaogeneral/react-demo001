const initialState = {
  inputValue: '',
  list: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return {
        ...state,
        inputValue: action.payload
      };
    case 'ADD':
      return {
        ...state,
        list: action.payload
      }
    default:
      return state
  }
}