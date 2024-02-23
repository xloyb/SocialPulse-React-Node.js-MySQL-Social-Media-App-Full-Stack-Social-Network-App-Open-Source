/* eslint-disable react/prop-types */
import { makeRequest } from "../axios";
import Post from "./Post";
import { useQuery } from "@tanstack/react-query";

const Posts = ({userId}) => {
  

  const { isPending, error, data } = useQuery({
    queryKey: ['posts',userId],
    queryFn: () =>
      makeRequest.get("/posts?userId="+userId).then((res) => {
        return res.data;
      }),
  });


  return (
    <div className="p-4">
    
    {error
        ? "Something went wrong!"
        : isPending
        ? "loading"
        : data.map((post) => <Post  post={post} key={post.id} />)}
   
    </div>
  );
};

export default Posts;