import thunk from 'redux-thunk';
import factory from '../ethereum/factory';

export const addCampaigns = campaigns => ({
  type: 'ADD_FETCHED_CAMPAIGNS',
  payload: campaigns,
});

export function getCampaigns() {
  return async function action(dispatch) {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    dispatch(addCampaigns(campaigns));
  };
}
