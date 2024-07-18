import { ethers } from 'ethers';
import Thrive from './artifacts/contracts/Thrive.sol/Thrive.json' assert { type: "json" };

const RPC = 'https://eth-sepolia.g.alchemy.com/v2/B2XSCu8CUfYwgxI2z4Dr19NnN2EkyqoZ'; // Put your RPC url here
const account1 = '0x8928F619ba529EB1419d847625f1ec8849cFB7fc'; // put your public key here
const privateKey = '31a6c4c912e07e3dd0edf68da68f2ae8444a28fb1c739c4b049f871e81ad4578'; // put Your private key here

const provider = new ethers.JsonRpcProvider(
    RPC
)

const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = '0x5D879852c547De74E5bA3771e9B5104ab6E29Ed0';
const ABI = Thrive.abi;

async function call() {
    const contract = new ethers.Contract(
        contractAddress,
        ABI,
        provider
    )

    const transaction = await contract.queryFilter('Action');
    
    transaction.map((item) => {
        console.log(item.args.id + " " + item.args.actionType + " " + item.args.executor + " " + item.args.timestamp);
    })
}

call();