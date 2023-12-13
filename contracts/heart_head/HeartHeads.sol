// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HeartHeads is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    mapping(uint256 => address) private _tokenOwner;
    mapping(string => uint256) public tokenLimits;
    uint256 public nftprice = 0.01 ether;
    uint256 public totalrandommint;
    string[] private tokenURIs;

    event TokenURIsAdded(string[] tokenURIs, uint256[] limits);
    event TokenMinted(uint256 tokenId, string tokenURI);
    event MetadataUrlUpdated(uint256 tokenId, string newMetadataUrl);

    constructor() ERC721("HeartHeads", "Heart") Ownable(msg.sender) {}

    function removeTokenURI(string memory uri) internal {
        for (uint256 i = 0; i < tokenURIs.length; i++) {
            if (
                keccak256(abi.encodePacked(tokenURIs[i])) ==
                keccak256(abi.encodePacked(uri))
            ) {
                delete tokenLimits[uri];
                tokenURIs[i] = tokenURIs[tokenURIs.length - 1];
                tokenURIs.pop();
                break;
            }
        }
    }

    function addRandomTokenURIs(
        string[] memory newTokenURIs,
        uint256[] memory limits
    ) external onlyOwner {
        require(
            newTokenURIs.length == limits.length,
            "Length mismatch between tokenURIs and limits"
        );
        emit TokenURIsAdded(newTokenURIs, limits);
        for (uint256 i = 0; i < newTokenURIs.length; i++) {
            tokenURIs.push(newTokenURIs[i]);
            tokenLimits[newTokenURIs[i]] = limits[i];
        }
    }

    function getRandomTokenURI() internal view returns (string memory) {
        require(tokenURIs.length > 0, "No token URIs available");

        uint256 randomIndex = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty))
        ) % tokenURIs.length;
        return tokenURIs[randomIndex];
    }

    function setNftPrice(uint256 newPrice) public onlyOwner {
        nftprice = newPrice;
    }

    function safeMintWithRandomTokenURI() external payable returns (uint256) {
        require(msg.value >= nftprice, "require 0.01 PLS token to Mint NFT");
        string memory randomTokenURI = getRandomTokenURI();
        uint256 limit = tokenLimits[randomTokenURI];

        require(limit > 0, "Token limit reached");

        uint256 tokenId = safeMint(randomTokenURI);
        totalrandommint++;
        tokenLimits[randomTokenURI]--;
        if (tokenLimits[randomTokenURI] == 0) {
            removeTokenURI(randomTokenURI);
        }
        emit TokenMinted(tokenId, randomTokenURI);
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
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function withdrawContractBalance() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract balance is zero");

        payable(owner()).transfer(contractBalance);
    }
}
