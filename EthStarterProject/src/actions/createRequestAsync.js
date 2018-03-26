import { setLoading } from './setLoading';
import CampaignInstance from '../ethereum/campaign';

export function createRequest(campaignAddress, newRequest, from) {
  return async function action(dispatch) {
  dispatch(setLoading(true));

  try {
    const campaignInstance = await CampaignInstance(campaignAddress);
    await campaignInstance.methods
      .createRequest(newRequest.description, newRequest.value, newRequest.recipient)
      .send({ from });
  } catch(e) {
      throw e;
  } finally {
      dispatch(setLoading(false));
    }
  };
}
