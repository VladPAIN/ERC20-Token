async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await ethers.getContractFactory('Token');

  const token = await Token.deploy();

  await token.deployed();

  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("Token address:", token.address);

  console.log("Tokens:", await token.balanceOf(deployer.address));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });