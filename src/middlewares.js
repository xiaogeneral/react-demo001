
export const middleware1 = ({ dispatch, getState }) => (next) => (action) => {
  console.log('middleware1 start', action);
  next(action);
  console.log('middleware1 end')
}

export const middleware2 = ({ dispatch, getState }) => (next) => (action) => {
  console.log('middleware2 start', action);
  next(action);
  console.log('middleware2 end')
}

export const middleware3 = ({ dispatch, getState }) => (next) => (action) => {
  console.log('middleware3 start', action);
  next(action);
  console.log('middleware3 end')
}