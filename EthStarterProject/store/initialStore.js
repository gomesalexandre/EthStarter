import { createStore } from 'redux';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
};

const initializeStore = initialState => {
  return createStore(reducer, initialState);
};

// exports the functionality to initialize the store
// rather than exporting the store instance
export default initializeStore;
