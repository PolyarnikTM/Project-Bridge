// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Bridge {
    address payable public owner;
    
    constructor() payable {
        owner = payable(msg.sender);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only Owner");
        _;
    }

    
}