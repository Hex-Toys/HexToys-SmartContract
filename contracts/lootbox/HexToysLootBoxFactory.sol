// Multiple PixelPimp HexToysLootBox Factory contract
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./HexToysLootBox.sol";



contract HexToysLootBoxFactory is Ownable {
    using SafeMath for uint256;
    
    /** Create HexToysLootBox fee (PLS) */
	uint256 public creatingFee;	
	uint256 public serviceFee; 

    address[] public boxes;
	// collection address => creator address
	mapping(address => address) public boxCreators;

    /** Events */
    event HexToysMysteryBoxCreated(address box_address, address owner, string name, string uri, address paymentToken, uint256 price);
    event FeeUpdated(uint256 old_fee, uint256 new_fee);

	constructor () {		
		creatingFee = 100000 ether;
		serviceFee = 21; // 21 for 2.1%
	}

    function createHexToysMysteryBox(string memory _name, 
		string memory _uri,
		address _tokenAddress,
		uint256 _price) external payable {
		
		require(msg.value >= creatingFee, "insufficient fee");		

		bytes memory bytecode = type(HexToysLootBox).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(_name, _tokenAddress, block.timestamp));
        address payable mysterybox;
		assembly {
            mysterybox := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        HexToysLootBox(mysterybox).initialize(_name, _uri, _tokenAddress, _price, msg.sender);
		boxes.push(mysterybox);
		boxCreators[mysterybox] = msg.sender;

		emit HexToysMysteryBoxCreated(mysterybox, msg.sender, _name, _uri, _tokenAddress, _price);
	}
    function updateCreatingFee(uint256 _fee) public onlyOwner {
        uint256 oldFee = creatingFee;
		creatingFee = _fee;
		emit FeeUpdated(oldFee, _fee);
    }
	function updateServiceFee(uint256 _serviceFee) public onlyOwner {
        serviceFee = _serviceFee;		
    }

    function withdrawCoin() public onlyOwner {
		uint balance = address(this).balance;
		require(balance > 0, "insufficient balance");
		(bool result, ) = payable(msg.sender).call{value: balance}("");
		require(result, "Failed to Withdraw");
		
	}

	function withdrawToken(address tokenAddress) external onlyOwner {
        IERC20 token = IERC20(tokenAddress);
		uint balance = token.balanceOf(address(this));
		require(balance > 0, "insufficient balance");
		require(token.transfer(msg.sender, balance));			
	}

    receive() external payable {}
}
