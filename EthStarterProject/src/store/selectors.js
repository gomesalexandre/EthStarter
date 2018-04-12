const getVisibleSelector = state => state.visible;
const getCampaignSelector = state => state.campaign;
const getCampaignsSelector = state => state.campaigns;
const getNewRequestSelector = state => state.newRequest;
const getNewContributionSelector = state => state.newContribution;
const getAccountsSelector = state => state.accounts;
const getLoadingSelector = state => state.loading;
const getCurrentAccountSelector = state => state.web3CurrentAccount;

export {
  getVisibleSelector,
  getCampaignSelector,
  getCampaignsSelector,
  getNewRequestSelector,
  getAccountsSelector,
  getLoadingSelector,
  getCurrentAccountSelector,
  getNewContributionSelector,
};
