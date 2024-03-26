const hre = require("hardhat");
const data_heart = require("../heartheadminter.json");
const data_hex = require("../hextoysholders.json");
const data_orange = require("../orange_holder.json")

let sunglasess_uri = "ipfs://QmSf89euNsyhhzo8JPnKp3X64ir1AmgN23cmgnK7gAwCLT";
//let uri_santa = "ipfs://QmRyb8NQazT5cezX1En8SgY4PDi44bogAWwfv4oNk2iWgq";
//let uri_hexforce = "ipfs://QmUMeMmCQKfLnAZs6c5jQpCT2MUsD9XeUUeKvRccuwyVpd";

async function main() {
    const heartheadaddress = "0xf8FedA985Af9512D8AFf2aa1242Af42DC7E15FA0";
    //const heartheadcontract = await ethers.getContractAt("HeartHeads", heartheadaddress);

    console.log("transaction intiated...")
    const AirdropHeartHead = await ethers.getContractFactory('AirdropHeartHead');
    const airdrophearthead = await AirdropHeartHead.deploy(heartheadaddress);
    await airdrophearthead.deployed()

    console.log(
        `Airdrop contract deployed to ${airdrophearthead.address}`,
    );
    console.log("Starting Airdrop.....");
    for (let i = 0; i < data_orange.length; i += 25) {
        const chunk_user = data_orange.slice(i, i + 25);

        // const estimatedGas = await airdrophearthead.estimateGas.airdrop(chunk_user, sunglasess_uri);
        // const increasedGasLimit = Math.ceil(estimatedGas * 1.3);

        // let tx = await airdrophearthead.airdrop(chunk_user, sunglasess_uri, { gasLimit: increasedGasLimit });
        // tx.wait(2);
        console.log(`added ${i + chunk_user.length} TangGang Shades`);
    }

    console.log("array", areArraysEqual(data_orange, temp));
    // for (let i = 0; i < data_hex.length; i += 25) {
    //     const chunk_user = data_hex.slice(i, i + 25);
    //     let tx = await airdrophearthead.airdrop(chunk_user, uri_hexforce);
    //     tx.wait(2);
    //     console.log(`added ${i} hexforce hat`);
    // }
    console.log("AirDrop completed......");

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
