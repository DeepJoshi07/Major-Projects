import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs,setBlogs] = useState([])
    const fetchBlogData = async() => {
      const result = await axios.get('/api/blog');
      setBlogs(result.data)
      console.log(result)
  };
    useEffect(() => {
      fetchBlogData();
    }, []);
  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={
            menu === "Technology"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Technology
        </button>
        <button
          onClick={() => setMenu("Startup")}
          className={
            menu === "Startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          Startup
        </button>
        <button
          onClick={() => setMenu("Lifestyle")}
          className={
            menu === "Lifestyle"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Lifestyle
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs.filter((item)=> menu === 'All'? true:item.category === menu).map((item, index) => {
          return (
            <BlogItem
              title={item.title}
              image={item.image}
              description={item.description}
              category={item.category}
              key={index}
              id={item._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
