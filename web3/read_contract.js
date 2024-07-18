import { ethers } from 'ethers';
import Thrive from './artifacts/contracts/Thrive.sol/Thrive.json' assert { type: "json" };

const RPC = 'https://eth-sepolia.g.alchemy.com/v2/B2XSCu8CUfYwgxI2z4Dr19NnN2EkyqoZ'; // Your RPC url here

const provider = new ethers.JsonRpcProvider(
    RPC
)

const contractAddress = "0x5D879852c547De74E5bA3771e9B5104ab6E29Ed0";
const ABI = Thrive.abi 

async function call() {
    const contract = new ethers.Contract(
        contractAddress,
        ABI,
        provider
    )

    console.log(`The address of owner: ${await contract.getOwner()}`);
}

call();