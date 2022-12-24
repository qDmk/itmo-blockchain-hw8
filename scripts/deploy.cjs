const {ethers} = require('hardhat');

async function main() {
    const factory = await ethers.getContractFactory("IPFSMapping");
    const contract = await factory.deploy();

    await contract.deployed();

    console.log(`Mapping deployed to ${contract.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});