//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity >=0.6.0;

//import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/upgrades-core/contracts/Initializable.sol";


contract LotteryV2 is Initializable {
    
    address owner;
    
    uint public firstPrizeMaxAmount;
    uint public secondPrizeMaxAmount;
    
    //
    uint public betMinAmount;
    
    // prize pool
    uint public jackpot;
    
    // you win event
    event YouWin(address indexed user, uint indexed lotNumber, uint indexed level, uint amount);
    event YouLost(address indexed user, uint indexed lotNumber);
    
    function initialize() initializer public {
        //for constructor content
        firstPrizeMaxAmount = 500*10**18;
        secondPrizeMaxAmount = 5*10**18;
        betMinAmount = 1*10**18;
    }

    function lotNumber() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 10000;
    }
    
    function placeBet(uint _placeNumber) public payable{
        require(msg.value == betMinAmount, "invalid bet amount!");
        require(_placeNumber > 0 && _placeNumber < 10000, "invalid place number!");
        jackpot += msg.value;
        uint _lotNumber = lotNumber();
        if(_placeNumber == _lotNumber){
            //firstPrize
            uint _winAmount = jackpot > firstPrizeMaxAmount ? firstPrizeMaxAmount:jackpot;
            msg.sender.transfer(_winAmount);
            jackpot-=_winAmount;
            emit YouWin(msg.sender,_lotNumber,1,_winAmount);
        }else{
            uint[2] memory _placePatterns = [_placeNumber%1000, _placeNumber/10];
            uint[2] memory _lotPatterns = [_lotNumber%1000, _lotNumber/10];
            bool _isWin = false;
            for(uint i=0;i<_placePatterns.length;i++){
                if(_isWin)break;
                for(uint j=0;j<_lotPatterns.length;j++){
                    if(_isWin)break;
                    if(_placePatterns[i] == _lotPatterns[j])
                        _isWin = true;
                }
            }
            if(_isWin){
                //secondPrize
                uint _winAmount = jackpot > secondPrizeMaxAmount ? secondPrizeMaxAmount:jackpot;
                msg.sender.transfer(_winAmount);
                jackpot-=_winAmount;
                emit YouWin(msg.sender,_lotNumber,2,_winAmount);
            
            }else{
                //no award
                emit YouLost(msg.sender,_lotNumber);
            }
        }
    }    

    //test for upgrade function
    function resetBet(uint _betMinAmount) public {
        betMinAmount = _betMinAmount * 10**18;
    }
}