const addAccountInfo = address => ({ type: 'ACCOUNT_INFO_REQUESTED', payload: address });

export function getCurrentAccount(web3) {
  return async function action(dispatch) {
    const accounts = await web3.eth.getAccounts();

    if (accounts[0] == undefined) {throw new Error('Cannot get account');}
    dispatch(addAccountInfo(accounts[0]));
  };
}
