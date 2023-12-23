const hre = require("hardhat");

let ipfsdata = [
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/1.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/2.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/3.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/4.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/5.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/6.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/7.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/8.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/9.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/10.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/11.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/12.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/13.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/14.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/15.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/16.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/17.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/18.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/19.json",
    "ipfs://QmT6jSkG84PbBcRRPEu19bXTArUw4wiKjYaurj96n71vYP/20.json",
    "ipfs://QmVPwFBx52a5uzMWwZjr7Gk3RAEfGAevznXQhgJMgoYNeV/1.json",
    "ipfs://QmVPwFBx52a5uzMWwZjr7Gk3RAEfGAevznXQhgJMgoYNeV/2.json",
    "ipfs://QmVPwFBx52a5uzMWwZjr7Gk3RAEfGAevznXQhgJMgoYNeV/3.json",
    "ipfs://QmVPwFBx52a5uzMWwZjr7Gk3RAEfGAevznXQhgJMgoYNeV/4.json",
    "ipfs://QmVPwFBx52a5uzMWwZjr7Gk3RAEfGAevznXQhgJMgoYNeV/5.json",
    "ipfs://QmVPwFBx52a5uzMWwZjr7Gk3RAEfGAevznXQhgJMgoYNeV/6.json",
    "ipfs://QmVPwFBx52a5uzMWwZjr7Gk3RAEfGAevznXQhgJMgoYNeV/7.json",
    "ipfs://QmVPwFBx52a5uzMWwZjr7Gk3RAEfGAevznXQhgJMgoYNeV/8.json",
    "ipfs://QmVPwFBx52a5uzMWwZjr7Gk3RAEfGAevznXQhgJMgoYNeV/9.json",
    "ipfs://QmVPwFBx52a5uzMWwZjr7Gk3RAEfGAevznXQhgJMgoYNeV/10.json",
    "ipfs://QmVPwFBx52a5uzMWwZjr7Gk3RAEfGAevznXQhgJMgoYNeV/11.json",
    "ipfs://QmVPwFBx52a5uzMWwZjr7Gk3RAEfGAevznXQhgJMgoYNeV/12.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/1.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/2.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/3.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/4.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/5.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/6.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/7.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/8.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/9.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/10.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/11.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/12.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/13.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/14.json",
    "ipfs://QmaiexVCDcizC751APY693fG1ddJyH9YQLsFavLWbBQdps/15.json",
    "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/1.json",
    "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/2.json",
    "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/3.json",
    "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/4.json",
    "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/5.json",
    "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/6.json",
    "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/7.json",
    "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/8.json",
    "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/9.json",
    "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/10.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/1.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/2.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/3.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/4.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/5.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/6.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/7.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/8.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/9.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/10.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/11.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/12.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/13.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/14.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/15.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/16.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/17.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/18.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/19.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/20.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/21.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/22.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/23.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/24.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/25.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/26.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/27.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/28.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/29.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/30.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/31.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/32.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/33.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/34.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/35.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/36.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/37.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/38.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/39.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/40.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/41.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/42.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/43.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/44.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/45.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/46.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/47.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/48.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/49.json",
    "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/50.json",
    "ipfs://QmaPCPYnVLvGaSrepJQEaeeJeCobJitReRNxCLwXe4aG1M/1.json",
    "ipfs://QmaPCPYnVLvGaSrepJQEaeeJeCobJitReRNxCLwXe4aG1M/2.json",
    "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/1.json",
    "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/2.json",
    "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/3.json",
    "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/4.json",
    "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/5.json",
    "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/6.json",
    "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/7.json",
    "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/8.json",
    "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/9.json",
    "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/10.json"]

let supply = [
    500, 1, 200, 100, 2000, 58, 1750, 25, 20, 5, 100, 500, 75, 50, 5, 30, 30, 100, 1, 5, 800, 1000, 150,
    900, 2110, 1, 80, 50, 150, 200, 14, 100, 1250, 750, 1, 250, 1000, 12, 500,
    100, 200, 1, 10, 100, 800, 81, 500, 1, 1000, 3000, 200, 280, 54, 10, 10, 500, 500, 600, 1000, 500, 250, 250, 250, 250, 150, 50, 5, 5, 500, 500, 5, 1, 5, 5, 20, 5,
    5, 5, 100, 50, 1, 5, 5, 10, 1, 1, 5, 1, 50, 100, 50, 50, 50, 25, 25, 100, 50, 10, 10, 15, 100, 200, 100, 50, 10,
    10, 10, 5455, 100, 3000, 1000, 900, 450, 100, 86, 9, 6, 3, 1]

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to repeat each element based on the corresponding number
function repeatElements(arr, counts) {
    const result = [];
    arr.forEach((element, index) => {
        for (let i = 0; i < counts[index]; i++) {
            result.push(element);
        }
    });
    return result;
}

async function main() {
    const heartheadaddress = "0xD55dB7Cb58543518E6762567CB7CE0CE37469ddc";
    const heartheadcontract = await ethers.getContractAt("HeartHeads", heartheadaddress);

    const repeatedArray = repeatElements(ipfsdata, supply);
    const shuffledArray = shuffleArray(repeatedArray);

    console.log("transaction intiated...")

    for (let i = 0; i < shuffledArray.length; i += 100) {
        const chunk = shuffledArray.slice(i, i + 100);
        //console.log("chunk", chunk, i);

        let tx = await heartheadcontract.addRandomTokenURIs(chunk);
        //console.log("transaction response", tx);
        await tx.wait(1);
        //console.log("wait over");
        console.log("uriindex", await heartheadcontract.uriIndex());
    }
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
