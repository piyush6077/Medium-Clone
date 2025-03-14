import React , {useState} from "react";
import usePostStore from "../store/usePostStore";
import {useAuthStore} from "../store/useAuthStore"
import avatar from "../../public/avatar.png";
import { CalendarRange, Hand, HandHeart, Heart, HeartCrack, LucideHeartOff, Star, ThumbsUp } from "lucide-react";

const ParticularPost = () => {
  const { selectedPost , toggleLike } = usePostStore();  
  const { authUser } = useAuthStore();

  console.log(authUser)
  if (!selectedPost) {
    return <p>No post selected</p>;
  }
  
  const handleLikeAndUnlike = () => {
    toggleLike(selectedPost.post._id);
  };


  console.log(selectedPost)
  return (
    <div className="flex flex-col mt-8 w-[100vw] items-center overflow-y-scroll h-[540px] hide-scrollbar">
        <div className="px-5 flex justify-center w-[60%] flex-col">
        <h1 className="text-[50px] text-gray-700 leading-14  md:3xl font-bold">{selectedPost.post.title}</h1>
        <div className="py-4">
            <div className="flex gap-x-4 my-4 pb-2 items-center">
                <img 
                    src={selectedPost.post.author.avatar || '../../public/avatar.png'}  
                    alt=""
                    className="w-11 h-11 object-cover rounded-full shadow-md"
                />
                <div className="flex flex-col">
                    <p>{selectedPost.post.author.username}</p>
                    <p className="text-sm text-gray-600">Posted on {new Date(selectedPost.post.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div className='flex mt-6 text-xs gap-8 border-b-[1px] border-t-[1px] py-2 border-gray-100'>
                <div className='w-16 flex gap-3'>
                    <CalendarRange width={16} />
                    <p className="mt-[6px]">{new Date(selectedPost.post.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short"
                    })}</p>
                </div>
                <div className='w-16 flex items-center gap-3'>
                <div onClick={handleLikeAndUnlike}>
                    {selectedPost.post.likes?.includes(authUser._id) 
                        ? <ThumbsUp 
                            fill
                            className="text-gray-700"    
                            width={16} 
                          /> 
                        : <ThumbsUp  
                            width={16} 
                          />}
                </div>
                <p>{selectedPost.post.likes?.length}</p>

                </div>
                <div className='w-16 flex items-center gap-3'>
                    <Hand width={16} />
                    <p>+20</p>
                </div>
            </div>
        </div>
        <div className="mt-7">
          {selectedPost.post.content?.map((paragraph,index) => (
            <div key={index} className="">
              {paragraph.children.map((child,i)=>(
                <p key={i} className="mb-1">
                  {child.text === "" ? "\u00A0" : child.text}
                </p>
              ))}
            </div>       
          ))}
        </div>
      
        </div>
    </div>
  );
};

export default ParticularPost;
