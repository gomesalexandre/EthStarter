import initialState from "../store/initialState";

export const reducer = (state = initialState, action) => {
  let newState;

  switch(action.type) {
    case "ADD_FETCHED_CAMPAIGNS" :
      newState = Object.assign({}, state, {campaigns: action.payload, });
      break;
    default :
      newState = {'Foo': 'barrr', };
  }

  return newState;
};
