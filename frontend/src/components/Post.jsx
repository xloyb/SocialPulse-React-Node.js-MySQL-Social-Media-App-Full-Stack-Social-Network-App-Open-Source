/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faShare,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import Comments from "./comments2";
import { useContext } from "react";

import { makeRequest } from "../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const currentUser = useContext(AuthContext);
  const shouldRenderImage = Boolean(post.img);
  const postidforcomment = post.id;

  //  console.log(currentUser.currentUser.id)
  const { isPending, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (liked) => {
      if (liked) {
        await makeRequest.delete("/likes?postId=" + post.id);
      } else {
        await makeRequest.post("/likes", { postId: post.id });
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });

  const DeleteMutation = useMutation({
    mutationFn: (postId) => makeRequest.delete("/posts/" + postId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleClickLike = (user) => {
    mutation.mutate(data.includes(user.currentUser.id));
  };

  const handleDelete = () => {
    DeleteMutation.mutate(post.id);
  };
  // console.log(post.userid);
  // console.log(currentUser.currentUser.id);
  // console.log(post.userId === currentUser.currentUser.id)
  //console.log("Post x : ",post)
  return (
    <>
      {isPending ? (
        "Loading"
      ) : (
        <div
          key={post.id}
          className="relative space-x-4 card w-auto bg-base-100 shadow-xl mb-10"
        >
          <div className="card-body">
            <div className=" absolute top-4 right-4 h-12 w-24 px-4 py-2 rounded-lg">
              <div className="dropdown dropdown-left">
                <div tabIndex={0} role="button" className="btn m-1">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {post.userId === currentUser.currentUser.id && (
                    <li>
                      <a onClick={handleDelete}>Delete</a>
                    </li>
                  )}
                  {/* {post.userId === currentUser.id ? <li><a onClick={handleDelete}>Delete</a></li> :""}  */}
                  {/* <li><a onClick={handleDelete}>Delete</a></li> */}
                  <li>
                    <a>Report</a>
                  </li>
                </ul>
              </div>
            </div>
            {shouldRenderImage ? (
              <>
                <Link
                  to={`/profile/${post.userId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 mb-3 avatar">
                      <img
                        alt=""
                        className="rounded-full"
                        src={
                          currentUser.profilePic
                            ? `http://localhost:5173/uploads/posts/${currentUser.profilePic}`
                            : "http://localhost:5173/default/default_profile.png"
                        }
                      />
                    </div>
                    <span className="card-title">{post.username}</span>
                    <div className="badge badge-secondary">NEW</div>
                  </div>
                </Link>
                <figure className="relative">
                  <img
                    src={`http://localhost:5173/uploads/posts/${post.img}`}
                    alt="Post Image"
                  />
                  <div className="absolute bottom-0 right-0 p-4">
                    <div className="card-actions space-x-2">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="text-red-500"
                      />
                      <FontAwesomeIcon
                        icon={faComment}
                        className="text-blue-500"
                      />
                      <FontAwesomeIcon
                        icon={faShare}
                        className="text-indigo-500"
                      />
                    </div>
                  </div>
                </figure>
                <h2 className="absolute card-title"></h2>
              </>
            ) : (
              <>
                <Link
                  to={`/profile/${post.userId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 mb-3 avatar">
                      <img
                        alt=""
                        className="rounded-full"
                        src={
                          currentUser.profilePic
                            ? `http://localhost:5173/uploads/posts/${currentUser.profilePic}`
                            : "http://localhost:5173/default/default_profile.png"
                        }
                      />
                    </div>
                    <span className="card-title">{post.username}</span>
                    <div className="badge badge-secondary">NEW</div>
                  </div>
                </Link>
              </>
            )}

            <p className="mt-2 text-base">{post.Desc}</p>
            <div className="mt-4 flex items-center space-x-2">
              {/* <FontAwesomeIcon icon={faHeart} className="text-red-500" /> */}

              <FontAwesomeIcon
                icon={faHeart}
                className={
                  isPending
                    ? "Loading likes"
                    : data && data.includes(currentUser.currentUser.id)
                    ? "text-red-500 mr-1"
                    : "mr-1"
                }
                onClick={() => handleClickLike(currentUser)}
              />
              <span> {data && data.length} </span>

              <FontAwesomeIcon icon={faComment} className="text-blue-500" />
              <FontAwesomeIcon icon={faShare} className="text-indigo-500" />
            </div>
          </div>
          <Comments postId={postidforcomment} />
        </div>
      )}
    </>
  );
};

export default Post;
