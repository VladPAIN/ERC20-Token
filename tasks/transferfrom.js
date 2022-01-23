require("@nomiclabs/hardhat-ethers");

task("transferfrom", "ERC-20 transferFrom")
    .addParam("sender", "Sender address")
    .addParam("recipient", "Recipient address")
    .addParam("amount", "Token amount")
    .setAction(async (taskArgs) => {

      const token = await ethers.getContractAt('Token', '0x05Fe2b1966963Ac4f7C022Cd5350ba409C92d9d4');

      await token.connect(taskArgs.sender).approve(taskArgs.recipient, taskArgs.amount);
      await (await token.connect(taskArgs.sender).transferFrom(taskArgs.sender, taskArgs.recipient, taskArgs.amount)).wait();
      console.log(`${taskArgs.recipient} has received ${taskArgs.amount} tokens from ${taskArgs.sender}`);
    });

module.exports = {};