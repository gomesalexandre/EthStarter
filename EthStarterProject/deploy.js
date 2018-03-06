const WalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const config = require('./config'); // Mneumonics are safe in a gitignored config file

const provider = new WalletProvider(config.mneumo, config.endpoint);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Deploying from account', accounts[0]);
  const deployedContract = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode})
    .send({gas: '1000000', from: accounts[0]});

  console.log('Contract deployed to', deployedContract.options.address);
};
deploy();
