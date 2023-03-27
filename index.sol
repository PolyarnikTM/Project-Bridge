<<<<<<< HEAD
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

    
=======
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract {
    
>>>>>>> c0c64088133de475e618f4cc0f4e84463b0de0de
}