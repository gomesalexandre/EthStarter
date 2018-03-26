import web3 from './web3';
import campaignBuild from './build/Campaign.json';

const CampaignInstance = address => new web3.eth.Contract(
  JSON.parse(campaignBuild.interface),
  address);

export default CampaignInstance;
