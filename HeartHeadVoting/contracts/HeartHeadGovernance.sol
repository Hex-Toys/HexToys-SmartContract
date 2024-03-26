// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HeartHeadGovernance is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    Ownable
{
    mapping(address => bool) public whitelisted;

    constructor(
        IVotes _token,
        address initialOwner
    )
        Governor("HeartHeadGovernance")
        GovernorSettings(1, 181440, 369)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(0)
        Ownable(initialOwner)
    {}

    function whitelist(address _user, bool _iswhitelisted) external onlyOwner {
        whitelisted[_user] = _iswhitelisted;
    }

    // The following functions are overrides required by Solidity.
    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public override returns (uint256) {
        require(whitelisted[msg.sender], "Unauthorized");
        return super.propose(targets, values, calldatas, description);
    }

    function votingDelay()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(
        uint256 blockNumber
    )
        public
        view
        override(Governor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }
}
