pragma solidity ^0.8.0;

contract IPFSMapping {
    mapping(address => bytes32) public data;

    function set(bytes32 hash) external {
        data[msg.sender] = hash;
    }

    function remove() external {
        delete data[msg.sender];
    }
}
