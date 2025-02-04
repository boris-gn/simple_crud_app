import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchUsers } from "@/store/usersSlice";
import { withAuth } from "@/components/Layout";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error loading posts</div>;

  return (
    <div className="flex justify-center flex-wrap w-full gap-4 mt-4">
      {users.map(user => {
        const url = new URL(`https://${user.website}`);
        const domain = url.origin;

        return (
          <div key={user.id} className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-96 p-2">
            <div className="flex items-center mb-4">
              <h5 className="text-slate-800 text-xl font-semibold">
                {user.name}
              </h5>
            </div>
            <p className="block text-slate-600 leading-normal font-light mb-4 flex items-center gap-2">
              <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" className="h-6 w-6 text-slate-600" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clip-rule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#080341"></path> </g></svg>
              {user.email}
            </p>
            <p className="block text-slate-600 leading-normal font-light mb-4 flex items-center gap-2">
            <svg fill="#000000" className="h-6 w-6 text-slate-600" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 18.1562 37.7617 C 24.9297 44.5352 33.1797 49.7617 39.9062 49.7617 C 42.9297 49.7617 45.5781 48.7070 47.7109 46.3633 C 48.9528 44.9805 49.7266 43.3633 49.7266 41.7695 C 49.7266 40.5977 49.2812 39.4727 48.1562 38.6758 L 40.9843 33.5664 C 39.8828 32.8164 38.9687 32.4414 38.1250 32.4414 C 37.0468 32.4414 36.1093 33.0508 35.0312 34.1055 L 33.3671 35.7461 C 33.1093 36.0039 32.7812 36.1211 32.4765 36.1211 C 32.1015 36.1211 31.7734 35.9805 31.5156 35.8633 C 30.0859 35.0898 27.6015 32.9571 25.2812 30.6602 C 22.9843 28.3633 20.8515 25.8789 20.1015 24.4258 C 19.9609 24.1680 19.8437 23.8398 19.8437 23.4883 C 19.8437 23.1836 19.9375 22.8789 20.1953 22.6211 L 21.8359 20.9102 C 22.8906 19.8320 23.4999 18.8945 23.4999 17.8164 C 23.4999 16.9727 23.1250 16.0586 22.3515 14.9571 L 17.3124 7.8555 C 16.4921 6.7305 15.3437 6.2383 14.0781 6.2383 C 12.5312 6.2383 10.9140 6.9414 9.5546 8.2774 C 7.2812 10.4571 6.2734 13.1524 6.2734 16.1289 C 6.2734 22.8555 11.4062 31.0117 18.1562 37.7617 Z"></path></g></svg>
              {user.phone}
            </p>
            <div>
              <a href={domain} target="_blank" rel="noopener noreferrer" className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        )})
      }
    </div>
  );
}

export default withAuth(Home);
