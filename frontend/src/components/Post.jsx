/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
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
  const { isPending , data } = useQuery({
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
        await makeRequest.delete("/likes?postId="+post.id);
      } else {
        await makeRequest.post("/likes", { postId: post.id });
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });

  const handleClickLike = (user) => {
    mutation.mutate(data.includes(user.currentUser.id));
  };

  return (
    <>
      <div
        key={post.id}
        className="relative space-x-4 card w-auto bg-base-100 shadow-xl mb-10"
      >
        <div className="card-body">
          {shouldRenderImage ? (
            <>
              <figure className="relative">
                <img src={`uploads/posts/${post.img}`} alt="Post Image" />
                <div className="absolute bottom-0 right-0 p-4">
                  <div className="card-actions space-x-2">
                    <FontAwesomeIcon icon={faHeart} className="text-red-500" />
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
              <h2 className="absolute card-title">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
              <span>
                {post.username}

              </span>
              </Link>
                <div className="badge badge-secondary">NEW</div>
              </h2>
            </>
          ) : (
            <>
              <h2 className="card-title">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
              <span>
                {post.username}

              </span>
              </Link>
                <div className="badge badge-secondary">NEW</div>
              </h2>
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
    </>
  );
};

export default Post;
