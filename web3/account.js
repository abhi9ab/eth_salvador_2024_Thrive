import { ethers } from 'ethers';

const RPC = 'https://eth-sepolia.g.alchemy.com/v2/B2XSCu8CUfYwgxI2z4Dr19NnN2EkyqoZ'; // Your RPC url here
const account1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // Your public address here
const privateKey = '31a6c4c912e07e3dd0edf68da68f2ae8444a28fb1c739c4b049f871e81ad4578'; // put your private key here

const provider = new ethers.JsonRpcProvider(
    RPC
)

const wallet = new ethers.Wallet(privateKey, provider);


const call = async() => {
    const bal = await provider.getBalance(account1);
    console.log(account1, ":" ,ethers.utils.formatEther(bal));
    console.log(await wallet.getAddress(), ":" ,ethers.utils.formatEther(await wallet.getBalance()));
    
    const trans = await wallet.sendTransaction({
        to: account1,
        value: ethers.utils.parseEther('0.01')
    })
    
    await trans.wait();
    
    const bal2 = await provider.getBalance(account1);
    console.log(account1, ":" ,ethers.utils.formatEther(bal2));
    console.log(await wallet.getAddress(), ":" ,ethers.utils.formatEther(await wallet.getBalance()));
    
    console.log(trans)

}

call();
