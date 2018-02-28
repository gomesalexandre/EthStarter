const assert = require('assert');
const ganache = require('ganache-cli');
const provider = ganache.provider();
const Web3 = require('web3');
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

const defaultMessage = "Hey there";

let inbox;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  // Contract deployment
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    });

  lottery.setProvider(provider);
});

describe('Lottery', () => {
  it('Contract is deployed', () => {
    assert.ok(lottery.options.address);
  });
  it('One account can enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('1', 'ether'),
    });
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });
    assert.equal(accounts[1], players[0]);
  })
  it('Multiple accounts can enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('1', 'ether'),
    });
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('1', 'ether'),
    })
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });
    assert.equal(accounts[1], players[0]);
    assert.equal(accounts[2], players[1]);
  });
});
