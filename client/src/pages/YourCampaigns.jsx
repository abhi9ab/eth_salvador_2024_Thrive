import React, { useContext, useEffect, useState } from 'react';
import CampaignCard from '../components/CampaignCard';
import { AppState } from '../App';
import { loader } from '../assets';

const YourCampaigns = () => {
  const { contract, walletAddress } = useContext(AppState);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);


  const getYourCampaigns = async () => {
    try {
      setLoading(true);
      const data = await contract.getCampaigns();
      const yourData = data.filter((campaign) => campaign.owner.toLowerCase() == walletAddress.toLowerCase());
      setCampaigns(yourData);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getYourCampaigns();
  }, [contract]);

  if (loading) {
    return <div className='flex min-w-screen min-h-screen justify-center items-center'><img src={loader} width={60}/></div>;
  }

  return (
    <div className='flex-1 min-h-screen min-w-screen justify-center items-center p-10'>
      <div className='w-full h-full flex flex-wrap items-center justify-start gap-10 ml-12'>
        {campaigns.length > 0 ? (
          campaigns.map((campaign, index) => (
            <CampaignCard key={index} id={index} title={campaign.title} description={campaign.description} amountCollected={campaign.amountCollected}  deadline={campaign.deadline} image={campaign.image} />
          ))
        ) : (
          <div className='flex justify-center items-center w-full h-full'>
            <p className='text-center text-white'>No campaigns available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourCampaigns;
