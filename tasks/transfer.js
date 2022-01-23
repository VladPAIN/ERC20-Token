require("@nomiclabs/hardhat-ethers");


task("transfer", "Transfer")
    .addParam("spender", "Spender address")
    .addParam("amount", "Token amount")
    .setAction(async (taskArgs) => {

        const token = await ethers.getContractAt('Token', '0x05Fe2b1966963Ac4f7C022Cd5350ba409C92d9d4');

        const [minter] = await ethers.getSigners();
        await (await token.connect(minter).transfer(taskArgs.spender, taskArgs.amount)).wait()
        console.log(`${minter.address} has transferred ${taskArgs.amount} to ${taskArgs.spender}`);
    });

module.exports = {};
