const {expect} = require("chai");
const {ethers} = require("hardhat");


describe("Mapping", function () {
    let mapping;

    let addr1;
    let addrs;

    beforeEach(async function () {
        [addr1, ...addrs] = await ethers.getSigners();

        const factory = await ethers.getContractFactory("IPFSMapping");
        mapping = await factory.deploy();

        await mapping.deployed();
    })


    it("Should set", async function () {
        for (let i = 0; i < 10; i++) {
            const bytes = ethers.utils.randomBytes(32)
            await expect(mapping.set(bytes)).not.to.be.reverted
            expect(await mapping.data(addr1.address)).to.equal(ethers.utils.hexlify(bytes))
        }
    })
});
