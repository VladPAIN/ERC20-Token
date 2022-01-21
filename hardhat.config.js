/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require('@nomiclabs/hardhat-waffle');
 require("@nomiclabs/hardhat-etherscan");
 require('solidity-coverage');
 require('dotenv').config();
 require("@nomiclabs/hardhat-web3");

 task("accounts", "Prints accounts", async (_, { web3 }) => {
  
  console.log(await web3.eth.getAccounts());
  
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
});

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