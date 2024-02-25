import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import { makeRequest } from "../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import Posts from "../components/Posts"
import Update from "../components/update"


const Profile = () => {

  const [openUpdate,setOpenUpdate] = useState(false);


  // Define handleUpdate function
const handleUpdate = () => {
  setOpenUpdate(prevState => !prevState);
  // console.log("working")
}

// Use handleUpdate function in onClick event
<button onClick={handleUpdate}>Update</button>


  // Extract userId from the URL pathname
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  // console.log("testing url", userId);
  const { currentUser } = useContext(AuthContext);
  // Fetch user data using userId
  const { isPending, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      }),
  });

  const { data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    queryFn: () =>
      makeRequest
        .get("/relationships/?followedUserId=" + userId)
        .then((res) => {
          return res.data;
        }),
  });

  //console.log(relationshipData);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (following) => {
      if (following) {
        await makeRequest.delete("/relationships?userId=" + userId);
      } else {
        await makeRequest.post("/relationships", { userId });
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["relationship"] });
    },
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div>
      {/* Only render profile information if data is available */}
      {isPending
        ? "Loading"
        : data && (
            <div className="container mx-auto mt-8 p-4  rounded-lg shadow-md">
              {/* Profile Header with Larger Background Image */}
              <div
                className="flex-1 relative mb-6 h-32"
                style={{
                  backgroundImage: `url(${data.coverPic ? `http://localhost:5173/uploads/posts/${data.coverPic}` : "https://via.placeholder.com/800x400"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "0.5rem",
                }}
              >
                <div className="flex items-center justify-center h-full p-4">
                  <img src={data.profilePic ? `http://localhost:5173/uploads/posts/${data.profilePic}` : "https://via.placeholder.com/80"}
alt="Profile Picture"
                    className="w-20 h-20 rounded-full border-4 border-white bg-white"
                  />
                </div>
              </div>

              <div className="navbar bg-base-100">
                <div className="navbar-start space-x-4">
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost lg:hidden"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h8m-8 6h16"
                        />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a target="_blank" href="">
                          {" "}
                          Item{" "}
                        </a>
                      </li>
                      <li>
                        <a> Item </a>
                      </li>
                    </ul>
                  </div>
                  <a
                    href={
                      data.facebookProfile !== null &&
                      data.facebookProfile !== undefined
                        ? data.facebookProfile
                        : "#"
                    }
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href={
                      data.instagramProfile !== null &&
                      data.instagramProfile !== undefined
                        ? data.instagramProfile
                        : "#"
                    }
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href={
                      data.XProfile !== null && data.XProfile !== undefined
                        ? data.XProfile
                        : "#"
                    }
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <XIcon />
                  </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                  <ul className="menu menu-horizontal px-1">
                    <li>
                      <a>Item 1</a>
                    </li>

                    <li>
                      <a>Item 3</a>
                    </li>
                  </ul>
                </div>
                <div className="navbar-end">
                  {data.id === currentUser.id ? (
                    <button className="btn btn-primary"  onClick={handleUpdate} >Edit Profile</button>
                  ) : (
                    <>
                      {relationshipData &&
                      relationshipData.includes(currentUser.id) ? (
                        <button
                          onClick={handleFollow}
                          className="btn btn-primary"
                        >
                          Following
                        </button>
                      ) : (
                        <button
                          onClick={handleFollow}
                          className="btn btn-primary"
                        >
                          Follow
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Profile Content */}
              <div>
                <h2 className="card-title"> {data.username} </h2>
                <p>{data.bio}</p>
              </div>
            </div>
          )}
    <Posts userId={userId} />
    {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
