/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require('@nomiclabs/hardhat-waffle');
 require("@nomiclabs/hardhat-etherscan");
 require('solidity-coverage');
 require('dotenv').config();
 require("@nomiclabs/hardhat-web3");
 require("@nomiclabs/hardhat-ethers");

 require("./tasks/accounts");
 require("./tasks/approve");
 require("./tasks/balance");
 require("./tasks/balanceof");
 require("./tasks/transfer");
 require("./tasks/transferfrom");

module.exports = {
  solidity: "0.8.10",
  networks: {
    kovan: {
      url: `${process.env.KOVAN_API_KEY}`,
      accounts: [`${process.env.PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: `${process.env.YOUR_ETHERSCAN_API_KEY}`
  }
};