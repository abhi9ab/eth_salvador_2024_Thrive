import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppState } from '../App';
import { ethers } from 'ethers';
import { loader, remove, update } from '../assets';

const CampaignDetails = () => {
  const { id } = useParams();
  const { ethereum } = window; 
  const { contract, walletAddress } = useContext(AppState);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();
  
  const sendTransaction = async(e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      const owner = await contract.getCampaignOwner(id);
      const parsedAmount = ethers.parseEther(amount).toString(16);

      const tx1 = await ethereum.request({ method: "eth_sendTransaction",
        params: [
          {
            from: walletAddress,
            to: owner,
            gas: "0x5208",              
            value: parsedAmount,
          }
        ],
      });
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.waitForTransaction(tx1);

      const donateAmount = ethers.parseEther(amount);
      const tx2 = await contract.donateToCampaign(id, { value: donateAmount });
      await tx2.wait();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setAmount(0);
    }
  };

  const handleDelete = async(e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      const owner = await contract.getCampaignOwner(id);
      if(walletAddress === owner) {
        const tx = await contract.deleteCampaign(id);
        await tx.wait();
        navigate('/your-campaigns');
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const campaigns = await contract.getCampaigns();
        const campaign = campaigns.find((campaign, index) => index === parseInt(id));
        if (campaign) {
          setCampaign(campaign);
        }
      } catch (error) {
        console.error('Error fetching campaign details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [contract, id]);

  if (loading) {
    return <div className='flex min-w-screen min-h-screen justify-center items-center'><img src={loader} width={60}/></div>;
  }

  if (!campaign) {
    return <div className='flex min-w-screen min-h-screen justify-center items-center text-white font-bold text-lg'>Campaign not found</div>;
  }

  const formattedOpening = new Date(Number(campaign.opening) * 1000).toLocaleDateString();
  const formattedDeadline = new Date(Number(campaign.deadline)).toLocaleDateString()

  return (
    <div className='flex min-h-screen min-w-screen justify-between item-start px-6'>
      <div className='w-2/3 flex justify-center items-start'>
        <div className='flex flex-col my-10 min-w-[750px] min-h-[400px] pl-5'>
          <h1 className='text-4xl font-semibold font-mono text-[#90f6d7] capitalize'>{campaign.title}</h1>
          <div className='flex justify-between items-center '>
            <div>
              <h2 className='text-[#35bcbf]'>owner:<span className='ml-2'>{campaign.owner}</span></h2>
            </div>
            <div className='flex flex-col gap-3'>
              <h2 className='text-md font-medium text-[#35bcbf]'>Opened on: <span className='ml-3'>{formattedOpening}</span></h2>
              <h2 className='text-md font-medium text-[#35bcbf]'>Deadline: <span className='ml-3'>{formattedDeadline}</span></h2>
            </div>
          </div>
          <p className='text-lg font-medium mt-28 text-wrap w-screen pr-20 text-[#35bcbf] lowercase'>{campaign.description}</p>
          <p className='text-lg font-medium mt-10 text-[#35bcbf]'>Amount Collected: <span className='text-[#90f6d7] ml-3'>{ethers.formatEther(campaign.amountCollected.toString())} ETH</span></p>
          <div className='w-full flex gap-10 items-center h-fit my-10'>
            <input 
              type='number' 
              name='amount' 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              min={0.01} 
              max={100} 
              step={0.01} 
              placeholder='Amount in ETH' 
              className='bg-gray-300 w-[200px] px-2 py-1 rounded-lg'
              required
            />
            <button onClick={sendTransaction} disabled={loading} className='bg-[#90f6d7] text-[#263849] font-bold w-fit h-fit px-4 py-2 rounded-full shadow-2xl hover:shadow-gray-950'>
              {loading ? 'Donating...' : 'Donate'}
            </button>
          </div>
          <button onClick={() => walletAddress === campaign.owner ? navigate(`/update-campaign/${id}`) : alert("Invalid Credentials")} className='flex items-center justify-center w-fit mb-8 rounded-full px-3 py-1 gap-2 text-white font-semibold shadow-2xl hover:shadow-gray-950 bg-red-300'>
            <p> Update campaign </p>
            <img src={update} width={15} height={15}/>
          </button>
        </div>
      </div>
      <div className='w-1/3 flex flex-col items-center justify-between py-6'>
        <div className='w-fit h-fit'>
          <img src={campaign.image} className='shadow-xl rounded-2xl w-[250px] h-[180px] object-fit'/>
        </div>
        <button onClick={handleDelete} className='flex items-center justify-center mb-8 rounded-full px-3 py-1 gap-2 text-white font-semibold shadow-2xl hover:shadow-gray-950 bg-red-300'>
          <p> Delete campaign </p>
          <img src={remove} width={35} height={35}/>
        </button>
      </div>
    </div>
  )
}

export default CampaignDetails