// import React  from 'react'
import PropTypes from 'prop-types';

import {  useState } from "react"
import { makeRequest } from "../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Update = ({setOpenUpdate, user}) => {

  const [profile, setProfile] = useState(null);
  const [cover, setCover] = useState(null);
  

  const [info,setinfo] = useState({
    username:"",
    name:"",
    email:"",
    bio:"",
    instagram:"",
    website:"",
  });

  const handleChange =(e)=>{
    setinfo({...info,[e.target.name]: e.target.value});
    
  }

  const upload = async(file)=>{
    try {
      const formData = new FormData();
      formData.append("file",file);
      const res = await makeRequest.post("/upload",formData);
      return res.data;
    } catch (err) {
      console.log(err)
    }
  }


  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => makeRequest.put('/users',user),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  

  const  handleSubmit = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    // coverUrl = cover && await upload(cover);
    // profileUrl = profile && await upload(profile);



    mutation.mutate({ ...info, coverPic:coverUrl, profilePic:profileUrl });

    //setOpenUpdate(false);
  };




  return (
    <div>

      <div className="fixed inset-0 z-50 flex items-center justify-center hero min-h-screen bg-base-200">
      
  <div className="hero-content flex-col lg:flex-row">
    {/* <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" /> */}
    <div>
      <h1 className="text-5xl font-bold">Update Your Settings</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <p className="text-red-500 text-xs italic">gonna need this for errors.</p>


      <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="grid-first-name">
            UserName
          </label>
          <input className="input input-bordered " type="text" placeholder="Username" name="username" onChange={handleChange} disabled />
          
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-last-name">
            Name
          </label>
          <input className="input input-bordered" type="text" placeholder="Name" name="name" onChange={handleChange} />
        </div>
      </div>


      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="grid-first-name">
            Instagram
          </label>
          <input className="input input-bordered" type="text" placeholder="https://www.instagram.com/louay_xbs/" name="instagram" onChange={handleChange} disabled />
          
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-last-name">
            Website
          </label>
          <input className="input input-bordered" type="text" name="website" placeholder="https://MyDevify.com" onChange={handleChange} />
        </div>
      </div>



      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="grid-first-name">
            email
          </label>
          <input className="input input-bordered" type="email" placeholder="contactxloy@gmail.com" name="email" onChange={handleChange} disabled />
          
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-last-name">
            Bio
          </label>
          <input className="input input-bordered" type="text" name="bio" placeholder="About me " onChange={handleChange} />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="grid-first-name">
            Profile Picture 
          </label>
          <input className="input input-bordered" type="file" onChange={(e) => setProfile(e.target.files[0])} />
          
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-last-name">
            Profile Background
          </label>
          <input className="input input-bordered" type="file" onChange={(e) => setCover(e.target.files[0])} />
        </div>
      </div>

    </form>

      

      <button onClick={handleSubmit} className="btn btn-primary">Get Started</button>
      <button onClick={() => setOpenUpdate(false)} className="btn btn-primary absolute top-4 right-4 h-12 w-24 px-4 py-2 rounded-lg">Close</button>


    </div>
  </div>
</div>
    </div>
  )
}

Update.propTypes = {
  setOpenUpdate: PropTypes.func.isRequired, // Define prop type for setOpenUpdate
  user: PropTypes.object.isRequired,
};

export default Update
