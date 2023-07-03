import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BiLike } from 'react-icons/bi'
// import { AiTwotoneLike } from 'react-icons/ai'
// import {writeremaill} from '../../pages/Resources/Blogs/Blogindividual'
import './Blog.css'
const Blog = () => {
  const [blogscreated, setBlogscreated] = useState([]);
  const [sortingOrder, setSortingOrder] = useState('latest');
  const [sortingMessage, setSortingMessage] = useState('');
  const [activeTagFilter, setActiveTagFilter] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [authorid, setAuthorid] = useState("")
  // const [likedBlogs, setLikedBlogs] = useState([]);
  // const [writeremaill, setWriteremaill] = useState("")

  const navigate = useNavigate()

  const handleLikeKarp = async (blogId) => {
    if (!localStorage.getItem('token')) {
      navigate("/login")
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_APIMAIN}/api/blogs/${blogId}/like`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const updatedLikes = response.data.likes;
      setBlogscreated(prevBlogs => {
        return prevBlogs.map(blog => {
          if (blog._id === blogId) {
            return { ...blog, likesCount: updatedLikes };
          }
          return blog;
        });
      });
      alert('You have liked the blog');
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'You have already liked this blog') {
        alert('You have already liked this blog');
      } else {
        console.error('Error liking the blog:', error);
      }
    }
  };

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
          } else if (sortingOrder === 'likes') {
            const likesA = a.likes ? a.likes.length : 0;
            const likesB = b.likes ? b.likes.length : 0;
            return likesB - likesA;
          } else {
            return new Date(a.timestamp) - new Date(b.timestamp);
          }
        });
        setAuthorid(response.data.authorid)

        // setWriteremaill(response.data.writeremail)
        // console.log(`writeremaill: ${writeremaill}`)
        // console.log(response.data)
        setSortingMessage('');
        setBlogscreated(sortedBlogs);
      } catch (error) {
        console.log('Error fetching blogs:', error);
      } finally {
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
              <button onClick={() => handleSortingOrderChange('likes')} id='moreold' className={sortingOrder === 'likes' ? 'active' : ''}>Most Liked</button>
            </div>
          </div>

          <p>{isFetching ? 'Fetching blogs...' : sortingMessage}</p>

          {activeTagFilter ? (
            <>
              {filteredBlogs.length === 0 ? (
                <p className='msgonblogcnt'>No blogs found with the tag "{activeTagFilter}"</p>
              ) : (
                <p className='msgonblogcnt'>{filteredBlogs.length} blogs found with the tag "{activeTagFilter}"</p>
              )}
            </>
          ) : (
            <p className='msgonblogcnt'>{filteredBlogs.length} blogs found on the server.</p>
          )}

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
                          <img src={blog.topicpic} alt="" id='hoverscaledown' />
                        </div>
                        <h1 className='titlehainlogindi'>{blog.title}</h1>
                        <div className="whowrittenblog">
                          <Link to={`/user/${blog.authorid}`}><h2 >{blog.writernmae}</h2></Link>
                        </div>

                        <div className="whoholdsthetag">
                          {blog.tag.trim().split(' ').map((word, index) => (
                            word.length > 0 && (

                              <Link to={`/tag/${word.replace('#', '')}`} id='tagbuttonidlink'>
                                <button
                                  key={index}
                                  className={index !== 0 ? 'buttonmarginlft' : ''}
                                > {word}</button>
                              </Link>

                            )
                          ))}
                        </div>

                        <div className="briefintrohldman">
                          {blog.intro
                            .split('\n')
                            .map((paragraph, index) => (
                              <p
                                key={index}
                                style={{ whiteSpace: 'pre-line' }}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    paragraph
                                      .split(' ')
                                      .slice(0, 20)
                                      .join(' ') +
                                    (paragraph.split(' ').length > 20 ? '...' : ''),
                                }}
                              ></p>
                            ))}
                        </div>

                        <div id='btnholderslikeread'>
                          <button className='likekarobhaiblog' onClick={() => handleLikeKarp(blog._id)}>
                            <BiLike /> {blog.likes ? blog.likes.length : 0}
                          </button>

                          <Link to={`/blog/${blog._id}`}> <button className='kretrhereading'>
                            Read more
                          </button></Link>


                        </div>


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
            <button onClick={() => handleTagFilter('entrepreneur')} className={`activetagcolored ${activeTagFilter === 'entrepreneur' ? 'active' : ''}`} id='btnthirdtag'>Entrepreneur</button>


          </div>
        </div>
      </div>

    </>
  );
};

export default Blog;
