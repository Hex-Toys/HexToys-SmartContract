const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Deploying HeartHeadWrapped......");
    const HeartHeadWrapped = await hre.ethers.getContractFactory(
        "HeartHeadWrapped"
    );
    const heartheadwrapped = await HeartHeadWrapped.deploy("0x66F8A148dA90d3b028aBE9e83e446a35a4DA7D75");
    await heartheadwrapped.waitForDeployment();

    console.log("HeartHeadWrapped address:", await heartheadwrapped.getAddress());

    console.log("Deploying HeartHeadGovernance......");
    const HeartHeadGovernance = await hre.ethers.getContractFactory(
        "HeartHeadGovernance"
    );
    const heartheadgovernance = await HeartHeadGovernance.deploy(await heartheadwrapped.getAddress(), deployer.address);
    await heartheadgovernance.waitForDeployment();

    console.log("HeartHeadGovernance address:", await heartheadgovernance.getAddress());

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
