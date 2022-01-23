require("@nomiclabs/hardhat-ethers");

task("balanceOf", "Balance")
.addParam("account", "Account address")
.setAction(async (taskArgs) => {

const token = await ethers.getContractAt('Token', '0x05Fe2b1966963Ac4f7C022Cd5350ba409C92d9d4');

const [minter] = await ethers.getSigners();
const balance = (await (await token.connect(minter)).balanceOf(taskArgs.account)).toNumber();
console.log(`Account ${taskArgs.account} has a token balance:  ${balance}`);

});

module.exports = {};