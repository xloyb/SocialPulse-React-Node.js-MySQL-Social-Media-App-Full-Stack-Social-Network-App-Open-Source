// import React  from 'react'


import {  useState } from "react"
import { makeRequest } from "../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// eslint-disable-next-line react/prop-types
const Update = ({ setAddStory }) => {

  const [file, setfile] = useState(null);

  const upload = async()=>{
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
    mutationFn: (newStory) => makeRequest.post('/stories',newStory),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
  

  const  handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    // console.log("imgUrl: ",imgUrl)
    mutation.mutate({ img: imgUrl });
    
    setfile(null);
    setAddStory(false);
  };

  // const handleShare = async (e) => {
  //   e.preventDefault();
  //   let imgUrl = "";
  //   if (file) imgUrl = await upload();
  //   mutation.mutate({ desc, img: imgUrl });

  //   // Reset the state after sharing
  //   setfile(null);
  //   setdesc('');
  // };




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
        
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-last-name">
            add story
          </label>
          <input className="input input-bordered" type="file" onChange={(e) => setfile(e.target.files[0])} />
        </div>
      </div>

    </form>

      

      <button onClick={handleSubmit} className="btn btn-primary">Get Started</button>
      <button onClick={()=>setAddStory(false)} className="btn btn-primary absolute top-4 right-4 h-12 w-24 px-4 py-2 rounded-lg">Close</button>


    </div>
  </div>
</div>
    </div>
  )
}



export default Update
