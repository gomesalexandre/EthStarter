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
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [defaultMessage]
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    });

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('Deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('Constructor functions sets default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, defaultMessage);
  });
  it('Message setter is working', async () => {
    await inbox.methods.setMessage('Bon appétit !').send(
      {
        from: accounts[0],
        gas: '1000000'
      }
    );
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Bon appétit !');
  });
});
