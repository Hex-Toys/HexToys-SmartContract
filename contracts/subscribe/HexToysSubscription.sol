//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Subscription based smart contract
 * @notice Pay a monthly subscription in coins or erc20 tokens
 * @author HexToys Inc.
 */

contract HexToysSubscription is Ownable {

    /// @dev Variables to manage the fee for each type of payment
    uint256 public coinFee; // Fee for Coin payments

    /// @dev Variables for analytics
    uint256 public totalCoins;

    /// @dev Where the fees will be sent
    address public feeCollector;

    mapping (address => uint256) public userTotalCoins;

    /// @dev Struct for payments
    /// @param user Who made the payment
    /// @param last_date When the last payment was made
    /// @param expire_date When the user needs to pay again
    struct Subscribe {
        address user;
        address col_addr;
        uint256 last_date;
        uint256 expire_date;
    }

    /// @dev Array of subscribes
    Subscribe[] public subscribes;

    /// @dev User Subscribe
    mapping(address => mapping(address => Subscribe)) public userSubscribe;

   /// @dev Events
    event UserSubscribed(uint256 _amount, Subscribe _subscribe);

    /// @dev Errors
    error StillActive();
    error FailedWithdrawn();

    constructor () {		
		feeCollector = _msgSender();
        coinFee = 100000 ether;		
	}

    /// @dev Function to pay the subscription
    /// @notice User can chose to pay either in Eth, either in Erc20 Tokens
    /// @param colAddr The NFT collection address to pay the subscription
    /// @param _period For how many months the user wants to pay the subscription
    function paySubscription(address colAddr, uint256 _period) external payable returns(bool) {
        if(block.timestamp < userSubscribe[msg.sender][colAddr].expire_date) revert StillActive();
        uint256 amount = coinFee * _period;
        if (msg.value != amount) revert FailedWithdrawn();
        totalCoins = totalCoins + msg.value; // Compute total payments in PLS
        userTotalCoins[msg.sender] = userTotalCoins[msg.sender] + msg.value; // Compute user's total payments in PLS
        Subscribe memory newSub = Subscribe(msg.sender, colAddr, block.timestamp, block.timestamp + _period * 30 days);
        subscribes.push(newSub); // Push the payment in the payments array
        userSubscribe[msg.sender][colAddr] = newSub; // User's last payment

        emit UserSubscribed(amount, newSub);

        return true;
    }

    /// @dev Set the monthly Coin fee
    function setCoinFee(uint256 _newCoinFee) external onlyOwner {
        coinFee = _newCoinFee;
    }

    /// @dev Set a new payment collector
    function setNewPaymentCollector(address _feeCollector) external onlyOwner {
        feeCollector = _feeCollector;
    }

    /// @dev Withdraw the Eth balance of the smart contract
    function withdraw() external onlyOwner {
        uint256 _amount = address(this).balance;

        (bool sent, ) = feeCollector.call{value: _amount}("");
        if(sent == false) revert FailedWithdrawn();
    }

    /// @notice To recieve ETH
    receive() external payable {}
}