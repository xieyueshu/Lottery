require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

module.exports = {
  solidity: "0.6.3",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
      //ToFixed: MetaMask chainId issue
      chainId: 1337
    },
    rinkeby: {
      url: "http://localhost:8545",
      accounts: ["0xdb....", "0x3b...."]
    }
  },
  // solidity: {
  //   version: "0.5.15",
  //   settings: {
  //     optimizer: {
  //       enabled: true,
  //       runs: 200
  //     }
  //   }
  // },
  // paths: {
  //   sources: "./contracts",
  //   tests: "./test",
  //   cache: "./cache",
  //   artifacts: "./artifacts"
  // },
  // mocha: {
  //   timeout: 20000
  // }
};
