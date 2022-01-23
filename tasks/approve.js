require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-ethers");

task("approve", "Approve")
    .addParam("spender", "Spender address")
    .addParam("amount", "Token amount")
    .setAction(async (taskArgs) => {

        const token = await ethers.getContractAt('Token', '0x05Fe2b1966963Ac4f7C022Cd5350ba409C92d9d4');

        const [sender] = await ethers.getSigners();

        await (await token.connect(sender).approve(taskArgs.spender, taskArgs.amount)).wait()
        console.log(`${sender.address} has approved ${taskArgs.amount} tokens to ${taskArgs.spender}`);


    });

module.exports = {};