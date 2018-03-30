import { actionTypes } from '../actions';
import CampaignInstance from '../ethereum/campaign';

const addCampaignSummary = (campaignSummary, address) => ({
  type: actionTypes.FETCH_CAMPAIGN_SUMMARY,
  payload: campaignSummary,
  address,
});

export function getCampaignSummary(address) {
  return async function action(dispatch) {
    const campaignInstance = CampaignInstance(address);
    const campaignSummary = await campaignInstance.methods.getSummary().call();

    dispatch(addCampaignSummary(campaignSummary, address));
  };
}
