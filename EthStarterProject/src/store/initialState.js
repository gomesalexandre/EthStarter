export default {
  campaigns: [],
  loading: false,
  newRequest: {
    value: null,
    description: null,
    recipient: null,
  },
  newContribution: {
    value: 0,
  },
  campaign: {
    manager: null,
    minimumContribution: null,
    approversCount: null,
    requests: null,
  },
  visible: {
    requestModal: false,
    requestCard: false,
    contributeCard: false,
    contributeModal: false,
  },
  web3CurrentNetwork: null,
  web3CurrentAccount: null,
};
