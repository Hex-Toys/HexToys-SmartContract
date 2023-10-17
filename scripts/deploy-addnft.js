require('dotenv').config()
const hre = require('hardhat')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000));

async function main() {
  const ethers = hre.ethers;
  console.log('network:', await ethers.provider.getNetwork());
  
  /**
   *  Deploy and Verify HexToysAddNFTCollection
   */
  {   
    const contractFactory = await ethers.getContractFactory('HexToysAddNFTCollection');
    const addNFTCollection = await contractFactory.deploy();
    await addNFTCollection.deployed()

    console.log('HexToysAddNFTCollection deployed: ', addNFTCollection.address)
    
    await sleep(60);
    // Verify HexToysAddNFTCollection
    try {
      await hre.run('verify:verify', {
        address: addNFTCollection.address,
        constructorArguments: []
      })
      console.log('HexToysAddNFTCollection verified')
    } catch (error) {
      console.log('HexToysAddNFTCollection verification failed : ', error)
    }    
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
