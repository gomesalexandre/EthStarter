import CampaignInstance from '../ethereum/campaign';

export function createRequest(campaignAddress, newRequest, from) {
  return async function action(dispatch) {
  dispatch({type:'SET_LOADING_TRUE', });
  try {
    const campaignInstance = await CampaignInstance(campaignAddress);
    await campaignInstance.methods
      .createRequest(newRequest.description, newRequest.value, newRequest.recipient)
      .send({from, });

    // notification.success({
    //   message: 'New request created',
    //   description: 'Reload page',
    //   icon: <Icon type="check" style={{ color: '#4CAF50', }} />,
    // });

    // Router.push(`/campaign/${this.props.address}`);
  } catch(e) {
      throw e;
      // notification.error({
      //   message: 'Tx failed',
      //   description: e.message,
      // });
  } finally {
      dispatch({type:'SET_LOADING_FALSE', });
    }
  };
}
