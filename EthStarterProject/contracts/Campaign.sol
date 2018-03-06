pragma solidity ^0.4.0;
contract CampaignFactory {
    address[] public deployedCampaigns;
    function deployCampaign(uint minimum) public
    {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns(address[])
    // getters on arrays just get one campaign, we want all of them
    {
        return deployedCampaigns;
    }
}
contract Campaign {
    struct Request { // Type def, i.e needs to be instanciated !
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalsCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        msg.sender == manager;
        _;
    }

    function Campaign(uint minimum, address creator) public
    {
        manager = creator;
        minimumContribution = minimum;
    }
    function contribute() public payable
    {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
    }
    function createRequest(string description, uint value, address recipient)
        public restricted
    {
        require(msg.sender == manager);
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalsCount: 0
        });

        requests.push(newRequest);
    }
    function approveRequest(uint index) public
    {
        Request storage thisRequest = requests[index]; // Assigning the request to a local var, more efficient, less gas used !

        require(approvers[msg.sender]);
        require(!thisRequest.approvals[msg.sender]);

        thisRequest.approvals[msg.sender] = true;
        thisRequest.approvalsCount++;
        approversCount++;
    }
    function finalizeRequest(uint index) public restricted
    {
        Request storage thisRequest = requests[index];

        require(thisRequest.approvalsCount > approversCount / 2);
        require(!thisRequest.complete); // Let's not finalize the request if it's already finalized !

        thisRequest.recipient.transfer(thisRequest.value);
        // thisRequest.complete = true;
    }
}
