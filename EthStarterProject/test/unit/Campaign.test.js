const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

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

describe('Campaigns', () =>{
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
  it('Caller is marked as the campaign manager', async () => {
    const manager = await campaign.methods.manager()
      .call();

    assert.equal(accounts[0], manager);
  });
  it('People can contribute to the campaign', async () => {
    await campaign.methods.contribute()
      .send({from: accounts[1], value: '200'});

    assert.ok(await campaign.methods.approvers(accounts[1])
      .call());
  });
  it('There is a minimum contribution amount required', async () => {
    try {
      await campaign.methods.contribute()
        .send({from: accounts[1], value: '99'});
      assert(false);
    } catch(err) {
      assert(err)
     }
  });
  it('Manager can make a payment request', async () => {
    await campaign.methods.createRequest('Buy coffee and pizza to feed the devs', '100', accounts[1])
      .send({from: accounts[0], gas: '250000'});
    const request = await campaign.methods.requests(0).call();
  });
});


