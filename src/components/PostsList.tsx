import React, { useEffect, useState } from "react";
import { Post } from "@/types";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <ul className="list-disc pl-5">
      {posts.map((post: Post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
export default PostList;
