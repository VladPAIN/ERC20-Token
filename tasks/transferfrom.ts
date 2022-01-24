import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

task("transferfrom", "ERC-20 transferFrom")
    .addParam("recipient", "Recipient address")
    .addParam("amount", "Token amount")
    .setAction(async (taskArgs) => {

      const token = await ethers.getContractAt(process.env.TOKEN_NAME, process.env.TOKEN_ADDRESS);

      const [sender] = await ethers.getSigners();
     
      console.log(taskArgs.recipient, await token.balanceOf(taskArgs.recipient));
      console.log(await token.balanceOf(sender.address));

      await (await token.connect(sender).transferFrom(sender.address, taskArgs.recipient, ethers.utils.parseUnits(taskArgs.amount, process.env.TOKEN_DECIMALS))).wait();
      console.log(`${taskArgs.recipient} has received ${taskArgs.amount} tokens from ${sender.address}`);

      console.log(taskArgs.recipient, await token.balanceOf(taskArgs.recipient));
      console.log(await token.balanceOf(sender.address));
      console.log(await token.allowance(sender.address, taskArgs.recipient));


    });

export default  {};