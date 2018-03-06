# EthStarter

This is a a decentralized KickStarter-like project. It will allow people with project ideas to create campaigns, and contributors to fund the projects. The difference between it and your classic crowdfunding platform is that the funds will be stored in a smart contract : 
They will only be released to the supplier after a request has been made by the product owner, and more than 50% of backers have agreed to that expense. No more wild cashing out of funds !


# Using / Testing the smart-contract

Test the smart contract the same way you would test it (refer to the root of this _SolidityLearning_ repo for that).
However, there is a subtle difference here ! You won't directly use the Campaign contract. Instead : 

- Deploy CampaignFactory using `node deploy`. 
- Load it in Remix from address. 
- Call the "deployCampaign" method, with the minimum amount of Wei required for said campaign. 
- Call the "getDeployedCampaigns" method, copy the address, and load the Campaign from address. 
- Voilà ! Magic happens, CampaignFactory contract has deployed a Campaign contract

**Why is there a "Campaign Factory" ?**

We want to be able to run multiple campaigns concurrently, and also for users to pay for deployment, not us. 

This way, our _CampaignFactory_ contract will actually be responsible for creating _Campaign_ contracts. 
It will make us able to keep track of all the 
