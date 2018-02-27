const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  // Contract deployment
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hey there']
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    });
});

describe('Inbox', () => {
  it('Should get Ganache testRPC accounts', () => {
    console.log(inbox); // Deployed contract
  });
});
