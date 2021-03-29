// scripts/upgrade_box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const LotteryV2 = await ethers.getContractFactory("LotteryV2");
  console.log("Upgrading Lottery...");
  const lotteryV2 = await upgrades.upgradeProxy("0xcfc29d67de79c85b6c27fb9E69b552839553C084", LotteryV2);
  console.log("Box upgraded:" + lotteryV2.address);
}

main();