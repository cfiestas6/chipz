import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestFan is ERC20 {
    constructor(uint256 initialSupply) ERC20("TFan", "TestFan") {
        _mint(msg.sender, initialSupply);
    }
function decimals() public view virtual override returns (uint8) {
  return 0;
}

}
