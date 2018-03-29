import CampaignInstance from '../ethereum/campaign';

export function getCampaignSummary(address) {
  return async function action(dispatch) {
    const campaignInstance = CampaignInstance(address);
    const campaignSummary = await campaignInstance.methods.getSummary().call();

    dispatch({ type: 'FETCH_CAMPAIGN_SUMMARY', payload: campaignSummary, address: address });
  };
}
