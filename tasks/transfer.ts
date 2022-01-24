import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

task("transfer", "Transfer")
    .addParam("recipient", "Recipient address")
    .addParam("amount", "Token amount")
    .setAction(async (args) => {

        const token = await ethers.getContractAt(process.env.TOKEN_NAME, process.env.TOKEN_ADDRESS);

        const [minter] = await ethers.getSigners();

        await (await token.connect(minter).transfer(args.recipient, ethers.utils.parseUnits(args.amount, process.env.TOKEN_DECIMALS))).wait();
        console.log(`${minter.address} has transferred ${args.amount} to ${args.recipient}`);
        console.log('Balance sender:', await token.balanceOf(minter.address));
        console.log('Balance recipient:',await token.balanceOf(args.recipient));
        
    });

export default  {};
