import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, AllCampaigns, YourCampaigns, UpdateCampaign } from './pages';
import { ethers } from 'ethers';
import Thrive from '../../web3/artifacts/contracts/Thrive.sol/Thrive.json' assert { type: "json" };

const AppState = createContext();

const App = () => {
  const [isLogin, setLogin] = useState(false);
  const [ walletAddress, setWalletAddress ] = useState("");
  
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const abi = Thrive.abi;
  const provider = new ethers.BrowserProvider(window.ethereum);
  // const signer = provider.getSigner();
  const wallet = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY, provider);

  const contract = new ethers.Contract(contractAddress, abi, wallet);

  return (
    <AppState.Provider value={{isLogin, setLogin, contract, walletAddress, setWalletAddress}}>
      <div className="relative bg-[#263849] min-h-screen overflow-x-hidden flex flex-row justify-center">
        <div className="flex-1 flex flex-col justify-between max-sm:w-full max-w-full">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/your-campaigns" element={<YourCampaigns />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
            <Route path="/all-campaigns" element={<AllCampaigns/>} />
            <Route path="/update-campaign/:id" element={<UpdateCampaign/>} />
          </Routes>

          <Footer />
        </div>
      </div>
    </AppState.Provider>
  )
}

export default App;
export {AppState};