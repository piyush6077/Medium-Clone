import React from 'react';
import { usePostStore } from '../store/usePostStore';

const ParticularPost = () => {
    const { selectedPost, toggleLike } = usePostStore((state) => ({
        selectedPost: state.selectedPost,
        toggleLike: state.toggleLike,
    }));

    if (!selectedPost) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{selectedPost.title}</h1>
            <p>{selectedPost.content}</p>
            <button onClick={() => toggleLike(selectedPost._id)}>
                Like ({selectedPost.likes.length})
            </button>
        </div>
    );
};

export default ParticularPost;