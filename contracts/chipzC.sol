// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./inter.sol"; // Make sure this import path is correct for ISimplifiedERC20 interface

contract chipzSports {
    address public owner;
    mapping(address => uint) public feesByToken; // Track accumulated fees by token address

    struct Pool {
        uint endTime;
        ISimplifiedERC20 token1;
        ISimplifiedERC20 token2;
        uint totalBetsToken1;
        uint totalBetsToken2;
        uint rewardPool; // Total reward pool for the winning side
        int outcome; // 0 = not set, 1 = token1 wins, 2 = token2 wins
    }

    struct Bet {
        uint amount;
        uint team; // 1 for token1, 2 for token2
    }

    mapping(uint => Pool) public pools;
    mapping(uint => mapping(address => Bet)) public bets;
    uint public nextPoolId;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function createPool(uint _endTime, ISimplifiedERC20 _token1, ISimplifiedERC20 _token2, uint _rewardAmount) external onlyOwner {
        //require(_endTime > block.timestamp, "End time must be in the future");
        uint poolId = nextPoolId++;
        pools[poolId] = Pool(_endTime, _token1, _token2, 0, 0, _rewardAmount, 0); // Initialize pool with reward amount
    }

    function fundPool(uint _poolId, uint _amount, ISimplifiedERC20 _rewardToken) public onlyOwner {
        Pool storage pool = pools[_poolId];
        //require(pool.endTime > block.timestamp, "Cannot fund after pool has started");
         require(
        pool.token1.transferFrom(msg.sender, address(this), _amount),
        "Token transfer failed"
        );
        uint fee = _amount * 5 / 100; // Calculate 5% fee
        uint rewardAmountAfterFee = _amount - fee;
        
        _rewardToken.transferFrom(msg.sender, address(this), _amount); // Transfer the full amount to the contract
        pool.rewardPool += rewardAmountAfterFee; // Update the pool's reward pool

        feesByToken[address(_rewardToken)] += fee; // Accumulate fees for the reward token
    }

    function placeBet(uint _poolId, uint _team, uint _amount) external {
        Pool storage pool = pools[_poolId];
        //require(block.timestamp < pool.endTime, "Betting is closed");
        require(_team == 1 || _team == 2, "Invalid team");

        ISimplifiedERC20 token = _team == 1 ? pool.token1 : pool.token2;
        token.transferFrom(msg.sender, address(this), _amount);

        if (_team == 1) {
            pool.totalBetsToken1 += _amount;
        } else {
            pool.totalBetsToken2 += _amount;
        }

        bets[_poolId][msg.sender] = Bet(_amount, _team);
    }

    function setOutcome(uint _poolId, uint _winningTeam) external onlyOwner {
        Pool storage pool = pools[_poolId];
        //require(block.timestamp > pool.endTime, "Betting is not yet closed");
        require(_winningTeam == 1 || _winningTeam == 2, "Invalid team");
        require(pool.outcome == 0, "Outcome already set");

        pool.outcome = int(_winningTeam);
    }

function claimReward(uint _poolId) external {
    Pool storage pool = pools[_poolId];
    require(pool.outcome != 0, "Outcome not set");
    Bet storage bet = bets[_poolId][msg.sender];
    require(bet.amount > 0, "No bet placed");
    require(bet.team == uint(pool.outcome), "Did not bet on winning team");

    // Calculate the share of the pool this bet should receive. This calculation needs careful adjustment
    // for tokens with 0 decimals to ensure it doesn't result in fractional tokens.
    uint totalWinningBets = (pool.outcome == 1) ? pool.totalBetsToken1 : pool.totalBetsToken2;
    require(totalWinningBets > 0, "No winning bets");

    // Ensure the reward calculation is adjusted for 0 decimal tokens. With 0 decimal tokens,
    // we avoid division that could result in fractions.
    uint rewardShare = (bet.amount * pool.rewardPool) / totalWinningBets;
    // Ensure reward does not exceed the bet amount for 0 decimal tokens
    if (rewardShare > bet.amount) {
        rewardShare = bet.amount;
    }

    uint rewardAmount = rewardShare; // Adjusted for 0 decimals
    require(rewardAmount <= pool.rewardPool, "Reward exceeds pool balance");

    ISimplifiedERC20 token = (bet.team == 1) ? pool.token1 : pool.token2;

    // Simplify the transfer logic to directly transfer the reward amount.
    require(token.transfer(msg.sender, rewardAmount), "Reward transfer failed");

    // Adjust the pool's reward pool and user's bet record.
    pool.rewardPool -= rewardAmount;
    delete bets[_poolId][msg.sender];
}


    function withdrawFees(ISimplifiedERC20 _feeToken, uint _amount) external onlyOwner {
        uint availableFees = feesByToken[address(_feeToken)];
        require(_amount <= availableFees, "Insufficient fees");

        _feeToken.transfer(owner, _amount);
        feesByToken[address(_feeToken)] -= _amount; // Update the remaining fees
    }
}

