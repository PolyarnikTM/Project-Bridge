// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
//Not Token
contract trashcan {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only Owner");
        _;
    }


    function deposit() public payable {}

    function withdraw() public onlyOwner {
        uint amount = address(this).balance;
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Failed to send Ether");
    }


    function transfer(address payable _to, uint _amount) public onlyOwner {
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Failed to send Ether");
    }
}
