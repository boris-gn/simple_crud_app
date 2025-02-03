import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchPosts } from "@/store/postsSlice";
import { withAuth } from "@/components/Layout";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status } = useSelector((state: RootState) => state.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pages.push(i);
    }
    return pages;
  }, [posts.length, postsPerPage]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error loading posts</div>;

  return (
    <div>
      <div className="overflow-y-scroll h-[calc(100vh-135px)]">
        {currentPosts.map(post => (
          <div key={post.id} className="border-b py-2 text-center">
            <h3 className="font-bold text-gray-600 uppercase">{post.title}</h3>
            <p className="text-gray-400">{post.body}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 rounded ${
              currentPage === number 
                ? "bg-blue-500 text-white" 
                : "bg-gray-200 text-black"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default withAuth(Posts);
