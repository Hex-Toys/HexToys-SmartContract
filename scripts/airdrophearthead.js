const hre = require("hardhat");
const data_heart = require("../heartheadminter.json");
const data_hex = require("../hextoysholders.json");

let uri_santa = "ipfs://QmRyb8NQazT5cezX1En8SgY4PDi44bogAWwfv4oNk2iWgq";
let uri_hexforce = "ipfs://QmUMeMmCQKfLnAZs6c5jQpCT2MUsD9XeUUeKvRccuwyVpd";

async function main() {
    const heartheadaddress = "0x66F8A148dA90d3b028aBE9e83e446a35a4DA7D75";
    //const heartheadcontract = await ethers.getContractAt("HeartHeads", heartheadaddress);

    console.log("transaction intiated...")
    const AirdropHeartHead = await ethers.getContractFactory('AirdropHeartHead');
    const airdrophearthead = await AirdropHeartHead.deploy(heartheadaddress);
    await airdrophearthead.deployed()

    console.log(
        `Airdrop contract deployed to ${airdrophearthead.address}`,
    );
    console.log("Starting Airdrop.....");
    let users = [];
    let supply = [];
    for (var i in data_heart) {
        users.push(data_heart[i].minter);
        supply.push(1);
    }
    for (let i = 0; i < users.length; i += 50) {
        const chunk_user = users.slice(i, i + 50);
        const chunk_supply = supply.slice(i, i + 50);
        let tx = await airdrophearthead.airdrop(chunk_user, chunk_supply, uri_santa);
        tx.wait(2);
        console.log(`added ${i} santa hat`);
    }

    users = [];
    supply = [];
    for (var i in data_hex) {
        users.push(data_hex[i].holderAddress);
        supply.push(1);
    }
    for (let i = 0; i < users.length; i += 50) {
        const chunk_user = users.slice(i, i + 50);
        const chunk_supply = supply.slice(i, i + 50);
        let tx = await airdrophearthead.airdrop(chunk_user, chunk_supply, uri_hexforce);
        tx.wait(2);
        console.log(`added ${i} hexforce hat`);
    }
    console.log("AirDrop completed......");

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
