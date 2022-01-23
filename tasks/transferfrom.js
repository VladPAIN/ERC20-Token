require("@nomiclabs/hardhat-ethers");

task("transferfrom", "ERC-20 transferFrom")
    .addParam("recipient", "Recipient address")
    .addParam("amount", "Token amount")
    .setAction(async (taskArgs) => {

      const token = await ethers.getContractAt('Token', '0x05Fe2b1966963Ac4f7C022Cd5350ba409C92d9d4');

      const [sender] = await ethers.getSigners();
     
      console.log(taskArgs.recipient, await token.balanceOf(taskArgs.recipient));
      console.log(await token.balanceOf(sender.address));

      await (await token.connect(sender).transferFrom(sender.address, taskArgs.recipient, ethers.utils.parseUnits(taskArgs.amount, 18))).wait();
      console.log(`${taskArgs.recipient} has received ${taskArgs.amount} tokens from ${sender.address}`);

      console.log(taskArgs.recipient, await token.balanceOf(taskArgs.recipient));
      console.log(await token.balanceOf(sender.address));
      console.log(await token.allowance(sender.address, taskArgs.recipient));


    });

module.exports = {};