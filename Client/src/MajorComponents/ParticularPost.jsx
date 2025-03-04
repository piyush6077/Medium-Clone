import React from "react";
import usePostStore from "../store/usePostStore";
import avatar from "../../public/avatar.png";
import { Hand, Star } from "lucide-react";

const ParticularPost = () => {
  const { selectedPost } = usePostStore();  

  if (!selectedPost) {
    return <p>No post selected</p>;
  }
  console.log("sendP" ,selectedPost);

  return (
    <div className="flex flex-col w-[100vw] items-center">
        <div className="p-5 flex justify-center mt-8 w-[60%] flex-col">
        <h1 className="text-[50px] text-gray-700 leading-14  md:3xl font-bold">{selectedPost.post.title}</h1>
        <div className="py-4">
            <div className="flex gap-x-4 my-4 pb-2 items-center">
                <img 
                    src={selectedPost.post.author.image || '../../public/avatar.png'}  
                    alt=""
                    className="w-11 h-11 object-cover rounded-full shadow-md"
                />
                <div className="flex flex-col">
                    <p>{selectedPost.post.author.username}</p>
                    <p className="text-sm text-gray-600">Posted on {new Date(selectedPost.post.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div className='flex text-xs gap-5 border-b-[1px] border-t-[1px] py-2 border-gray-100'>
                <div className='w-16 flex items-center gap-3'>
                    <Star width={16} />
                    <p>date</p>
                </div>
                <div className='w-16 flex items-center gap-3'>
                    <Hand width={16} />
                    <p>+20</p>
                </div>
                <div className='w-16 flex items-center gap-3'>
                    <Hand width={16} />
                    <p>+20</p>
                </div>
            </div>
        </div>
        <p className="mt-4 text-xl">{selectedPost.post.content?.[0]?.children?.[0]?.text}</p>
        </div>
    </div>
  );
};

export default ParticularPost;
