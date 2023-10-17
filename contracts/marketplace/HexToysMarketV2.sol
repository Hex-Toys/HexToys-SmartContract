// Multiple Fixed Price Marketplace contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../signature/Signature.sol";

interface IPRC1155 {
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external;
    function balanceOf(address account, uint256 id) external view returns (uint256);
    function isApprovedForAll(address account, address operator) external view returns (bool);
}

interface IPRC721 {
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function ownerOf(uint256 tokenId) external view returns (address);
    function isApprovedForAll( address owner, address operator) external view returns (bool);
}

contract HexToysMarketV2 is Ownable, ERC1155Holder, Signature {
    using SafeMath for uint256;

    mapping (address => uint256) public nonce;

    struct TrxEvent {
        address buyer;
        address seller;
        string productType; // pair/auction
        uint256 productId;
        uint256 tokenId;
        address collection;
        uint256 amount;
        uint256 price;
        address tokenAddr;
    }

    uint256 public constant PERCENTS_DIVIDER = 1000;
    uint256 public swapFee;
    address public feeAddress;
    address public signerAddress;

    event Sold(TrxEvent soldEvent);

    constructor (address _feeAddress, address _signerAddress) {		
		require(_feeAddress != address(0), "Invalid commonOwner");
        feeAddress = _feeAddress;
        signerAddress = _signerAddress;
        swapFee = 21; // 2.1% 	
	}    

    function setSignerAddress(address _signerAddress) external onlyOwner {
        require(_signerAddress != address(0x0), "invalid address");
        signerAddress = _signerAddress;
    }

    function setFeePercent(uint256 _swapFee) external onlyOwner {
        require(_swapFee < 100, "invalid percent");
        swapFee = _swapFee;
    }

    function setFeeAddress(address _address) external onlyOwner {
        require(_address != address(0x0), "invalid address");
        feeAddress = _address;
    }
    
    function buyNFT(address collection,
        uint256 tokenId,
        uint256 productId,
        uint256 amount,
        uint256 price,
        address tokenAddr,
        address seller,
        uint256 nftType, 
        uint256[] memory _royaltyArray,
        address[] memory _receiverArray,
        bytes memory _signature
        ) external payable {
        
        confirmSignature(
            collection,
            tokenId,
            productId,
            amount,
            price,
            tokenAddr,
            msg.sender,
            seller,
            nonce[msg.sender],
            _royaltyArray,
            _receiverArray,
            _signature,
            signerAddress
        );
       
       // distribut token to owner, admin, royalty receivers
        {
            uint256 tokenAmount = price.mul(amount);
            uint256 feeAmount = tokenAmount.mul(swapFee).div(PERCENTS_DIVIDER);
            uint256 ownerAmount = tokenAmount.sub(feeAmount);

            uint256 royaltyCount = _royaltyArray.length;

            if (tokenAddr == address(0x0)) {
                require(msg.value >= tokenAmount, "too small amount");
                // send service fee
                if (swapFee > 0) {
                    (bool result, ) = payable(feeAddress).call{ value: feeAmount}("");
                    require(result);
                }

                // send royalties
                for (uint256 i = 0; i < royaltyCount; i++) {
                    uint256 royaltyAmount = tokenAmount.mul(_royaltyArray[i]).div(PERCENTS_DIVIDER);                    
                    if (royaltyAmount > 0) {
                        (bool result, ) = payable(_receiverArray[i]).call{value: royaltyAmount}("");
                        require(result);
                        ownerAmount = ownerAmount.sub(royaltyAmount);
                    }
                }

                // send coin to nft owner
                (bool result1, ) = payable(seller).call{value: ownerAmount}("");
                require(result1);
            } else {
                IERC20 governanceToken = IERC20(tokenAddr);

                // send token from user to contract                
                require(governanceToken.transferFrom(msg.sender, address(this), tokenAmount), "in sufficiant token amount");

                // send service fee
                if (swapFee > 0) {
                    require(governanceToken.transfer(feeAddress, feeAmount), "send service fee failed");
                }

                // send royalties
                for (uint256 i = 0; i < royaltyCount; i++) {
                    uint256 royaltyAmount = tokenAmount.mul(_royaltyArray[i]).div(PERCENTS_DIVIDER);
                    
                    if (royaltyAmount > 0) {
                        require(governanceToken.transfer(_receiverArray[i], royaltyAmount), "send royality failed");
                        ownerAmount = ownerAmount.sub(royaltyAmount);
                    }
                }
                // transfer token to owner
                require(governanceToken.transfer(seller, ownerAmount));
            }
        }
        {
            if (nftType == 0) {
                // PRC721 transfer
                IPRC721 nft = IPRC721(collection);
                require(nft.isApprovedForAll(seller, address(this)), "Not approve nft to staker address"); 

                require(nft.ownerOf(tokenId) == seller, "seller don't own nft");

                nft.safeTransferFrom( seller, msg.sender, tokenId);             
            } else {
                // PRC1155 transfer
                IPRC1155 nft = IPRC1155(collection);
                require(nft.isApprovedForAll(seller, address(this)), "Not approve nft to staker address");

                uint256 nft_token_balance = nft.balanceOf(seller, tokenId);
                require(nft_token_balance >= amount, "seller don't own enough balance");

                nft.safeTransferFrom(seller, msg.sender, tokenId, amount, "");
            }
        }
        {
            nonce[msg.sender] = nonce[msg.sender].add(1);

            TrxEvent memory soldEvent;
            soldEvent.buyer = msg.sender;
            soldEvent.seller = seller;
            soldEvent.productType = "pair";
            soldEvent.productId = productId;
            soldEvent.tokenId = tokenId;
            soldEvent.collection = collection;
            soldEvent.amount = amount;
            soldEvent.price = price;
            soldEvent.tokenAddr = tokenAddr;

            emit Sold(soldEvent);    
        }       
    }

    function finalizeAuction(address collection,
        uint256 tokenId,
        uint256 productId,
        uint256 price,
        address tokenAddr,
        address seller,
        address bidder,
        uint256[] memory _royaltyArray,
        address[] memory _receiverArray,
        bytes memory _signature) public {

        require( msg.sender == seller || msg.sender == owner(), "only auction owner can finalize" );

        confirmSignature(
            collection,
            tokenId,
            productId,
            1,
            price,
            tokenAddr,
            bidder,
            seller,
            nonce[msg.sender],
            _royaltyArray,
            _receiverArray,
            _signature,
            signerAddress
        );
       
       // distribut token to owner, admin, royalty receivers
        {
            uint256 tokenAmount = price;
            uint256 feeAmount = tokenAmount.mul(swapFee).div(PERCENTS_DIVIDER);
            uint256 ownerAmount = tokenAmount.sub(feeAmount);

            uint256 royaltyCount = _royaltyArray.length;
            
            IERC20 governanceToken = IERC20(tokenAddr);
            // send token from user to contract                
            require(governanceToken.transferFrom(bidder, address(this), tokenAmount), "in sufficiant token amount");

            // send service fee
            if (swapFee > 0) {
                require(governanceToken.transfer(feeAddress, feeAmount), "send service fee failed");
            }

            // send royalties
            for (uint256 i = 0; i < royaltyCount; i++) {
                uint256 royaltyAmount = tokenAmount.mul(_royaltyArray[i]).div(PERCENTS_DIVIDER);
                
                if (royaltyAmount > 0) {
                    require(governanceToken.transfer(_receiverArray[i], royaltyAmount), "send royality failed");
                    ownerAmount = ownerAmount.sub(royaltyAmount);
                }
            }
            // transfer token to owner
            require(governanceToken.transfer(seller, ownerAmount));
        
        }

        // PRC721 transfer
        IPRC721 nft = IPRC721(collection);
        require(nft.isApprovedForAll(seller, address(this)), "Not approve nft to staker address");
        require(nft.ownerOf(tokenId) == seller, "seller don't own nft");

        nft.safeTransferFrom( seller, bidder, tokenId);

        nonce[msg.sender] = nonce[msg.sender].add(1);
        TrxEvent memory soldEvent;
        soldEvent.buyer = bidder;
        soldEvent.seller = seller;
        soldEvent.productType = "auction";
        soldEvent.productId = productId;
        soldEvent.tokenId = tokenId;
        soldEvent.collection = collection;
        soldEvent.amount = 1;
        soldEvent.price = price;
        soldEvent.tokenAddr = tokenAddr;

        emit Sold(soldEvent);           
    }
}
