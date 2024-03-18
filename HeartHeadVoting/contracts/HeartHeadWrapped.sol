// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721, ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Votes} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";
import {ERC721Wrapper} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Wrapper.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";

contract HeartHeadWrapped is ERC721, EIP712, ERC721Votes, ERC721Wrapper {
    constructor(
        IERC721 wrappedToken
    )
        ERC721("HeartHeadWrapped", "HHW")
        EIP712("HeartHeadWrapped", "HHW")
        ERC721Wrapper(wrappedToken)
    {}

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Votes) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Votes) {
        super._increaseBalance(account, value);
    }

    function nonces(
        address owner
    ) public view virtual override(Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}
