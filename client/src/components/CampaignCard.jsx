import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const CampaignCard = ({ id, title, description, amountCollected, deadline, image }) => {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/campaign-details/${id}`)} className=' flex flex-col gap-4 justify-between items-center w-[325px] h-fit px-5 py-3 shadow-xl hover:shadow-black border-[1px] border-[#41506b] rounded-2xl hover:cursor-pointer'>
      <div className='w-fit h-fit flex items-center justify-center rounded-lg'>
        <img src={image} alt={title} className='shadow-xl w-[300px] h-[200px] object-fit rounded-xl'/>
      </div>
      <div className='w-full h-fit px-3 py-5 flex flex-col items-start gap-2 rounded-lg bg-[#41506b]'>
        <h2 className='text-xl font-bold w-full text-center text-[#35bcbf] capitalize'>{title} <span className='invisible'>{id}</span></h2> 
        <p className='text-sm text-gray-300 mt-4'>Deadline: <span className='ml-3 text-base'>{new Date(Number(deadline)).toLocaleDateString()}</span></p>
        <p className='text-sm font-medium mt-2 text-gray-300'>Amount Collected: <span className='text-[#90f6d7] ml-3 text-base'>{ethers.formatEther(amountCollected.toString())} ETH</span></p>
        {error && <p className='text-red-500'>{error}</p>}
      </div>
    </div>
  );
};

export default CampaignCard;
