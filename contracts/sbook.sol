// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BetPool {
    address public owner;
    enum Outcome { HomeWin, HomeLoss, Draw }

    struct Pool {
        bool exists;
        uint matchId; // Unique identifier for the match
        mapping(Outcome => uint) totalBets; // Total bets for each outcome
        mapping(address => mapping(Outcome => uint)) userBets; // User bets for each outcome
        bool outcomeSet;
        Outcome winningOutcome;
    }

    mapping(uint => Pool) public pools; // Pool ID to Pool
    mapping(uint => uint) public matchToPoolId; // Match ID to Pool ID
    uint public nextPoolId;

    // Events
    event PoolCreated(uint poolId, uint matchId);
    event BetPlaced(uint poolId, address user, Outcome outcome, uint amount);
    event OutcomeSet(uint poolId, Outcome winningOutcome);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    function createPool(uint _matchId) external onlyOwner returns (uint poolId) {
        require(matchToPoolId[_matchId] == 0, "Match ID already has a pool.");
        poolId = nextPoolId++;

        Pool storage pool = pools[poolId];
        pool.exists = true;
        pool.matchId = _matchId;

        matchToPoolId[_matchId] = poolId;

        emit PoolCreated(poolId, _matchId);
        return poolId;
    }

    function bet(uint poolId, Outcome outcome) external payable {
        Pool storage pool = pools[poolId];
        require(pool.exists, "Pool does not exist.");
        require(msg.value > 0, "Sent value does not match bet amount or is zero.");
        require(!pool.outcomeSet, "Outcome has already been set.");

        pool.totalBets[outcome] += msg.value;
        pool.userBets[msg.sender][outcome] += msg.value;

        emit BetPlaced(poolId, msg.sender, outcome, msg.value);
    }

    function setOutcome(uint poolId, Outcome winningOutcome) external onlyOwner {
        Pool storage pool = pools[poolId];
        require(pool.exists, "Pool does not exist.");
        require(!pool.outcomeSet, "Outcome has already been set.");

        pool.winningOutcome = winningOutcome;
        pool.outcomeSet = true;

        emit OutcomeSet(poolId, winningOutcome);
    }

    function claimReward(uint poolId) external {
        Pool storage pool = pools[poolId];
        require(pool.exists, "Pool does not exist.");
        require(pool.outcomeSet, "Outcome has not been set.");
        uint userBet = pool.userBets[msg.sender][pool.winningOutcome];
        require(userBet > 0, "No winning bet.");

        uint totalPoolBet = getTotalBet(poolId);
        uint totalWinningBet = pool.totalBets[pool.winningOutcome];
        uint reward = (userBet * totalPoolBet) / totalWinningBet;

        pool.userBets[msg.sender][pool.winningOutcome] = 0;

        payable(msg.sender).transfer(reward);
    }

    function getTotalBet(uint poolId) public view returns (uint) {
        Pool storage pool = pools[poolId];
        return pool.totalBets[Outcome.HomeWin] + pool.totalBets[Outcome.HomeLoss] + pool.totalBets[Outcome.Draw];
    }
}

