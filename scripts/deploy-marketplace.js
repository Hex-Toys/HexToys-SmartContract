require('dotenv').config()
const hre = require('hardhat')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000));

async function main() {
  const ethers = hre.ethers;
  console.log('network:', await ethers.provider.getNetwork());

  const feeAddress = process.env.FEE_ADDRESS;  
  const signerAddress = process.env.SIGNER_ADDRESS;

  /**
   *  Deploy and Verify HexToysMarketV2
   */
  {   
    const HexToysMarketV2 = await ethers.getContractFactory('HexToysMarketV2');
    const marketV2 = await HexToysMarketV2.deploy(feeAddress, signerAddress);
    await marketV2.deployed()

    console.log('HexToysMarketV2 deployed: ', marketV2.address)
    
   // await sleep(60);
    // Verify HexToysMarketV2
    // try {
    //   await hre.run('verify:verify', {
    //     address: marketV2.address,
    //     constructorArguments: [feeAddress, signerAddress]
    //   })
    //   console.log('HexToysMarketV2 verified')
    // } catch (error) {
    //   console.log('HexToysMarketV2 verification failed : ', error)
    // }    
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
