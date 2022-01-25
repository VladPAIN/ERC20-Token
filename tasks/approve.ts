import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-web3";

task("approve", "Approve")
    .addParam("spender", "Spender address")
    .addParam("amount", "Token amount")
    .setAction(async (args) => {

        const token = await ethers.getContractAt(process.env.TOKEN_NAME, process.env.TOKEN_ADDRESS);

        const [sender] = await ethers.getSigners();

        // await token.connect(sender).approve(sender.address, ethers.utils.parseUnits(args.amount, process.env.TOKEN_DECIMALS));
        await (await token.connect(sender).approve(args.spender, ethers.utils.parseUnits(args.amount, process.env.TOKEN_DECIMALS))).wait()
        console.log(`${sender.address} has approved ${args.amount} tokens to ${args.spender}`);
        console.log(await token.allowance(sender.address, args.spender));
        
        console.log(sender.address);
        console.log(await token.balanceOf(sender.address));

    });

export default  {};