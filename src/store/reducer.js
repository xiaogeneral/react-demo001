const initialState = {
  inputValue: '',
  list: []
}
export default (state = initialState, action) => {
  console.log('call?')
  console.log(state,'state===')
  switch (action.type) {
    case 'CHANGE_VALUE':
      return {
        ...state,
        inputValue: action.payload
      };
    case 'ADD_ITEM':
      const { inputValue, list } = state;
      return {
        ...state,
        inputValue: '',
        list: list.concat(inputValue)
      }
    default:
      return state
  }
}