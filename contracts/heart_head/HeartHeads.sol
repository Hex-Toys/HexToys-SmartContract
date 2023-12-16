// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HeartHeads is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    mapping(uint256 => address) private _tokenOwner;

    mapping(uint256 => string) public randomURI;
    uint256 public uriIndex;

    uint256 public nftprice = 0.01 ether;
    uint256 public totalrandommint;

    event TokenURIsAdded(string[] tokenURIs);
    event TokenMinted(uint256 tokenId, string tokenURI);
    event MetadataUrlUpdated(uint256 tokenId, string newMetadataUrl);

    constructor() ERC721("HeartHeads", "Heart") {}

    function removeTokenURI(uint256 _randomindex) internal {
        randomURI[_randomindex] = randomURI[uriIndex - 1];
        delete randomURI[uriIndex - 1];
        uriIndex--;
    }

    function addRandomTokenURIs(
        string[] memory newTokenURIs
    ) external onlyOwner {
        require(newTokenURIs.length > 0, "Empty array");
        emit TokenURIsAdded(newTokenURIs);
        for (uint256 i = uriIndex; i < uriIndex + newTokenURIs.length; i++) {
            randomURI[i] = newTokenURIs[i - uriIndex];
        }
        uriIndex = uriIndex + newTokenURIs.length;
    }

    function getRandomTokenURI() internal view returns (uint256) {
        require(uriIndex > 0, "No token URIs available");

        uint256 randomIndex = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.difficulty,
                    _nextTokenId
                )
            )
        ) % uriIndex;
        return randomIndex;
    }

    function setNftPrice(uint256 newPrice) public onlyOwner {
        nftprice = newPrice;
    }

    function safeMintWithRandomTokenURI() external payable returns (uint256) {
        require(msg.value >= nftprice, "require 0.01 PLS token to Mint NFT");
        uint256 _randomindex = getRandomTokenURI();
        uint256 tokenId = safeMint(randomURI[_randomindex]);
        totalrandommint++;

        emit TokenMinted(tokenId, randomURI[_randomindex]);
        removeTokenURI(_randomindex);

        return tokenId;
    }

    function safeMint(string memory uri) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        _tokenOwner[tokenId] = msg.sender;

        return tokenId;
    }

    function updateMetadataUrl(
        uint256 tokenId,
        string memory newMetadataUrl
    ) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of the token");
        _setTokenURI(tokenId, newMetadataUrl);
        emit MetadataUrlUpdated(tokenId, newMetadataUrl);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return
            ERC721.supportsInterface(interfaceId) ||
            ERC721URIStorage.supportsInterface(interfaceId);
    }

    function _burn(
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function withdrawContractBalance() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract balance is zero");

        payable(owner()).transfer(contractBalance);
    }
}
