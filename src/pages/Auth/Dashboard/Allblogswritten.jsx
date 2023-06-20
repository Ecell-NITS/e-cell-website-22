import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../../components/Blog/Blog.css'
// import NavbarTeam from '../../../components/shared/Navbar/NavbarTeam';
// import Footer from '../../../components/shared/Footer/Footer';
const Allblogspublished = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([]);
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

        axios
            // .get('http://localhost:2226/mypublishedblogs', config)
            .get(process.env.REACT_APP_PUBLISHEDBLOGS, config)
            .then((response) => {
                setBlogs(response.data.blogs);
                // setIntroedit(response.data.intro)
            })
            .catch((error) => {
                console.error('Failed to fetch blogs', error);
            });

    }, [navigate]);


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

                    {blogs.map((blog) => (
                        <div key={blog._id} id='indicardblog_protct' >

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
                                {/* <p>{blog.intro}</p> */}
                                {blog.intro.split('\n').map((paragraph, index) => (
                                    <p key={index} style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
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