require('dotenv').config()
const hre = require('hardhat')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000));

async function main() {
  const ethers = hre.ethers;
  console.log('network:', await ethers.provider.getNetwork());


  /**
   *  Deploy and Verify HexToysNFTFactory
   */
  {   
    const HexToysNFTFactory = await ethers.getContractFactory('HexToysNFTFactory');
    const nftFactory = await HexToysNFTFactory.deploy();
    await nftFactory.deployed()

    console.log('HexToysNFTFactory deployed: ', nftFactory.address)
    
    await sleep(60);
    // Verify HexToysNFTFactory
    try {
      await hre.run('verify:verify', {
        address: nftFactory.address,
        constructorArguments: []
      })
      console.log('HexToysNFTFactory verified')
    } catch (error) {
      console.log('HexToysNFTFactory verification failed : ', error)
    }    
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
