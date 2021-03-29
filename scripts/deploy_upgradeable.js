// scripts/deploy_upgradeable_box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const Lottery = await ethers.getContractFactory("Lottery");
  console.log("Deploying Lottery...");
  const lottery = await upgrades.deployProxy(Lottery);
  await lottery.deployed();
  console.log("Lottery deployed to:", lottery.address);
}

main();