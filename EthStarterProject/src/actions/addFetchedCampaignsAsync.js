import { setLoading } from './setLoading';
import factory from '../ethereum/factory';

export const addCampaigns = campaigns => ({
  type: 'ADD_FETCHED_CAMPAIGNS',
  payload: campaigns,
});

export function getCampaigns() {
  return async function action(dispatch) {
    dispatch(setLoading(true));

    const campaigns = await factory.methods.getDeployedCampaigns().call();

    dispatch(addCampaigns(campaigns));
    dispatch(setLoading(false));
  };
}
