pragma solidity ^0.4.0;
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

    function Campaign(uint minimum) public
    {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    function contribute() public payable
    {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }
    function createRequest(string description, uint value, address recipient)
        public restricted
    {
        require(approvers[msg.sender]);
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalsCount: 0
        });

        requests.push(newRequest);
    }
    function approveRequest(uint index) public payable
    {
        Request storage thisRequest = requests[index]; // Assigning the request to a local var, more efficient, less gas used !

        require(approvers[msg.sender]);
        require(!thisRequest.approvals[msg.sender]);

        thisRequest.approvals[msg.sender] = true;
        thisRequest.approvalsCount++;
    }
    function finalizeRequest(uint index) public payable
    {
        Request storage thisRequest = requests[index];

        require(thisRequest.approvalsCount > approversCount / 2);
        require(!thisRequest.complete); // Let's not finalize the request if it's already finalized !

        thisRequest.recipient.transfer(thisRequest.value);
        thisRequest.complete = true;
    }
}
