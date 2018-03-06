# Solidity Learning

Here you will find the three projects related to my Solidity lang learning:

- **Inbox**, a simple smart contract that sets a message 
- **Lottery**, which as the name suggests is a contract that manages a lottery : It will send 2 ethers to a random person amongst which will have sent some ethers to the contract.
- **EthStarter**, a decentralized KickStarter-like project. It will allow product owners to create campaigns, and contributors to fund the projects. The difference between it and your classic crowdfunding platform is that the funds will be stored in a smart contract : 
They will only be released to the supplier after a request has been made by the product owner, and more than 50% of backers have agreed to that expense. No more wild cashing out of funds ! 

## Requirements 

- Node.JS >= 8 (For async/await support)
- A C++ compiler for the node modules (OSX users should make sure they have the xcode command-line tools installed)
- Metamask browser plugin, set on Rinkeby testnet and with your mneumonic(seedphrase) saved
- Some ETH on your Rinkeby testnet wallet (use a faucet)
- An Infurio.io endpoint url (it takes 30 seconds to register and it is free)

## Configuration

- cd to a project folder
- Run `npm install`
- Rename config.example.js to config.js
- Replace the values in it : mneumo should be your mneumonic (from metamask), and endpoint should be your Infurio endpoint link.


## Testing
- `cd` to a project folder 
- `mocha --recursive test/unit` to run unit tests
-  `mocha --recursive test/e2e` to run end-to-end tests
## Deployment

- `cd` to a project folder
- `node deploy`

## Enjoy !

To interact with a smart contract after successful deployment : 

- Go to Remix IDE, then, under "Run" you will see a "Load contract from address" option, paste the deployed contract address there and click "At Address"
