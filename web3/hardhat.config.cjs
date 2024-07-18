require("@nomicfoundation/hardhat-toolbox");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    const address = await account.getAddress();
    const balance = await account.provider.getBalance(address);
    console.log(`${address} ${balance}`);
  }
})


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.24',
  defaultNetwork: 'sepolia',
  networks: {
    sepolia: {
      url: import.meta.env.VITE_RPC_URL,
      accounts: [import.meta.env.VITE_PRIVATE_KEY]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

// /** @type import('hardhat/config').HardhatUserConfig */
// export const solidity = "0.8.24";
// export const defaultNetwork = "sepolia";
// export const networks = {
//   hardhat: {},
//   sepolia: {
//     url: "https://eth-sepolia.g.alchemy.com/v2/B2XSCu8CUfYwgxI2z4Dr19NnN2EkyqoZ",
//     accounts: ["31a6c4c912e07e3dd0edf68da68f2ae8444a28fb1c739c4b049f871e81ad4578"]
//   }
// };
// export const paths = {
//   sources: "./contracts",
//   tests: "./test",
//   cache: "./cache",
//   artifacts: "./artifacts"
// };
