# EthStarter
_Built with Next.js, web3, Ant Design, Express, Solidity, Truffle and tested with Mocha + node's native assert() module_

Decentralized KickStarter-like project. It allows people with project ideas to create campaigns, and for contributors to fund the projects. The difference between it and your classic crowdfunding platform is that the funds will be stored in a smart contract : 
They will only be released to the supplier after a request has been made by the product owner, and more than 50% of backers have agreed to that expense. No more wild cashing out of funds !



## Requirements / Getting started 

- Metamask installed and set on Rinkeby testnet with some Eth in your address (https://faucet.rinkeby.io/ will provide you with some) :
Mneumonic is needed for the deployment of the contract, so keep it ! 
_Any web3 enabled browser will do as well, such as Cipher or Status.im on mobile_
- An Infura endpoint URL (https://infura.io/)
- Node.js >= 7.6 for the async/await magic
- Rename `config.example.js` to `config.js` with an Infura Rinkeby endpoint URL, and your metamask mneumonic(seedphrase)

## Frontend

- Run either `yarn compile` or `npm run compile`to compile both the campaign and campaign factory
- Run either `yarn deploy` or `npm run deploy` or to deploy an instance of the factory to Rinkeby
- Run either `yarn dev` or `npm run dev` and voilà !

## Contract Testing

e2e/unit tests are included :

- To run the unit tests, cd into the project folder and run `yarn test --recursive ethereum/test/unit`
- To run the end-to-end tests, cd into the project folder and run `yarn test --recursive ethereum/test/e2e`

## Using the smart contract on Remix (Advanced)

Test the smart contract the same way you would test it (refer to the root of this _SolidityLearning_ repo for that).
However, there is a subtle difference here ! You won't directly use the Campaign contract. Instead : 

- Copy and paste the content from 'Campaign.sol' in Remix and click on 'Create' to deploy it (make sure to select "Injected Web3" as provider)
- Call the "deployCampaign" method, with the minimum amount of Wei required for said campaign
- Call the "getDeployedCampaigns" method, copy the address, and load the Campaign from address
- Voilà ! Magic happens, CampaignFactory contract has deployed a Campaign contract, that you can now use

### Why is there a "Campaign Factory" ?

We want to be able to run multiple campaigns concurrently, and also for users to pay for deployment, not us. 

This way, our _CampaignFactory_ contract will actually be responsible for creating _Campaign_ contracts. 
It will make us able to keep track of all the currently running campaigns

## Contract Methods 

- **deployCampaign(uint mimimum)**

Deploys one campaign from a factory, takes the mimimum contribution amount of campaign as arg

- **createRequest(string description, uint value, address recipient)**

Creates one request. Takes the request info as argument. 
_msg.sender needs to be the campaign manager_

- **contribute() payable**

Contribute to the campaign. Payable, wei needs to be greater than the minimum contribution for this campaign.

- **approveRequest(uint index)**

Approves one request, takes request index as argument. 
_msg.sender needs to be an approver, i.e has contributed_

- **finalizeRequest(uint index)**

Finalizes one request, takes request index as argument. 
A minimum of 50% of approvals is required or the method will throw
_msg.sender needs to be the campaign manager_ 

