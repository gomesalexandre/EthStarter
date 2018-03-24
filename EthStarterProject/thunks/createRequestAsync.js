import CampaignInstance from '../ethereum/campaign';

export function createRequest(campaignAddress, newRequest, from) {
  return async function action(dispatch) {
  dispatch({type:'SET_LOADING_TRUE' });
  try {
    const campaignInstance = await CampaignInstance(campaignAddress);
    await campaignInstance.methods
      .createRequest(newRequest.description, newRequest.value, newRequest.recipient)
      .send({from});
  } catch(e) {
      throw e;
  } finally {
      dispatch({type:'SET_LOADING_FALSE' });
    }
  };
}
