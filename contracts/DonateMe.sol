// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

contract DonateMe {
    struct Donor {
        string name;
        string message;
        uint256 timestamp;
        address from;
        uint amount;
    }
    // Array of all donor
    Donor[] donors;

    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }

    // function to donate
    function Donate(string memory _name, string memory _message) public payable {
        require(msg.value>0, "Please Pay me more than 0 testnet Ethers!");
        owner.transfer(msg.value);
        donors.push(Donor(_name, _message, block.timestamp, msg.sender, msg.value));
    }

    // function to get all Donor
    function getAllDonor() public view returns(Donor[] memory){
        return donors;
    }
}