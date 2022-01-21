/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require('@nomiclabs/hardhat-waffle');
 require("@nomiclabs/hardhat-etherscan");
 require('solidity-coverage');
 require('dotenv').config();
 require("@nomiclabs/hardhat-web3");
 require("@nomiclabs/hardhat-ethers");

 task("mint", "Mints a token")
  .addParam("address", "The address to receive a token")
  .addParam("amount", "The amount of token")
  .setAction(async (taskArgs) => {

    Token = await ethers.getContractFactory('Token');
    token = await Token.deploy();

    await token.mint(taskArgs.address, taskArgs.amount);
    console.log("Balance" ,taskArgs.address, "after mint:", await token.balanceOf(taskArgs.address));
    console.log("TotalSupply after mint:", await token.totalSupply());
});

task("approve", "Approve a tokens")
  .addParam("address", "The address to receive a token")
  .addParam("amount", "The amount of token")
  .setAction(async (taskArgs) => {

    let Token, token, owner, addr1, addr2;

    Token = await ethers.getContractFactory('Token');
    token = await Token.deploy();
    [owner, addr1, addr2, _] = await ethers.getSigners();

    console.log("Allowance before approve:", await token.allowance(owner.address, taskArgs.address));
    await token.approve(taskArgs.address, taskArgs.amount);
    console.log("Allowance after approve:", await token.allowance(owner.address, taskArgs.address));
});

task("transfer", "Transfer token to address")
.addParam("address", "The address to receive a token")
.addParam("amount", "The amount of token")
.setAction(async (taskArgs) => {

  Token = await ethers.getContractFactory('Token');
  token = await Token.deploy();

  console.log("Balance before transfer:", await token.balanceOf(taskArgs.address));
  await token.transfer(taskArgs.address, taskArgs.amount);
  console.log("Balance after transfer:", await token.balanceOf(taskArgs.address));
});

task("transferFrom", "Transfer token from addressfrom to addressto")
.addParam("addressfrom", "Sender address")
.addParam("addressto", "Recipient address")
.addParam("amount", "The amount of token")
.setAction(async (taskArgs) => {

  Token = await ethers.getContractFactory('Token');
  token = await Token.deploy();

  console.log("Balance addressfrom before transferFrom:", await token.balanceOf(taskArgs.addressfrom));
  console.log("Balance addressto before transferFrom:", await token.balanceOf(taskArgs.addressto));

  await token.approve(taskArgs.addressfrom, taskArgs.amount);
  await token.transferFrom(taskArgs.addressfrom, taskArgs.addressto, taskArgs.amount);

  console.log("Balance addressfrom after transferFrom:", await token.balanceOf(taskArgs.addressfrom));
  console.log("Balance addressto after transferFrom:", await token.balanceOf(taskArgs.addressto));
});

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
