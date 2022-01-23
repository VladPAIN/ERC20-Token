require("@nomiclabs/hardhat-ethers");


task("transfer", "Transfer")
    .addParam("recipient", "Recipient address")
    .addParam("amount", "Token amount")
    .setAction(async (taskArgs) => {

        const token = await ethers.getContractAt('Token', '0x05Fe2b1966963Ac4f7C022Cd5350ba409C92d9d4');

        const [minter] = await ethers.getSigners();
        await (await token.connect(minter).transfer(taskArgs.recipient, ethers.utils.parseUnits(taskArgs.amount, 18))).wait()
        console.log(`${minter.address} has transferred ${taskArgs.amount} to ${taskArgs.recipient}`);
        console.log('Balance sender:', await token.balanceOf(minter.address));
        console.log('Balance recipient:',await token.balanceOf(taskArgs.recipient));
    });

module.exports = {};