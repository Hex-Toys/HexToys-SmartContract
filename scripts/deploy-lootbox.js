require('dotenv').config()
const hre = require('hardhat')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000));

async function main() {
  const ethers = hre.ethers;
  console.log('network:', await ethers.provider.getNetwork());
  
  /**
   *  Deploy and Verify HexToysLootBoxFactory
   */
  {   
    const HexToysLootBoxFactory = await ethers.getContractFactory('HexToysLootBoxFactory');
    const lootBoxFactory = await HexToysLootBoxFactory.deploy();
    await lootBoxFactory.deployed()

    console.log('HexToysLootBoxFactory deployed: ', lootBoxFactory.address)
    
   // await sleep(60);
    // Verify HexToysLootBoxFactory
    // try {
    //   await hre.run('verify:verify', {
    //     address: lootBoxFactory.address,
    //     constructorArguments: []
    //   })
    //   console.log('HexToysLootBoxFactory verified')
    // } catch (error) {
    //   console.log('HexToysLootBoxFactory verification failed : ', error)
    // }    
  }

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
