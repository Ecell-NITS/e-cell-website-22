import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Tagspecificpage.css'
import NavbarTeam from '../shared/Navbar/NavbarTeam'
import Footer from '../shared/Footer/Footer'
import { useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';
const Tagspecificblog = () => {
    const [blogs, setBlogs] = useState([]);
    const location = useLocation()
    const currentURL = decodeURIComponent(location.pathname);
    const tagname = currentURL.split('/tag/')[1];
    const [fetching, setFetching] = useState(false)
    const [noblog, setNoblog] = useState(false)

    useEffect(() => {
        setFetching(true)
        axios
            // .get(`http://localhost:2226/tagspecificbloglist/${tagname}`)
            .get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/tagspecificbloglist/${tagname}`)
            .then((response) => {
                setBlogs(response.data);
                setFetching(false)
            })
            .catch((error) => {
                if (error.response && error.response.data.message === "No blogs found with this tag.") {
                    console.log("No blogs found with this tag.")
                    setFetching(false)
                }
                else if (error.response && error.response.data.message === "Failed to retrieve ag specific blogs.") {
                    console.log("Failed to retrieve ag specific blogs.")
                    setFetching(false)
                } else {
                    console.log('Failed to fetch blogs', error);
                    setFetching(false)
                }
            }
            );
    }, [tagname]);

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
        <>
            <NavbarTeam />
            <div className='tagblogpagemain'>
                <div id='paddinginpublishlist'>
                    <Helmet>
                        <title>Blog(s) with the tag {tagname} | THE ECELL NITS BLOG</title>
                    </Helmet>
                    <h1 style={{ textAlign: "center" }} className='headingtagsspecific'>Blog(s) with the tag {tagname}</h1>
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
                                                style={{ cursor: "default" }}
                                                key={index}
                                                className={index !== 0 ? 'buttonmarginlft' : ''}
                                            >
                                                {word}
                                            </button>
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

                                <Link to={`/blog/${blog._id}`}> <button className='kretrhereading'>
                                    Read more
                                </button></Link>
                            </div>
                        ))}
                    </div>

                </div></div>
            <Footer />
        </>
    )
}

export default Tagspecificblog