import initialState from "../store/initialState";

export const reducer = (state = initialState, action) => {
  let newState;

  switch(action.type) {
    case "ADD_FETCHED_CAMPAIGNS" :
      newState = Object.assign({}, state, {campaigns: action.payload});
      break;
    case "SET_LOADING" :
      newState = Object.assign({}, state, {loading: action.payload });
      break;
    case "PREPARE_REQUEST" :
      newState = Object.assign({}, state, {newRequest: {
        description: action.payload.requestDescription,
        recipient: action.payload.requestRecipient,
        value: action.payload.requestValue,
      } });
      break;
    case "FETCH_CAMPAIGN_SUMMARY" :
      newState = Object.assign({}, state, {campaign: {
        address: action.address,
        balance: action.payload[0],
        minimumContribution: action.payload[1],
        manager: action.payload[2],
        approversCount: action.payload[3],
      },
      });
      break;
    case "MAKE_VISIBLE" :
      newState = Object.assign({}, state, {visible: {
        ...state.visible,
        [action.elem]: action.isVisible,
      }});
      break;
    case "FETCH_ACCOUNTS" :
      newState = Object.assign({}, state, {accounts: action.payload});
      break;
    case "NEW_ERROR" :
    newState = Object.assign({}, state, {errors: action.payload});
    break;
    default :
      newState = initialState;
  }

  return newState;
};
