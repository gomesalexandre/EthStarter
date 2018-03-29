import initialState from "../store/initialState";
import { fromJS, Map } from 'immutable';

export const reducer = (state = initialState, action) => {
  state = fromJS(state);

  switch(action.type) {
    case "ADD_FETCHED_CAMPAIGNS" :
      return state
        .set('campaigns', action.payload)
        .toJS();
    case "SET_LOADING" :
      return state
        .set('loading', action.payload)
        .toJS();
    case "PREPARE_REQUEST" :
      return state
        .set('newRequest', Map({
          description: action.payload.requestDescription,
          recipient: action.payload.requestRecipient,
          value: action.payload.requestValue,
        }))
        .toJS();
    case "FETCH_CAMPAIGN_SUMMARY" :
      return state
        .set('campaign', Map({
          address: action.address,
          balance: action.payload[0],
          minimumContribution: action.payload[1],
          manager: action.payload[2],
          approversCount: action.payload[3],
        }))
        .toJS();
    case "MAKE_VISIBLE" :
      return state
      .setIn(['visible', action.elem], action.isVisible)
      .toJS();
    case "FETCH_ACCOUNTS" :
      return state
        .set('accounts', action.payload)
        .toJS();
    case "NEW_ERROR" :
      return state
        .set('errors', action.payload)
        .toJS();
    case "ACCOUNT_INFO_REQUESTED" :
        return state
          .set('web3CurrentAccount', action.payload)
          .toJS();
    default :
      return state.toJS();
  }
};
