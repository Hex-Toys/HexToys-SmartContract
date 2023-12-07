require('dotenv').config()
const hre = require('hardhat')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000));

async function main() {
  const ethers = hre.ethers;
  const upgrades = hre.upgrades;
  console.log('network:', await ethers.provider.getNetwork());

  const signer = (await ethers.getSigners())[0];
  console.log('signer:', await signer.getAddress());

  /**
   *  Deploy and Verify HexToysNFT
   */
  {   
    const HexToysNFT = await ethers.getContractFactory('HexToysNFT', {
      signer: (await ethers.getSigners())[0]
    });
    const HexToysNFTContract = await upgrades.deployProxy(HexToysNFT, ["0xa7633f37FEEfaCAc8F251b914e92Ff03d2acf0f2"], { initializer: 'initialize' });
    await HexToysNFTContract.deployed()

    console.log('HexToysNFT proxy deployed: ', HexToysNFTContract.address)
    
    // await sleep(60);
    // // Verify HexToysNFT
    // try {
    //   await hre.run('verify:verify', {
    //     address: HexToysNFTContract.address,
    //     constructorArguments: []
    //   })
    //   console.log('HexToysNFT verified')
    // } catch (error) {
    //   console.log('HexToysNFT verification failed : ', error)
    // }    
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })