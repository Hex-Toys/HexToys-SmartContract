// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// async function waitBlocks(numBlocks) {
//   const currentBlock = await hre.ethers.provider.getBlockNumber();
//   const targetBlock = currentBlock + numBlocks;

//   while (true) {
//     const latestBlock = await hre.ethers.provider.getBlockNumber();

//     if (latestBlock >= targetBlock) {
//       break;
//     }

//     await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
//   }
// }

async function main() {


  const contract = await hre.ethers.deployContract("HeartHeads");
  await contract.deployed()

  console.log(
    `HeardHeads contract deployed to ${contract.address}`,
  );
  // await waitBlocks(2);
  // let ipfsdata = [
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/1.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/2.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/3.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/4.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/5.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/6.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/7.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/8.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/9.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/10.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/11.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/12.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/13.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/14.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/15.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/16.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/17.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/18.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/19.json",
  //   "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/20.json",
  //   "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/1.json",
  //   "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/2.json",
  //   "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/3.json",
  //   "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/4.json",
  //   "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/5.json",
  //   "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/6.json",
  //   "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/7.json",
  //   "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/8.json",
  //   "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/9.json",
  //   "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/10.json",
  //   "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/11.json",
  //   "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/12.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/1.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/2.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/3.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/4.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/5.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/6.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/7.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/8.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/9.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/10.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/11.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/12.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/13.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/14.json",
  //   "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/15.json",
  //   "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/1.json",
  //   "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/2.json",
  //   "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/3.json",
  //   "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/4.json",
  //   "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/5.json",
  //   "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/6.json",
  //   "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/7.json",
  //   "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/8.json",
  //   "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/9.json",
  //   "ipfs://QmS5xD4Nn7ugCVAbYPLAA7ow1FoXC1fdUZKoM5DR1qxcUD/10.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/1.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/2.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/3.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/4.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/5.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/6.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/7.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/8.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/9.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/10.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/11.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/12.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/13.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/14.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/15.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/16.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/17.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/18.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/19.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/20.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/21.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/22.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/23.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/24.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/25.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/26.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/27.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/28.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/29.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/30.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/31.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/32.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/33.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/34.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/35.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/36.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/37.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/38.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/39.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/40.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/41.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/42.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/43.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/44.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/45.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/46.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/47.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/48.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/49.json",
  //   "ipfs://QmaopHeUJ4MsFztiwRnLX7bVQGq8hr9mzn4cQFkwDGHCac/50.json",
  //   "ipfs://QmdZWA4UxLtabjpeyk42uRPbLKtZdG7LGYRgQ11tZoUUMU/1.json",
  //   "ipfs://QmdZWA4UxLtabjpeyk42uRPbLKtZdG7LGYRgQ11tZoUUMU/2.json",
  //   "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/1.json",
  //   "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/2.json",
  //   "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/3.json",
  //   "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/4.json",
  //   "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/5.json",
  //   "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/6.json",
  //   "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/7.json",
  //   "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/8.json",
  //   "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/9.json",
  //   "ipfs://QmPoaAUDe6M1e6BQXQBgRACQYDtBuKvJ8f8jGtNtHrjwW9/10.json"]

  // let supply = [
  //   500, 1, 200, 100, 2000, 58, 1750, 25, 20, 5, 100, 500, 75, 50, 5, 30, 30, 100, 1, 5, 800, 1000, 150,
  //   900, 2110, 1, 80, 50, 150, 200, 14, 100, 1250, 750, 1, 250, 1000, 12, 500,
  //   100, 200, 1, 10, 100, 800, 81, 500, 1, 1000, 3000, 200, 280, 54, 10, 10, 500, 500, 600, 1000, 500, 250, 250, 250, 250, 150, 50, 5, 5, 500, 500, 5, 1, 5, 5, 20, 5,
  //   5, 5, 100, 50, 1, 5, 5, 10, 1, 1, 5, 1, 50, 100, 50, 50, 50, 25, 25, 100, 50, 10, 10, 15, 100, 200, 100, 50, 10,
  //   10, 10, 5455, 100, 3000, 1000, 900, 450, 100, 86, 9, 6, 3, 1]

  // await contract.addRandomTokenURIs(ipfsdata, supply);
  // await waitBlocks(2);

  // console.log("minting...")
  // const valueToSend = ethers.utils.parseEther("0.01");
  // await contract.safeMintWithRandomTokenURI({ value: valueToSend });
  // await contract.safeMintWithRandomTokenURI({ value: valueToSend });

  // await waitBlocks(5);
  // console.log("minted token", await contract.tokenURI(0), await contract.tokenURI(1));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
