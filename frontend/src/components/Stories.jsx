
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEllipsisVertical,
  faCirclePlus
} from "@fortawesome/free-solid-svg-icons";
import AddStory from './addstory';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { AuthContext } from "../context/AuthContext";

// const storiesData = [
//   {
//     id: 1,
//     username: "john_doe",
//     imageUrl:
//       "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
//   },
//   {
//     id: 2,
//     username: "jane_smith",
//     imageUrl:
//       "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
//   },
//   {
//     id: 3,
//     username: "jane_smith",
//     imageUrl:
//       "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
//   },
//   {
//     id: 4,
//     username: "jane_smith",
//     imageUrl:
//       "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
//   },
//   {
//     id: 5,
//     username: "jane_smith",
//     imageUrl:
//       "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
//   },

// ];

const Stories = () => {

  
  const [openAddStory,setAddStory] = useState(false);
  
  
  // Define handleUpdate function
  const handlesharebutton = () => {
    setAddStory(prevState => !prevState);
    // console.log("working")
}


const { isPending, data,error } = useQuery({
  queryKey: ['stories'],
  queryFn: () =>
  makeRequest.get("/stories").then((res) => {
      return res.data;
    }),
  });
  
  console.log("data",data);
  

  

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.id;


  const queryClient = useQueryClient();
  const DeleteMutation = useMutation({
    mutationFn: (StoryId) => makeRequest.delete("/stories/" + StoryId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  const handleDeleteStory = (StoryId) => {
    DeleteMutation.mutate(StoryId);
  };



  return (
    <div className="grid place-items-center" >

      <div className="max-w-96 xl:max-w-3xl  flex space-x-4 overflow-x-auto p-4 bg-base-200">
        <div className="card bg-base-100 shadow-xl flex-shrink-0 w-48">
          <div className="card-body p-0">
            {/* <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="Add Story"
              size="lg"
            /> */}
          </div>
          <div className="card-footer text-center">
            <button className="text-xs font-semibold" onClick={handlesharebutton} >  <FontAwesomeIcon  icon={faCirclePlus} /> Add Story</button>
          </div>
        </div>

        {/* {error
        ? "Something went wrong!"
        : isPending
        ? "loading"
        : data.map((post) => <  post={post} key={post.id} />)} */}


        {error
        ? "Something went wrong!"
        : isPending
        ? "loading"
        : data.map((story) => (
          <div
            key={story.id}
            className="card bg-base-100 shadow-xl flex-shrink-0 w-48"
          >
            <div className=" absolute right-4 h-12 w-4 py-2 rounded-lg">
              <div className="dropdown dropdown-left">
                <div tabIndex={0} role="button" className=" m-1">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {story.userid ===  userId &&(
                    <li>
                      <a onClick={() => handleDeleteStory(story.id)}>Delete</a>
                    </li>
                  )}
                 
                  <li>
                    <a>Report</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-body p-0">


              <img src={`http://localhost:5173/uploads/posts/${story.img}`} alt={story.username} size="lg" />
            </div>
            <div className="card-footer text-center">
              <span className="text-xs font-semibold">{story.username}</span>
            </div>
          </div>
        ))}
      </div>
      {openAddStory && <AddStory setAddStory={setAddStory}  />}
    </div>
  );
};

export default Stories;
