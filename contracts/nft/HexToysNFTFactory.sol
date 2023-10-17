// Multiple Fixed Price Marketplace contract
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./HexToysMultipleNFT.sol";
import "./HexToysSingleNFT.sol";

interface INFTCollection {
	function initialize(string memory _name, string memory _uri, address creator, bool bPublic) external;	
}

contract HexToysNFTFactory is Ownable {
    using SafeMath for uint256;

    address[] public collections;
	
	/** Events */
    event MultiCollectionCreated(address collection_address, address owner, string name, string uri, bool isPublic);
    event SingleCollectionCreated(address collection_address, address owner, string name, string uri, bool isPublic);
    
	constructor () {
		
	}

	function createMultipleCollection(string memory _name, string memory _uri, bool bPublic) public returns(address collection) {
		if(bPublic){
			require(owner() == msg.sender, "Only owner can create public collection");	
		}
		bytes memory bytecode = type(HexToysMultipleNFT).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(_uri, _name, block.timestamp));
        assembly {
            collection := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        INFTCollection(collection).initialize(_name, _uri, msg.sender, bPublic);
		collections.push(collection);
		emit MultiCollectionCreated(collection, msg.sender, _name, _uri, bPublic);
	}

	function createSingleCollection(string memory _name, string memory _uri, bool bPublic) public returns(address collection) {
		if(bPublic){
			require(owner() == msg.sender, "Only owner can create public collection");	
		}
		bytes memory bytecode = type(HexToysSingleNFT).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(_uri, _name, block.timestamp));
        assembly {
            collection := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        INFTCollection(collection).initialize(_name, _uri, msg.sender, bPublic);
		collections.push(collection);
		
		emit SingleCollectionCreated(collection, msg.sender, _name, _uri, bPublic);
	}
}