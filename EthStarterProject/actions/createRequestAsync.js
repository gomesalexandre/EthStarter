import thunk from 'redux-thunk';
import factory from '../ethereum/factory';

import web3 from '../ethereum/web3';
import CampaignInstance from '../ethereum/campaign';

export function createRequest(campaignAddress, newRequest) {
  return async function action(dispatch) {
  dispatch({type:'SET_LOADING_TRUE', });
try {
  const accounts = await web3.eth.getAccounts();
  const campaignInstance = await CampaignInstance(campaignAddress);
  const result = await campaignInstance.methods
    .createRequest(newRequest.description, newRequest.value, newRequest.recipient)
    .send({from: accounts[0],});

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
