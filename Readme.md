# Solidity Learning

Here you will find the three projects related to my solidity learning:

- Inbox, a simple smart contract that sets a message 
- Lottery, which as the name suggests is a contract that manages a lottery : It will send 2 ethers to a random person amongst which will have sent some ethers to the contract.


## Requirements 

- Node.JS > 8 (For async/await support)
- Metamask browser plugin, set on Rinkeby testnet and with your mneumonic saved
- An Infurio.io endpoint url (it takes 30 seconds to register and it is free)

## Configuration

- cd to a project folder
- Run `npm install`
- Rename config.example.js to config.js
- Replace the values in it : mneumo should be your mneumonic (from metamask), and endpoint should be your Infurio endpoint link.


## Testing
All of the projects are tested: 
Simply run mocha test [NAMEOFPROJECT]

## Deployment

To deploy a project : 
cd to the project folder, then run `node deploy`
