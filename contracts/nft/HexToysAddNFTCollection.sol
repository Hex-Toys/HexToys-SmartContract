// NFTImportor contract
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface INFTCollection {
	function owner() external view returns (address);
	function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

contract HexToysAddNFTCollection is Ownable {
    using SafeMath for uint256;

    address[] public collections;
	uint256 public fee;
    bool public publicAdd;
	
	/** Events */
	// nftType : 0:ERC721, 1: ERC1155
    event CollectionAdded(address collection_address, address owner, uint256 nftType, string name, string uri);
    
    constructor () {		
		fee = 100 ether;
        publicAdd = false;		
	}

	function setFee(uint256 _fee) external onlyOwner {		
		fee = _fee;
    }

    function setPublicAdd(bool _publicAdd) external onlyOwner {		
		publicAdd = _publicAdd;
    }


	function importCollection(address _address, string memory _name, string memory _uri) external payable {	
        require(IsERC721(_address) || IsERC1155(_address), "Invalid Collection Address");
        if (publicAdd) {
            require(msg.value >= fee, "Insufficient funds");
        } else {
            require(msg.sender == owner(), "only owner can import collection");
        }        
        
        uint256 nftType = 0;
        if (IsERC1155(_address)) {
            nftType = 1;
        }
		address collectionOwner = getCollectionOwner(_address);
		
		emit CollectionAdded(_address, collectionOwner, nftType, _name, _uri);
	}

	function getCollectionOwner(address collection) view private returns(address) {
        INFTCollection nft = INFTCollection(collection); 
        try nft.owner() returns (address ownerAddress) {
            return ownerAddress;
        } catch {
            return address(0x0);
        }
    }

	function IsERC721(address collection) view private returns(bool) {
        INFTCollection nft = INFTCollection(collection); 
        try nft.supportsInterface(0x80ac58cd) returns (bool result) {
            return result;
        } catch {
            return false;
        }
    }

	function IsERC1155(address collection) view private returns(bool) {
        INFTCollection nft = INFTCollection(collection); 
        try nft.supportsInterface(0xd9b67a26) returns (bool result) {
            return result;
        } catch {
            return false;
        }
    }

	function withdraw() external onlyOwner {
		uint balance = address(this).balance;
		require(balance > 0, "insufficient balance");		
		(bool result, ) = payable(msg.sender).call{value: balance}("");
        require(result, "Failed to withdraw balance"); 
	}
	/**
     * @dev To receive Coin
     */
    receive() external payable {}
}