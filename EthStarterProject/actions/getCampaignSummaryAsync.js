import CampaignInstance from '../ethereum/campaign';
export const addCampaignSummary = summary => ({
  type: 'ADD_CAMPAIGN_SUMMARY_TO_STATE',
  payload: summary,
});

export function getCampaignSummary(address) {
  return async function action(dispatch) {
    const campaignInstance = CampaignInstance(address);
    const campaignSummary = await campaignInstance.methods.getSummary().call();

    dispatch({type: 'ADD_CAMPAIGN_SUMMARY_TO_STATE', payload: campaignSummary, address: address, });
  };
}
