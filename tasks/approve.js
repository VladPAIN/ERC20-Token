require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-ethers");

task("approve", "Approve")
    .addParam("spender", "Spender address")
    .addParam("amount", "Token amount")
    .setAction(async (taskArgs) => {

        const token = await ethers.getContractAt('Token', '0x05Fe2b1966963Ac4f7C022Cd5350ba409C92d9d4');

        const [sender] = await ethers.getSigners();

        await token.connect(sender).approve(sender.address, ethers.utils.parseUnits(taskArgs.amount, 18));
        console.log(`${sender.address} has approved ${taskArgs.amount} tokens to ${taskArgs.spender}`);
        console.log(await token.allowance(sender.address, taskArgs.spender));

        console.log(sender.address);
        console.log(await token.balanceOf(sender.address));

    });

module.exports = {};