export default {
  campaigns: [],
  loading: false,
  newRequest: {
    value: null,
    description: null,
    recipient: null,
  },
  campaign: {
    manager: null,
    minimumContribution: null,
    approversCount: null,
    requests: null,
  },
  errors: [],
  visible: {
    requestModal: false,
    requestCard: false,
  },
  web3CurrentAccount: null,
};
