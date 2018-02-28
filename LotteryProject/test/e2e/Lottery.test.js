const assert = require('assert');
const ganache = require('ganache-cli');
const provider = ganache.provider();
const Web3 = require('web3');
const web3 = new Web3(provider);

const { interface, bytecode } = require('../../compile');

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
  it('Should run without any issue from end to end 😎', async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('2', 'ether')
    });
    const balanceAfterEntering = await web3.eth.getBalance(accounts[1]);

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    const finalBalance = await web3.eth.getBalance(accounts[0]);
    /*
    Think the difference should be 2 eth ? Keep in mind there is gas involved,
    thus 1.8 is leaving us plenty of margin to account for it ;)
    */
    assert((finalBalance - balanceAfterEntering) > web3.utils.toWei('1.8', 'ether'))
  })
});
