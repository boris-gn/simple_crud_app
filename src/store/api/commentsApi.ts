import { CommentType } from "@/types";

export const fetchCommentsApi = async (): Promise<CommentType[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  return response.json();
};

export const addCommentApi = async (newComment: {
  name: string;
  email: string;
  body: string;
}) => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/comments",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  return response.json(); // Ensure the response is returned
};

export const updateCommentApi = async (
  id: number,
  changes: Partial<{ name: string; email: string; body: string }>
) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update comment");
  }

  return response.json(); // Ensure the response is returned
};

export const deleteCommentApi = async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }

  return { id }; // Return the deleted comment ID
};
