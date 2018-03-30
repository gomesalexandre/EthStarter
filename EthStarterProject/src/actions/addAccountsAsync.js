import { actionTypes } from '../actions';

export const addAccounts = accounts => ({
  type: actionTypes.FETCH_ACCOUNTS,
  payload: accounts,
});

export function getAccounts(web3) {
  return async function action(dispatch) {
    const accounts = await web3.eth.getAccounts();

    dispatch(addAccounts(accounts));
  };
}
