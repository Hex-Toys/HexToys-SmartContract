require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.24",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    }, networks: {
        pls: {
            url: process.env.PULSETEST_NODE_URL,
            accounts: [process.env.PRIVATE_KEY],
        }
    }
};
