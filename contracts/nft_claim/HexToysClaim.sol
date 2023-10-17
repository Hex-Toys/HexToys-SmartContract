//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

/**
 * @title Claim based smart contract
 * @notice Transfer nft token in ERC721 or ERC1155
 * @author HexToys Inc.
 */

contract HexToysClaim is Ownable, ERC1155Holder {
    /// @dev Struct for claim
    /// @param claimId The claim Id
    /// @param colAddr which collection
    /// @param tokenId The nft token Id for the specific collection
    /// @param from Who claimed
    /// @param amount the claimed token amount
    /// @param timestamp the claimed timestamp
    struct RewardClaim {
        uint256 claimId;
        address colAddr;
        uint256 tokenId;
        address from;
        uint256 amount;
        uint256 timestamp;
    }

    /// @dev Array of claims
    RewardClaim[] public rewardClaims;

    mapping(uint256 => bool) isClaimed;
    address public colAddr;
    address public signerAddress;

    /// @dev Events
    event UserClaimed(RewardClaim rewardClaim);

    error InvalidSignature();
    error InvalidSignatureLength();

    constructor (address _colAddr, address _signerAddress) {		
		colAddr = _colAddr;
        signerAddress = _signerAddress;
	}

    function setCollectionAddress(address _colAddr) external onlyOwner {
        require(_colAddr != address(0x0), "invalid address");
        colAddr = _colAddr;
        delete rewardClaims;
    }

    function setSignerAddress(address _signerAddress) external onlyOwner {
        require(_signerAddress != address(0x0), "invalid address");
        signerAddress = _signerAddress;
    }

    function emergencyTransfer(address _toAddr, uint256 _tokenId, uint256 _amount) external onlyOwner {
        // PRC1155 transfer
        IERC1155 nft = IERC1155(colAddr);
        nft.safeTransferFrom(address(this), _toAddr, _tokenId, _amount, "");
    }

    function emergencyBatchTransfer(address _toAddr, uint256[] memory _tokenIds, uint256[] memory _amounts) external onlyOwner {
        // PRC1155 transfer
        IERC1155 nft = IERC1155(colAddr);
        nft.safeBatchTransferFrom(address(this), _toAddr, _tokenIds, _amounts, "");
    }

    /// @dev Function to claim
    function claim(
        uint256 _claimId,
        address _colAddr,
        uint256 _tokenId,
        address _from,
        uint256 _amount,
        uint256 timestamp,
        bytes memory signature_
    ) external onlyOwner {
        require(!isClaimed[_claimId], "Already requested");
        bytes32 hashMessage = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                keccak256(
                    abi.encodePacked(
                        _claimId,
                        _colAddr,
                        _tokenId,
                        _from,
                        _amount,
                        timestamp
                    )
                )
            )
        );

        if (recoverSigner(hashMessage, signature_) != signerAddress)
            revert InvalidSignature();

        // PRC1155 transfer
        IERC1155 nft = IERC1155(_colAddr);
        nft.safeTransferFrom(_from, address(this), _tokenId, _amount, "");

        isClaimed[_claimId] = true;

        RewardClaim memory rewardClaim = RewardClaim(
            _claimId,
            _colAddr,
            _tokenId,
            _from,
            _amount,
            timestamp
        );
        rewardClaims.push(rewardClaim);

        emit UserClaimed(rewardClaim);
    }

    function recoverSigner(
        bytes32 ethSignedMessageHash_,
        bytes memory signature_
    ) private pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(signature_);
        return ecrecover(ethSignedMessageHash_, v, r, s);
    }

    function splitSignature(
        bytes memory sig_
    ) private pure returns (bytes32 r, bytes32 s, uint8 v) {
        if (sig_.length != 65) revert InvalidSignatureLength();

        assembly {
            r := mload(add(sig_, 32))
            s := mload(add(sig_, 64))
            v := byte(0, mload(add(sig_, 96)))
        }
    }

}
