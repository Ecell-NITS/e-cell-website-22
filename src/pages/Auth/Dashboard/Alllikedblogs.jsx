import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import NavbarTeam from '../../../components/shared/Navbar/NavbarTeam'
import Footer from '../../../components/shared/Footer/Footer'
const Alllikedblogs = () => {
    const navigate = useNavigate()
    const [likedBlogs, setLikedBlogs] = useState([]);
    useEffect(() => {
        document.title = "Liked blogs | Dashboard"
        const token = localStorage.getItem('token')
        if (!token) {
            navigate("/login")
        }
    }, [navigate])


    //     const userId = localStorage.getItem('userId');
    // console.log(userId)
    useEffect(() => {
        const fetchLikedBlogs = async () => {
            try {
                // const response = await axios.get('http://localhost:2226/api/likedblogs', {
                const response = await axios.get(`${process.env.REACT_APP_APIMAIN}/api/likedblogs`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setLikedBlogs(response.data);
            } catch (error) {
                console.error('Error fetching liked blogs:', error);
            }
        };

        fetchLikedBlogs();
    }, []);
    return (
        <div>
           <NavbarTeam />
            <div id='paddinginpublishlist'>
                <h1 style={{ textAlign: "center" }}>Liked Blogs</h1>
                <div className="mainparentblogindicard" id='allblogswrittenbuuser'>

                    {likedBlogs.map((blog) => (
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

            </div>
         <Footer />
        </div>
    )
}

export default Alllikedblogs