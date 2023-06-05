import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Blog.css'
const Blog = () => {
  const [blogscreated, setBlogscreated] = useState([]);
  const [sortingOrder, setSortingOrder] = useState('latest');
  const [sortingMessage, setSortingMessage] = useState('');
  const [activeTagFilter, setActiveTagFilter] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setSortingMessage(` ${sortingOrder} blogs coming...`);
        setIsFetching(true);
        const response = await axios.get(process.env.REACT_APP_ACCEPTEDBLOGS_RENDER);
        // const response = await axios.get('http://localhost:2226/acceptedblogs');
        // const response = await axios.get(process.env.REACT_APP_FETCHBLOG_RENDER);
        const sortedBlogs = response.data.sort((a, b) => {
          if (sortingOrder === 'latest') {
            return new Date(b.timestamp) - new Date(a.timestamp);
          } else {
            return new Date(a.timestamp) - new Date(b.timestamp);
          }
        });

        setSortingMessage('');
        setBlogscreated(sortedBlogs);
      } catch (error) {
        console.log('Error fetching blogs:', error);
      }finally{
        setIsFetching(false);
      }
    };

    fetchBlogs();
  }, [sortingOrder]);

  const handleSortingOrderChange = (order) => {
    setSortingOrder(order);
  };

  const handleTagFilter = (tag) => {
    if (activeTagFilter === tag) {
      setActiveTagFilter('');
    } else {
      setActiveTagFilter(tag);
    }
  };

  const filteredBlogs = activeTagFilter
    ? blogscreated.filter((blog) => blog.tag.toLowerCase().includes(activeTagFilter.toLowerCase()))
    : blogscreated;

  return (
    <>
      <div className="collab">
        <h1 style={{ userSelect: 'none' }}>BLOG-SECTION</h1>
      </div>

      <div className="mainblogstarts">
        <div className="leftblogcontent">
          <div className="btnsorting">
            <h2 className='sortkaro'>Sort By:</h2>
            <div className='btnlatestoldest'>
              <button onClick={() => handleSortingOrderChange('latest')} className={sortingOrder === 'latest' ? 'active' : ''}>Latest</button>
              <button onClick={() => handleSortingOrderChange('oldest')} id='moreold' className={sortingOrder === 'oldest' ? 'active' : ''}>Oldest</button>
            </div>
          </div>

          <p>{isFetching ? 'Fetching blogs...' : sortingMessage}</p>

          {activeTagFilter ? (
            <>
              {filteredBlogs.length === 0 ? (
                <p>No blogs found with the tag "{activeTagFilter}".</p>
              ) : (
                <p>{filteredBlogs.length} blogs found with the tag "{activeTagFilter}".</p>
              )}
            </>
          ) : (
            <p>{filteredBlogs.length} total blogs found on the server.</p>
          )}


          {/* <p>{sortingMessage}</p> */}
          {sortingMessage ? null : (
            <>
              {filteredBlogs.length === 0 ? (
                <p></p>
              ) : (

                <>

                  <div className="mainparentblogindicard">
                    {filteredBlogs.map((blog) => (
                      <div key={blog._id} className='indicardblog'>
                        {/* <h1>id: {blog._id}</h1> */}
                        <div className="imgholdercontblog">
                          <img src={blog.topicpic} alt="" />
                        </div>
                        <h1 className='titlehainlogindi'>{blog.title}</h1>
                        <div className="whowrittenblog">
                          <h2>{blog.writernmae}</h2>
                        </div>

                        <div className="whoholdsthetag">
                          <button>{blog.tag}</button>
                          {/* <button className='secondtaghlder'>{blog.tag2}</button> */}
                        </div>

                        <div className="briefintrohldman">
                          <p>{blog.intro}</p>
                        </div>
                        
                        <Link to={`/blog/${blog._id}`}> <button className='kretrhereading'>
                          Read more
                        </button></Link>

                      </div>
                    ))}
                  </div>
                </>
              )}

            </>
          )}
        </div>

        <div className="rightblogcontent">
          <Link to="/createblog"><button className="newblogaddbtn">ADD NEW BLOG +</button></Link>

          <div className="btnfiltertag">
            <button onClick={() => handleTagFilter('startup')} className={`activetagcolored ${activeTagFilter === 'startup' ? 'active' : ''}`}>Startup</button>
            <button onClick={() => handleTagFilter('technology')} className={`activetagcolored ${activeTagFilter === 'technology' ? 'active' : ''}`}>Technology</button>
            <button onClick={() => handleTagFilter('entrepreneur')} className={`activetagcolored ${activeTagFilter === 'entrepreneur' ? 'active' : ''}`}>Entrepreneur</button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Blog;
