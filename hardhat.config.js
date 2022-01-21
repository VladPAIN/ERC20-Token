/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require('@nomiclabs/hardhat-waffle');
 require("@nomiclabs/hardhat-etherscan");
 require('solidity-coverage');
 require('dotenv').config();

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
