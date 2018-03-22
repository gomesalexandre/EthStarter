import thunk from 'redux-thunk';
import factory from '../ethereum/factory';

export const addCampaigns = campaigns => ({
  type: 'ADD_FETCHED_CAMPAIGNS',
  payload: campaigns,
});

export function getCampaigns(web3) {
  return async function action(dispatch) {
    dispatch({type:'SET_LOADING_TRUE', });
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    dispatch(addCampaigns(campaigns));
    dispatch({type:'SET_LOADING_FALSE', });
  };
}
