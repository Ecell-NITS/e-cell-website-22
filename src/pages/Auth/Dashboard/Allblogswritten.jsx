import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../../components/Blog/Blog.css'
// import NavbarTeam from '../../../components/shared/Navbar/NavbarTeam';
// import Footer from '../../../components/shared/Footer/Footer';
const Allblogspublished = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([]);
    const [fetching, setFetching] = useState(false)
    const [noblog, setNoblog] = useState(false)
    // const [introedit, setIntroedit] = useState("")
    useEffect(() => {
        // document.title = "My Published Blogs | Dashboard"
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
            // .get('http://localhost:2226/mypublishedblogs', config)
            .get(process.env.REACT_APP_PUBLISHEDBLOGS, config)
            .then((response) => {
                setBlogs(response.data.blogs);
                // setIntroedit(response.data.intro)
                setFetching(false)
            })
            .catch((error) => {
                setFetching(false)
                console.error('Failed to fetch blogs', error);
            }
            );

    }, [navigate]);

    useEffect(() => {
        if (!fetching) {
            if (blogs.length === 0) {
                setNoblog(true)
            } else {
                setNoblog(false)
            }
        }
    }, [fetching, blogs])

    const screenWidth = window.innerWidth || document.documentElement.clientWidth
    const tabletPc = screenWidth > 660

    return (
        <div>
            {/* 
            {blogs.map((blog) => (
                <div key={blog._id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                </div>
            ))} */}
            {/* <NavbarTeam /> */}
            <div id='paddinginpublishlist'>
                {/* <h1 style={{textAlign:"center"}}>My Published Blogs</h1> */}
                <div id='blogs_under_profile_protected'>
                    {fetching && <p id='loadingkrrhebhaiblogs'>Loading Blogs...</p>}
                    {noblog && !fetching && <p id='loadingkrrhebhaiblogs'>No Blog found.</p>}
                    {blogs.map((blog) => (
                        <div key={blog._id} id='indicardblog_protct' >

                            <div className="imgholdercontblog">
                                <img src={blog.topicpic} alt="" />
                            </div>
                            {tabletPc ? (
                                blog.title
                                    .split('\n')
                                    .map((paragraph, index) => (
                                        <h1
                                            key={index}
                                            className='titlehainlogindi'
                                            style={{ whiteSpace: 'pre-line' }}
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    paragraph.length > 58
                                                        ? paragraph.slice(0, 58) + '...'
                                                        : paragraph,
                                            }}
                                        ></h1>
                                    ))
                            ) : (
                                blog.title
                                    .split('\n')
                                    .map((paragraph, index) => (
                                        <h1
                                            key={index}
                                            className='titlehainlogindi'
                                            style={{ whiteSpace: 'pre-line' }}
                                            dangerouslySetInnerHTML={{
                                                __html
                                                    : paragraph,
                                            }}
                                        ></h1>
                                    ))
                            )
                            }
                            <div className="whowrittenblog">
                                <h2>{blog.writernmae}</h2>
                            </div>

                            <div className="whoholdsthetag">
                                {blog.tag.trim().split(' ').map((word, index) => (
                                    word.length > 0 && (
                                        <button
                                            key={index}
                                            className={index !== 0 ? 'buttonmarginlft' : ''}
                                        >
                                            {word}
                                        </button>
                                    )
                                ))}
                            </div>

                            <div className="briefintrohldman">
                                {/* <p>{blog.intro}</p> */}
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

                            <Link to={`/blog/${blog._id}`}> <button className='kretrhereading'>
                                Read more
                            </button></Link>
                        </div>
                    ))}
                </div>

            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Allblogspublished