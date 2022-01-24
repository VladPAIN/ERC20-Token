import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-web3";
import "web3-eth";

task("accounts", "Prints accounts", async (_, { web3 }) => {
  
    console.log(await web3.eth.getAccounts());
    
  });

  export default  {};