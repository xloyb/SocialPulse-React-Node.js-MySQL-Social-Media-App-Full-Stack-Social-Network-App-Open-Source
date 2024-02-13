/* eslint-disable react/prop-types */
import { makeRequest } from "../axios";
import Post from "./post";
import { useQuery } from "@tanstack/react-query";

const Posts = () => {
  

  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makeRequest.get("/posts").then((res) => {
        return res.data;
      }),
  });

console.log("posts data:",data)

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