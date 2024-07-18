import React, { useContext, useEffect, useState } from 'react'
import { logo } from '../assets';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../App';

const Navbar = () => {
  const {ethereum} = window;
  const navigate = useNavigate();
  const { setLogin, walletAddress, setWalletAddress } = useContext(AppState);

  const handleLogin = async() => {
    try {
      await ethereum.request({method: "wallet_requestPermissions", params: [{eth_accounts: {}}]})
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      setWalletAddress(accounts[0]);
      localStorage.setItem('walletAddress', accounts[0]);
      setLogin(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const savedWalletAddress = localStorage.getItem('walletAddress');
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
    }
    
    ethereum.on("accountsChanged", (accounts) => {
      setWalletAddress(accounts[0]);
      localStorage.setItem('walletAddress', accounts[0]);
    });
  },[ethereum, setWalletAddress])

  return (
    <div className='flex justify-between h-[60px] shadow-lg items-center bg-[#41506b]'>
        <button type='button' onClick={() => navigate("/")} className='flex w-[200px] h-[160px] justify-center items-center cursor-pointer rounded-md object-contain'>
          <img src={logo} className="w-full h-full object-contain"/>
        </button>
        <div className='flex gap-5 w-[350px] h-[40px] justify-evenly items-center cursor-pointer mr-7 '>
            <button type='button' className='bg-[#90f6d7] rounded-full text-[#263849] w-[100px] h-full font-bold uppercase hover:opacity-20 px-2 py-1' onClick={() => navigate("/create-campaign")}>create</button>
            <button type='button' className='bg-[#90f6d7] rounded-full text-[#263849] w-[100px] h-full font-bold uppercase hover:opacity-20 overflow-hidden text-ellipsis px-2 py-1' onClick={handleLogin}>{ walletAddress ? walletAddress : "connect" }</button>
        </div>
    </div>

  )
}

export default Navbar;