import thunk from 'redux-thunk';

export const addAccounts = accounts => ({
  type: 'ADD_FETCHED_ACCOUNTS',
  payload: accounts,
});

export function getAccounts(web3) {
  return async function action(dispatch) {
    const accounts = await web3.eth.getAccounts();

    dispatch(addAccounts(accounts));
  };
}
