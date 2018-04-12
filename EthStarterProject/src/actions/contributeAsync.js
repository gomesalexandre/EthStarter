import { setLoading } from './setLoading';
import CampaignInstance from '../ethereum/campaign';

export function contribute(campaignAddress, newContribution, from) {
  return async function action(dispatch) {
    dispatch(setLoading(true));

    try {
      const campaignInstance = await CampaignInstance(campaignAddress);

      await campaignInstance.methods
        .contribute()
        .send({
          from,
          value: newContribution.value,
        });
    } catch(e) {
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  };
}
