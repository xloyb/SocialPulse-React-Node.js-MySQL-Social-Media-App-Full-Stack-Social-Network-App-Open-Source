import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import Comments from "./comments2";
import { AuthContext } from "../context/AuthContext";
import { makeRequest } from "../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Post = ({ post }) => {
  const shouldRenderImage = Boolean(post.img);
  const [isLiked, setIsLiked] = useState(false); // Local state variable to track like status
  const currentUser = useContext(AuthContext);
  const postidforcomment = post.id;

  // Fetch likes data
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['likes', post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => {
        return res.data;
      }),
  });

  // Update isLiked when data changes or when component mounts
  useEffect(() => {
    if (data) {
      setIsLiked(data.some(item => item.id === currentUser.id));
    }
  }, [data, currentUser.id]);

  // Mutation for liking/unliking a post
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      if (isLiked) {
        return makeRequest.delete(`/likes?postId=` + post.id);
      } else {
        return makeRequest.post('/likes', { postId: post.id });
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['likes'] });
      refetch(); // Refetch likes data to get updated count
    },
  });

  // Handle click event for like button
  const handleClickLike = () => {
    // Toggle the like status
    setIsLiked(!isLiked);
    // Perform mutation to like/unlike the post
    mutation.mutate();
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
                {post.username}
                <div className="badge badge-secondary">NEW</div>
              </h2>
            </>
          ) : (
            <>
              <h2 className="card-title">
                {post.username}
                <div className="badge badge-secondary">NEW</div>
              </h2>
            </>
          )}

          <p className="mt-2 text-base">{post.Desc}</p>
          <div className="mt-4 flex items-center space-x-2">
            {/* <FontAwesomeIcon icon={faHeart} className="text-red-500" /> */}
           
            {/* <FontAwesomeIcon icon={faHeart} className={Liked ? 'text-red-500 mr-1' : 'mr-1'} onClick={handleClickLike}/>
            {data && data.length} */}

<FontAwesomeIcon icon={faHeart} className={`text-red-500 ${isLiked ? 'liked' : ''}`} onClick={handleClickLike} />
            <span>{data && data.length}</span>

            <FontAwesomeIcon icon={faComment} className="text-blue-500" />
            <FontAwesomeIcon icon={faShare} className="text-indigo-500" />
          </div>
        </div>
        <Comments postId={postidforcomment}/>
      </div>
    </>
  );
};

export default Post;
