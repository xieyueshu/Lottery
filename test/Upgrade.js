const { expect } = require("chai");

describe("Lottery Upgrade Test", function() {
  it('works', async () => {
    const Lottery = await ethers.getContractFactory("Lottery");
    const LotteryV2 = await ethers.getContractFactory("LotteryV2");

    const instance = await upgrades.deployProxy(Lottery);
    const upgraded = await upgrades.upgradeProxy(instance.address, LotteryV2);

    const betMinAmountOld = instance.betMinAmount();
    await upgraded.resetBet(2);
    const betMinAmountNew = instance.betMinAmount();
    expect(betMinAmountOld).to.equal(1*10^18);
    expect(betMinAmountNew).to.equal(2*10^18);
  });
});
