require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-ethers");

task("accounts", "Prints accounts", async (_, { web3 }) => {
  
    console.log(await web3.eth.getAccounts());
    
  });

  module.exports = {};