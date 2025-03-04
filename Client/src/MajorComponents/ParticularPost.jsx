import React from "react";
import usePostStore from "../store/usePostStore";

const ParticularPost = () => {
  const { selectedPost } = usePostStore();  

  // Ensure selectedPost is valid before accessing properties
  if (!selectedPost) {
    return <p>No post selected</p>;
  }
  console.log("sendP" ,selectedPost);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">{selectedPost.post.title}</h1>
      <p className="mt-4">{selectedPost.post.content?.[0]?.children?.[0]?.text}</p>
      <p className="mt-2 text-gray-600">{selectedPost.author?.username}</p>
    </div>
  );
};

export default ParticularPost;
