import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../App';
import { loader } from '../assets';
import { ethers } from 'ethers';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    donators: 0,
    campaigns: 0,
    funds: 0,
  });

  const { contract } = useContext(AppState);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const donators = await contract.getTotalDonator();
        const campaigns = await contract.getTotalCampaign();
        const funds = await contract.getTotalFund();
        
        setStats({ donators, campaigns, funds });

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [contract]);

  const navigate = useNavigate();
  const { donators, campaigns, funds } = stats;

  if (loading) {
    return <div className='flex min-w-screen min-h-screen justify-center items-center'><img src={loader} width={60}/></div>;
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-start'>
      <div className='w-[500px] h-[150px] text-center mt-[40px]'>
        <h1 className='font-epilogue'>
          <span className="capitalize font-mono font-bold text-5xl text-[#e4f1fe]">Bring your ideas to life on </span>
          <br />
          <br />
          <span className="uppercase font-extrabold text-[#90f6d7] font-sans text-4xl">Thrive</span>
        </h1>
      </div>
      <div className='flex w-full h-[250px] justify-around mt-14'>
        {[
          { label: 'campaigns', value: Number(campaigns) },
          { label: 'donators', value: Number(donators) },
          { label: 'fund raised', value: `ETH ${ethers.formatEther(funds.toString())}` },
        ].map((stat, index) => (
          <div key={index} className='text-center w-[300px] py-5 rounded-xl shadow-lg shadow-slate-900 bg-[#41506b]'>
            <h3 className='font-semibold text-2xl capitalize mb-14 text-[#35bcbf]'>{stat.label}</h3>
            <h2 className='font-bold text-4xl text-[#90f6d7]'>{stat.value}</h2>
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center my-10'>
        <div className='w-full rounded-l-full shadow-lg bg-[#41506b] hover:bg-[#35bcbf] px-2 py-1'>
          <button onClick={() => navigate('/your-campaigns')} className='w-full text-nowrap px-4 py-2 text-lg font-semibold capitalize text-white'>your campaigns</button>
        </div>
        <div className='w-full rounded-r-full shadow-lg bg-[#41506b] hover:bg-[#35bcbf] px-2 py-1'>
          <button onClick={() => navigate('/all-campaigns')} className='w-full text-nowrap px-4 py-2 text-lg font-semibold capitalize text-white'>
            all campaigns
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
