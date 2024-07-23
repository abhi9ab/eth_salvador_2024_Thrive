import React, { useContext, useState } from 'react'
import { close } from '../assets';
import { useNavigate, useParams } from 'react-router-dom';
import { AppState } from '../App';
import { checkIfImage } from '../constants';

const UpdateCampaign = () => {
  const [ isCreate, setIsCreate ] = useState(false); 
  const { contract, walletAddress, setWalletAddress } = useContext(AppState);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    deadline: ''
  });

  const navigate = useNavigate();

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleNavigate = () => {
    setIsCreate(false);
    navigate(`/campaign-details/${id}`);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log({...form});
      if (!form.title || !form.description || !form.image || !form.deadline ) return
  
      checkIfImage(form.image, async (exists) => {
        if(exists) {
          const tx = await contract.updateCampaign(id, form.title, form.description, form.image, new Date(form.deadline).getTime());
          await tx.wait();
          navigate(`/campaign-details/${id}`);
        } else {
          alert("Invalid image url");
          setForm({ ...form, image: '' });
        }
      })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    } 
  }

  return ( 
      <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300'>
        <div className='bg-[#41506b] shadow-xl shadow-black rounded-xl w-11/12 md:w-[400px] h-7/12 p-6'>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <div className='flex justify-between items-center'>
              <h1 className='font-bold text-2xl capitalize text-[#35bcbf]'>update campaign</h1>
              <button onClick={handleNavigate} type="button" className='bg-transparent focus:outline-none'><img src={close} width={15} height={15}/></button>
            </div>

            <div className='flex justify-between items-center bg-white rounded-xl mt-5 h-[40px]'>
              <input 
                className='bg-transparent w-full text-md border-0 focus:outline-none focus:ring-0 mx-5'
                type='text'
                name='title'
                placeholder='Title'
                onChange={(e) => handleFormFieldChange('title', e)}
                value={form.title}
                required
              />
            </div>

            <div className='flex justify-between items-center bg-white rounded-xl mt-5 h-[90px]'>
              <textarea 
                className='bg-transparent w-full text-md border-0 focus:outline-none focus:ring-0 mx-5'
                type='text'
                name='description'
                placeholder='Description'
                onChange={(e) => handleFormFieldChange('description', e)}
                value={form.description}
                required
              />
            </div>

            <div className='flex justify-between items-center bg-white rounded-xl mt-5 h-[40px]'>
              <input 
                className='bg-transparent w-full text-md border-0 focus:outline-none focus:ring-0 mx-5'
                type='url'
                name='image'
                placeholder='Image URL'
                onChange={(e) => handleFormFieldChange('image', e)}
                value={form.image}
                required
              />
            </div>

            <div className='flex justify-between items-center bg-white rounded-xl mt-5 h-[40px]'>
              <input 
                className='bg-transparent w-full text-md border-0 focus:outline-none focus:ring-0 mx-5'
                type='date'
                name='deadline'
                onChange={(e) => handleFormFieldChange('deadline', e)}
                value={form.deadline}
                required
              />
            </div>

            <div className='flex justify-center items-center w-full'>
              <button className='mt-5 bg-[#90f6d7] rounded-full w-1/5 py-2 text-white font-medium shadow-md hover:opacity-50 transition-opacity ' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    
  )
}

export default UpdateCampaign;