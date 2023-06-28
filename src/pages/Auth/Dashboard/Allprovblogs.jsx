import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../components/Blog/Blog.css'

const Allprovblogs = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([]);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [fetching, setFetching] = useState(false)
    const [noblog, setNoblog] = useState(false);
    useEffect(() => {
        // document.title = "My all blogs | Dashboard"
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login")
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        setFetching(true)
        axios
            .get(process.env.REACT_APP_ALLPROVBLOGS, config)
            // .get('http://localhost:2226/myprovisionalblogs', config)
            .then((response) => {
                setBlogs(response.data.blogs);
                setFetching(false)
            })
            .catch((error) => {
                console.error('Failed to fetch blogs', error);
                setFetching(false)
            });
    }, [navigate])



    const handleEditBlog = (blogId) => {
        setSelectedBlogId(blogId);
        navigate(`/editblog/${blogId}`);
    };

    useEffect(() => {
        if (!fetching) {
            if (blogs.length === 0) {
                setNoblog(true);
            } else {
                setNoblog(false);
            }
        }
    }, [blogs, fetching]);

    return (
        <div>
            {/* <NavbarTeam /> */}
            <div id='paddinginpublishlist'>
                {/* <h1 style={{textAlign:"center"}}>My all Blogs</h1> */}
                <div id='blogs_under_profile_protected'>
                {fetching && <p id='loadingkrrhebhaiblogs'>Loading Blogs...</p>}
                {noblog && !fetching && <p id='loadingkrrhebhaiblogs'>No Blog found.</p>}
                    {blogs.map((blog) => (
                        <div key={blog._id} id='indicardblog_protct' >
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

                            <div id="flextwobtnonedit">
                                <Link to={`/blog/${blog._id}`}> <button className='kretrhereading'>
                                    Read more
                                </button></Link>

                                <button className='kretrhereading'
                                    onClick={() => handleEditBlog(blog._id)}
                                >Edit blog</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Allprovblogs
