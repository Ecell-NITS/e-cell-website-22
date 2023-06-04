import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Blog = () => {
  const [blogscreated, setBlogscreated] = useState([])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:2226/getblogs");
        setBlogscreated(response.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <>
      <div className="collab">
        <h1 style={{ userSelect: "none" }}>BLOG-SECTION</h1>
      </div>

      {blogscreated.map((user) => (
        <div key={user._id}>

          <h1>id:{user._id}</h1>
          <h1> Title: {user.title}</h1>
          <button>  <Link to={`/blog/${user._id}`}>

            Read more

          </Link></button>

          <h1>Brief Introduction: {user.intro}</h1>
   
          <h1>tag: {user.tag}</h1>
        </div>
      ))}
    </>
  )
}

export default Blog
