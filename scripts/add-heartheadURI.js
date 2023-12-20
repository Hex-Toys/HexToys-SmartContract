const hre = require("hardhat");

let ipfsdata = [
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/1.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/2.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/3.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/4.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/5.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/6.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/7.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/8.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/9.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/10.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/11.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/12.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/13.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/14.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/15.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/16.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/17.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/18.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/19.json",
    "ipfs://QmWN71QoSFQJxeA1agZuu3CvwzrubasT7HxNZjXrL66TED/20.json",
    "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/1.json",
    "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/2.json",
    "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/3.json",
    "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/4.json",
    "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/5.json",
    "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/6.json",
    "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/7.json",
    "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/8.json",
    "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/9.json",
    "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/10.json",
    "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/11.json",
    "ipfs://QmdnmxtqQz3Hmp3arPA9mDopQihY7RV8oNfuHiJR4Lqado/12.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/1.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/2.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/3.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/4.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/5.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/6.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/7.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/8.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/9.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/10.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/11.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/12.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/13.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/14.json",
    "ipfs://QmSeu4PQYotPki4L5HnpBiTDNMPBc3pCXq5UXHNBhGR4Qs/15.json",
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
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/1.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/2.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/3.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/4.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/5.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/6.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/7.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/8.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/9.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/10.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/11.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/12.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/13.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/14.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/15.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/16.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/17.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/18.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/19.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/20.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/21.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/22.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/23.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/24.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/25.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/26.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/27.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/28.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/29.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/30.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/31.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/32.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/33.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/34.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/35.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/36.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/37.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/38.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/39.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/40.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/41.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/42.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/43.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/44.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/45.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/46.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/47.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/48.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/49.json",
    "ipfs://QmWM91w7Vxscibakz7GJ8VKUSqzUksKUZHa4xyUYsVYY6c/50.json",
    "ipfs://QmdZWA4UxLtabjpeyk42uRPbLKtZdG7LGYRgQ11tZoUUMU/1.json",
    "ipfs://QmdZWA4UxLtabjpeyk42uRPbLKtZdG7LGYRgQ11tZoUUMU/2.json",
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
    const heartheadaddress = "0xD272E18E8660a88Be81825F5342E20D55b6BB4C8";
    const heartheadcontract = await ethers.getContractAt("HeartHeads", heartheadaddress);

    const repeatedArray = repeatElements(ipfsdata, supply);
    const shuffledArray = shuffleArray(repeatedArray);

    console.log("transaction intiated...")

    for (let i = 0; i < shuffledArray.length; i += 50) {
        const chunk = shuffledArray.slice(i, i + 50);
        //console.log("chunk", chunk, i);

        let tx = await heartheadcontract.addRandomTokenURIs(chunk);
        //console.log("transaction response", tx);
        await tx.wait(2);
        //console.log("wait over");
        console.log("uriindex", await heartheadcontract.uriIndex());
    }
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});