import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

task("balanceOf", "Balance")
.addParam("account", "Account address")
.setAction(async (taskArgs) => {

const token = await ethers.getContractAt(process.env.TOKEN_NAME, process.env.TOKEN_ADDRESS);

const balance = await token.balanceOf(taskArgs.account);
console.log(`Account ${taskArgs.account} has a token balance:  ${balance}`);

});

export default  {};