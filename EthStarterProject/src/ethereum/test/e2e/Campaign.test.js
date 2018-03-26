const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider({default_balance_ether: 10000}));

const compiledFactory = require('../../build/CampaignFactory.json');
const compiledCampaign = require('../../build/Campaign.json');

let accounts;
let factory;
let campaign;
let campaignAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: compiledFactory.bytecode})
    .send({from: accounts[0], gas: '1000000'});

  await factory.methods.deployCampaign('100')
    .send({from: accounts[0], gas: '1000000'});

  [campaignAddress] = await factory.methods.getDeployedCampaigns()
    .call();
  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);
});

describe('Campaigns', () => {
  it('Runs without any issues', async () => {
    await campaign.methods.contribute()
      .send({from: accounts[1], value: 20000});
    await campaign.methods.createRequest('Buy cryptokitties because we definitely need it', 1000000, accounts[1])
      .send({from: accounts[0], gas: '250000'});
    await campaign.methods.approveRequest(0)
      .send({from: accounts[1], gas: '250000'});
    const balanceBefore = await web3.eth.getBalance(accounts[1]);

    await campaign.methods.finalizeRequest(0)
      .send({from: accounts[0], gas: '250000'});

    const balanceAfter =  await web3.eth.getBalance(accounts[1]);

    assert.notEqual(balanceAfter, balanceBefore);
  });
});
