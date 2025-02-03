import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { 
  fetchComments, 
  addComment, 
  updateComment, 
  deleteComment 
} from "@/store/commentsSlice";
import { withAuth } from "@/components/Layout";
import { Comment } from "@/types";

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { comments, status } = useSelector((state: RootState) => state.comments);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({
        body: newComment,
        name: "New Comment",
        email: "user@example.com",
        postId: 1
      }));
      setNewComment("");
    }
  };

  const handleUpdateComment = () => {
    if (editingComment) {
      dispatch(updateComment({ 
        id: editingComment.id, 
        changes: { body: editingComment.body } 
      }));
      setEditingComment(null);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error loading comments</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Comments Management</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Add new comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 w-full mb-2 text-gray-600"
        />
        <button 
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Comment
        </button>
      </div>

      <div className="grid gap-4 h-[calc(100vh-230px)] overflow-y-scroll">
        {comments.map(comment => (
          <div 
            key={comment.id} 
            className="border p-4 rounded flex justify-between items-center"
          >
            {editingComment?.id === comment.id ? (
              <input
                type="text"
                value={editingComment.body}
                onChange={(e) => setEditingComment({
                  ...editingComment,
                  body: e.target.value
                })}
                className="border p-2 w-full mr-2 max-w-3xl text-gray-600"
              />
            ) : (
              <p className="w-full max-w-3xl text-gray-600">{comment.body}</p>
            )}
            
            <div className="flex md:flex-row flex-col gap-2">
              {editingComment?.id === comment.id ? (
                <button 
                  onClick={handleUpdateComment}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <button 
                  onClick={() => setEditingComment(comment)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              )}
              <button 
                onClick={() => dispatch(deleteComment(comment.id))}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);
