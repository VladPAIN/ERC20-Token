const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token contract', () => {
    let Token, token, owner, addr1, addr2;

    beforeEach(async () => {
        Token = await ethers.getContractFactory('Token');
        token = await Token.deploy();
        [owner, addr1, addr2, _] = await ethers.getSigners();
    });

    describe('Deployment', () => {
        it('Should set the right owner', async () => {
            expect(await token.owner()).to.equal(owner.address);
        });

        it('Should assign the total supply of tokens to the owner', async () => {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe('Allowance', () => {
        it('Should allowance token', async () => {
            await token.approve(addr1.address, ethers.utils.parseUnits("50", 18));
            const allowanceAfterApprove = await token.allowance(owner.address, addr1.address);
            expect(allowanceAfterApprove).to.equal(ethers.utils.parseUnits("50", 18));
        });

        it('Should increase allowance token', async () => {
            await token.approve(addr1.address, ethers.utils.parseUnits("50", 18));

            await token.increaseAllowance(addr1.address, ethers.utils.parseUnits("50", 18));   

            const allowanceAfterIncreaseAllowance = await token.allowance(owner.address, addr1.address);
            expect(allowanceAfterIncreaseAllowance).to.equal(ethers.utils.parseUnits("100", 18));

        });

        it('Should decrease allowance token', async () => {
            await token.approve(addr1.address, ethers.utils.parseUnits("50", 18));

            await token.decreaseAllowance(addr1.address, ethers.utils.parseUnits("30", 18));   

            const allowanceAfterDecreaseAllowance = await token.allowance(owner.address, addr1.address);
            expect(allowanceAfterDecreaseAllowance).to.equal(ethers.utils.parseUnits("20", 18));

        });
    });

    describe('Transactions', () => {
        it('Should mint token', async () => {
            const initialTotalSupply = await token.totalSupply();
            await token.mint(addr1.address, ethers.utils.parseUnits("50", 18));
            const addr1Balance = await token.balanceOf(addr1.address);

            expect(addr1Balance).to.equal(ethers.utils.parseUnits("50", 18));

            const totalSupplyAfterMint = await token.totalSupply()
            expect(initialTotalSupply).to.equal(totalSupplyAfterMint.sub(ethers.utils.parseUnits("50", 18)));
        });

        it('Should transfer tokens between accounts', async () => {
            await token.transfer(addr1.address, ethers.utils.parseUnits("50", 18));
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(ethers.utils.parseUnits("50", 18));

            await token.connect(addr1).transfer(addr2.address, ethers.utils.parseUnits("50", 18));
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(ethers.utils.parseUnits("50", 18));
        });

        it('Should transferFrom tokens between accounts', async () => {
            await token.approve(owner.address, ethers.utils.parseUnits("50", 18));
            await token.transferFrom(owner.address, addr1.address, ethers.utils.parseUnits("50", 18));

            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(ethers.utils.parseUnits("50", 18));

            await token.connect(addr1).approve(addr1.address, ethers.utils.parseUnits("50", 18));
            await token.connect(addr1).transferFrom(addr1.address, addr2.address, ethers.utils.parseUnits("50", 18));

            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(ethers.utils.parseUnits("50", 18));
        });

        it('Should fail if sender doesnt have enough tokens', async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);

            await expect(token.connect(addr1).transfer(owner.address, ethers.utils.parseUnits("1", 18))).to.be.revertedWith('Not enough tokens');

            expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });

        it('Should update balances after transfers', async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);

            await token.transfer(addr1.address, ethers.utils.parseUnits("100", 18));
            await token.transfer(addr2.address, ethers.utils.parseUnits("50", 18));

            const finalOwnerBalance = await token.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(ethers.utils.parseUnits("150", 18)));

            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(ethers.utils.parseUnits("100", 18));

            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(ethers.utils.parseUnits("50", 18));
        });

        it('Should fail if sender doesnt have enough approve tokens', async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);

            await token.approve(owner.address, ethers.utils.parseUnits("50", 18));
            await expect(token.transferFrom(owner.address, addr1.address, ethers.utils.parseUnits("100", 18)));

            expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });

        it('Should allowance tokens', async () => {
            await token.approve(addr1.address, ethers.utils.parseUnits("100", 18));

            expect(await token.allowance(owner.address, addr1.address)).to.equal(ethers.utils.parseUnits("100", 18));
        });

        it('Should burn token', async () => {
            const initialTotalSupply = await token.totalSupply();
            const initialOwnerBalance = await token.balanceOf(owner.address);

            await token.burn(owner.address, ethers.utils.parseUnits("50", 18));

            const ownerBalance = await token.balanceOf(owner.address);
            expect(ownerBalance).to.equal(initialOwnerBalance.sub(ethers.utils.parseUnits("50", 18)));
            expect(await token.totalSupply()).to.equal(initialTotalSupply.sub(ethers.utils.parseUnits("50", 18)));
        });

        it('Should burn after transfer', async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);
            const initialTotalSupply = await token.totalSupply();

            await token.transfer(addr1.address, ethers.utils.parseUnits("100", 18));
            await token.transfer(addr2.address, ethers.utils.parseUnits("50", 18));

            await token.burn(addr1.address, ethers.utils.parseUnits("50", 18));
            await token.burn(addr2.address, ethers.utils.parseUnits("10", 18));

            const finalTotalSupply = await token.totalSupply();
            expect(finalTotalSupply).to.equal(initialTotalSupply.sub(ethers.utils.parseUnits("60", 18)));

            const finalOwnerBalance = await token.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(ethers.utils.parseUnits("150", 18)));

            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(ethers.utils.parseUnits("50", 18));

            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(ethers.utils.parseUnits("40", 18));
        });
    });
});