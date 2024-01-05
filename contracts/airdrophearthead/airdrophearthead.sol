// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../heart_head/HeartHeads.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract AirdropHeartHead is Ownable, IERC721Receiver {
    address public hearhead;

    constructor(address _hearhead) {
        hearhead = _hearhead;
    }

    function airdrop(address[] calldata _user, string calldata _uri) external {
        require(_user.length > 0, "Invalid input");
        for (uint i = 0; i < _user.length; i++) {
            uint256 tokenId = HeartHeads(hearhead).safeMint(_uri);
            HeartHeads(hearhead).safeTransferFrom(
                address(this),
                _user[i],
                tokenId
            );
        }
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        // Implement your custom logic here
        // For example, you can log the successful transfer
        // or perform additional actions
        emit ERC721Received(operator, from, tokenId, data);
        return this.onERC721Received.selector;
    }

    event ERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes data
    );
}
