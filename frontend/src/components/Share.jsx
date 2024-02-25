import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";

import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";

const Share = () => {
  const { currentUser } = useContext(AuthContext);

  const [file, setfile] = useState(null);
  const [desc, setdesc] = useState("");


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
    mutationFn: (newPost) => makeRequest.post('/posts', newPost),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
  

  const handleShare = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });

    // Reset the state after sharing
    setfile(null);
    setdesc('');
  };

  
  return (
    <div className="p-4 bg-base-100 shadow-xl rounded-md">
      <div className="flex items-center space-x-4">
        <div className="w-10 mb-3 avatar">
          <img alt="" className="rounded-full"  src={currentUser.profilePic ? `http://localhost:5173/uploads/posts/${currentUser.profilePic}` : "http://localhost:5173/default/default_profile.png"} />
        </div>
        <span className="font-bold">{currentUser.name}</span>
      </div>
      <textarea
        type="text"
        placeholder={`Whats on your mind ${currentUser.name} ?`}
        className="w-full h-32 p-2 my-4 border border-gray-300 rounded-md"
        value={desc}
        onChange={(e) => setdesc(e.target.value)}
      />
      <label
        htmlFor="imageInput"
        className="flex items-center space-x-2 cursor-pointer text-blue-500"
      >
        <FontAwesomeIcon icon={faImage} />
        <span>Add Image</span>
      </label>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => setfile(e.target.files[0])}
      />
      {file && (
        <div className="my-2">
          <img
            src={URL.createObjectURL(file)}
            alt="Selected"
            className="max-w-full h-auto rounded-md"
          />
        </div>
      )}
      <button
        className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
          !file && !desc ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleShare}
        disabled={!file && !desc}
      >
        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
        Share
      </button>
    </div>
  );
};

export default Share;
