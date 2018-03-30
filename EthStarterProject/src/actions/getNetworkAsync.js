import { actionTypes } from '../actions';
const addNetworkInfo = network => ({ type: actionTypes.NETWORK_INFO_REQUESTED, payload: network });

export function getNetwork(web3) {
  return async function action(dispatch) {
    const network = await web3.eth.net.getNetworkType();

    if (network === undefined) {throw new Error('Cannot get account');}
    dispatch(addNetworkInfo(network));
  };
}
