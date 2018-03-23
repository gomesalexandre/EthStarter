import web3 from './web3';
import factory from './build/CampaignFactory.json';
import { address } from './factoryAddress.js';

const factoryInstance = new web3.eth.Contract(
  JSON.parse(factory.interface),
  address
);

export default factoryInstance;
