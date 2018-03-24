import initialState from "../store/initialState";

export const reducer = (state = initialState, action) => {
  let newState;

  switch(action.type) {
    case "ADD_FETCHED_CAMPAIGNS" :
      newState = Object.assign({}, state, {campaigns: action.payload});
      break;
    case "SET_LOADING_TRUE" :
      newState = Object.assign({}, state, {loading: true });
      break;
    case "SET_LOADING_FALSE" :
      newState = Object.assign({}, state, {loading: false });
      break;
    case "SET_REQUEST_IN_STORE" :
      newState = Object.assign({}, state, {newRequest: {
        description: action.payload.requestDescription,
        recipient: action.payload.requestRecipient,
        value: action.payload.requestValue,
      } });
      break;
    case "ADD_CAMPAIGN_SUMMARY_TO_STATE" :
      newState = Object.assign({}, state, {campaign: {
        address: action.address,
        balance: action.payload[0],
        minimumContribution: action.payload[1],
        manager: action.payload[2],
        approversCount: action.payload[3],
      },
      });
      break;
    case "ADD_FETCHED_ACCOUNTS" :
      newState = Object.assign({}, state, {accounts: action.payload});
      break;
    case "SHOW_REQUEST_MODAL" :
      newState = Object.assign({}, state, {isRequestModalVisible: true});
      break;
    case "SHOW_REQUEST_FORM" :
    newState = Object.assign({}, state, {isRequestCardVisible: true});
    break;
    case "ADD_ERROR" :
    newState = Object.assign({}, state, {errors: action.payload});
    break;
    default :
      newState = initialState;
  }

  return newState;
};
