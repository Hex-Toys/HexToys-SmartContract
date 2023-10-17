// NFT Staking Factory Contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./HexToysSingleNFTStaking.sol";

interface INFTStaking {
    function initialize(InitializeParam memory param) external;
}

contract HexToysSingleNFTStakingFactory is Ownable {
    using SafeMath for uint256;
    using EnumerableSet for EnumerableSet.UintSet;

    uint256 public constant PERCENTS_DIVIDER = 1000;
    uint256 public constant YEAR_TIMESTAMP = 31536000;

    address[] public stakings;
    address private adminFeeAddress;
    uint256 private adminFeePercent; // 21 for 2.1 %
    uint256 private depositFeePerNft;
    uint256 private withdrawFeePerNft;

    struct Subscription {
        uint256 id;
        string name;
        uint256 period; // calculate with time interval
        uint256 price;
        bool bValid;
    }

    uint256 public currentSubscriptionsId;
    mapping(uint256 => Subscription) private _subscriptions;
    EnumerableSet.UintSet private _subscriptionIndices;

    EnumerableSet.UintSet private _aprs;

    /** Events */
    event SubscriptionCreated(Subscription subscription);
    event SubscriptionDeleted(uint256 subscriptionsId);
    event SubscriptionUpdated(
        uint256 subscriptionsId,
        Subscription subscription
    );

    event SingleNFTStakingCreated(
        address _stake_address,
        InitializeParam _param
    );

    constructor (address _adminFeeAddress) {		
		adminFeeAddress = _adminFeeAddress;        

        adminFeePercent = 21;
        depositFeePerNft = 100 ether;
        withdrawFeePerNft = 100 ether;
        currentSubscriptionsId = 0;		
	}

    function getAdminFeeAddress() external view returns (address) {
        return adminFeeAddress;
    }

    function setAdminFeeAddress(address _adminFeeAddress) external onlyOwner {
        adminFeeAddress = _adminFeeAddress;
    }

    function getAdminFeePercent() external view returns (uint256) {
        return adminFeePercent;
    }

    function setAdminFeePercent(uint256 _adminFeePercent) external onlyOwner {
        adminFeePercent = _adminFeePercent;
    }

    function getDepositFeePerNft() external view returns (uint256) {
        return depositFeePerNft;
    }

    function setDepositFeePerNft(uint256 _depositFeePerNft) external onlyOwner {
        depositFeePerNft = _depositFeePerNft;
    }

    function getWithdrawFeePerNft() external view returns (uint256) {
        return withdrawFeePerNft;
    }

    function setWithdrawFeePerNft(uint256 _withdrawFeePerNft)
        external
        onlyOwner
    {
        withdrawFeePerNft = _withdrawFeePerNft;
    }

    /**
		Subscription Management
	 */
    function addSubscription(
        string memory _name,
        uint256 _period,
        uint256 _price
    ) external onlyOwner {
        currentSubscriptionsId = currentSubscriptionsId.add(1);
        _subscriptions[currentSubscriptionsId].id = currentSubscriptionsId;
        _subscriptions[currentSubscriptionsId].name = _name;
        _subscriptions[currentSubscriptionsId].period = _period;
        _subscriptions[currentSubscriptionsId].price = _price;
        _subscriptions[currentSubscriptionsId].bValid = true;

        _subscriptionIndices.add(currentSubscriptionsId);
        emit SubscriptionCreated(_subscriptions[currentSubscriptionsId]);
    }

    function deleteSubscription(uint256 _subscriptionId) external onlyOwner {
        require(_subscriptions[_subscriptionId].bValid, "not exist");
        _subscriptions[_subscriptionId].bValid = false;

        _subscriptionIndices.remove(_subscriptionId);
        emit SubscriptionDeleted(_subscriptionId);
    }

    function updateSubscription(
        uint256 _subscriptionId,
        string memory _name,
        uint256 _period,
        uint256 _price
    ) external onlyOwner {
        require(_subscriptions[_subscriptionId].bValid, "not exist");

        _subscriptions[_subscriptionId].name = _name;
        _subscriptions[_subscriptionId].period = _period;
        _subscriptions[_subscriptionId].price = _price;

        emit SubscriptionUpdated(
            _subscriptionId,
            _subscriptions[_subscriptionId]
        );
    }

    function subscriptionCount() public view returns (uint256) {
        return _subscriptionIndices.length();
    }

    function subscriptionIdWithIndex(uint256 index)
        public
        view
        returns (uint256)
    {
        return _subscriptionIndices.at(index);
    }

    function viewSubscriptionInfo(uint256 _subscriptionId)
        external
        view
        returns (Subscription memory)
    {
        return _subscriptions[_subscriptionId];
    }

    function allSubscriptions()
        external
        view
        returns (Subscription[] memory scriptions)
    {
        uint256 scriptionCount = subscriptionCount();
        scriptions = new Subscription[](scriptionCount);

        for (uint256 i = 0; i < scriptionCount; i++) {
            scriptions[i] = _subscriptions[subscriptionIdWithIndex(i)];
        }
    }

    /**
		APR Management
	 */
    function addApr(uint256 _value) external onlyOwner {
        _aprs.add(_value);
        emit SubscriptionCreated(_subscriptions[currentSubscriptionsId]);
    }

    function deleteApr(uint256 _value) external onlyOwner {
        _aprs.remove(_value);
        emit SubscriptionDeleted(_value);
    }

    function aprCount() external view returns (uint256) {
        return _aprs.length();
    }

    function aprWithIndex(uint256 index) external view returns (uint256) {
        return _aprs.at(index);
    }

    function allAprs() external view returns (uint256[] memory aprs_) {
        uint256 count = _aprs.length();
        aprs_ = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            aprs_[i] = _aprs.at(i);
        }
    }

    function createSingleNFTStaking(
        uint256 startTime,
        uint256 subscriptionId,
        uint256 aprIndex,
        address stakeNftAddress,
        address rewardTokenAddress,
        uint256 stakeNftPrice,
        uint256 maxStakedNfts,
        uint256 maxNftsPerUser
    ) external payable returns (address staking) {
        require(_subscriptions[subscriptionId].bValid, "not exist");

        Subscription storage _subscription = _subscriptions[subscriptionId];
        uint256 _apr = _aprs.at(aprIndex);
        uint256 endTime = startTime.add(_subscription.period);       

        {
            (bool result, ) = payable(adminFeeAddress).call{value: _subscription.price}("");
            require(result, "Failed to transfer fee to adminFeeAddress");           
        }

        {
            bytes memory bytecode = type(HexToysSingleNFTStaking).creationCode;
            bytes32 salt = keccak256(abi.encodePacked(stakeNftAddress, rewardTokenAddress, block.timestamp));
            assembly {
                staking := create2(0, add(bytecode, 32), mload(bytecode), salt)
            }            
        }

        {
            uint256 depositTokenAmount = getDepositTokenAmount(
                stakeNftPrice,
                maxStakedNfts,
                _apr,
                _subscription.period
            );
            if (rewardTokenAddress == address(0x0)) {                
                (bool result, ) = payable(staking).call{value: depositTokenAmount}("");
                require(result, "Failed to transfer deposit coin to staking");
            } else {
                IERC20 governanceToken = IERC20(rewardTokenAddress);
                require(
                    governanceToken.transferFrom(
                        msg.sender,
                        address(this),
                        depositTokenAmount
                    ),
                    "insufficient token balance"
                );
                governanceToken.transfer(staking, depositTokenAmount);
            }
        }

        {
            InitializeParam memory _initializeParam;
            _initializeParam.stakeNftAddress = stakeNftAddress;
            _initializeParam.rewardTokenAddress = rewardTokenAddress;
            _initializeParam.stakeNftPrice = stakeNftPrice;
            _initializeParam.apr = _apr;
            _initializeParam.creatorAddress = msg.sender;
            _initializeParam.maxStakedNfts = maxStakedNfts;
            _initializeParam.maxNftsPerUser = maxNftsPerUser;
            _initializeParam.depositFeePerNft = depositFeePerNft;
            _initializeParam.withdrawFeePerNft = withdrawFeePerNft;
            _initializeParam.startTime = startTime;
            _initializeParam.endTime = endTime;

            INFTStaking(staking).initialize(_initializeParam);
            stakings.push(staking);

            emit SingleNFTStakingCreated(staking, _initializeParam);
        }
    }

    function getDepositTokenAmount(
        uint256 stakeNftPrice_,
        uint256 maxStakedNfts_,
        uint256 apr_,
        uint256 period_
    ) internal pure returns (uint256) {
        uint256 depositTokenAmount = stakeNftPrice_
            .mul(maxStakedNfts_)
            .mul(apr_)
            .mul(period_)
            .div(YEAR_TIMESTAMP)
            .div(PERCENTS_DIVIDER);
        return depositTokenAmount;
    }

    function withdrawCoin() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "insufficient balance");
        (bool result, ) = payable(msg.sender).call{value: balance}("");
        require(result, "Failed to withdraw balance");
    }

    /**
     * @dev To receive ETH
     */
    receive() external payable {}
}
